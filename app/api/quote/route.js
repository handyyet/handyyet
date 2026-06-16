const MAX_FIELD_LENGTH = 2000;
const MAX_PHOTO_SIZE = 10 * 1024 * 1024; // 10MB (лимит Telegram sendPhoto)
const MAX_PHOTOS = 10;

function clean(value, maxLength = MAX_FIELD_LENGTH) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function escapeForTelegram(text) {
  return text.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "");
}

export async function POST(req) {
  try {
    const formData = await req.formData();

    const name = clean(formData.get("name"), 100) || "Not provided";
    const rawPhone = clean(formData.get("phone"), 20);
    const phone = rawPhone.replace(/\D/g, "").slice(0, 15) || "Not provided";
    const address = clean(formData.get("address"), 300) || "Not provided";
    const service = clean(formData.get("service"), 100) || "General quote";
    const issue = clean(formData.get("issue"), 2000) || "Not provided";
    const booking = clean(formData.get("booking"), 100) || "Not specified";
    const email = clean(formData.get("email"), 200) || "Not provided";
    const photos = formData.getAll("photos") || [];

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      return Response.json({ success: false, error: "Missing Telegram env vars" }, { status: 500 });
    }

    const validPhotos = [];
    for (const photo of photos.slice(0, MAX_PHOTOS)) {
      if (!photo || typeof photo === "string" || photo.size === 0) continue;
      if (photo.size > MAX_PHOTO_SIZE) continue;
      if (photo.type && !photo.type.startsWith("image/")) continue;
      validPhotos.push(photo);
    }

    const message = escapeForTelegram(`
🛠 New HandyYet Quote Request

👤 Name: ${name}

📞 Phone: ${phone}

📍 Address: ${address}

🔧 Service: ${service}

📅 Booking: ${booking}

📧 Email: ${email}

📋 Issue:
${issue}

📸 Photos received: ${validPhotos.length}
`);

    const textRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: message }),
    });

    const textData = await textRes.json();
    if (!textData.ok) {
      throw new Error(textData.description || "Telegram text error");
    }

    let photoFailures = 0;
    for (const photo of validPhotos) {
      try {
        const photoForm = new FormData();
        photoForm.append("chat_id", chatId);
        photoForm.append("photo", photo, photo.name || "photo.jpg");

        const photoRes = await fetch(`https://api.telegram.org/bot${token}/sendPhoto`, {
          method: "POST",
          body: photoForm,
        });

        const photoData = await photoRes.json();
        if (!photoData.ok) {
          photoFailures++;
          console.error("Telegram photo error:", photoData.description);
        }
      } catch (err) {
        photoFailures++;
        console.error("Telegram photo upload failed:", err);
      }
    }

    return Response.json({ success: true, photoFailures });
  } catch (error) {
    console.error(error);
    return Response.json({ success: false, error: String(error.message || error) }, { status: 500 });
  }
}