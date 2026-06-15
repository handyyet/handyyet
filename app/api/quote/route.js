export async function POST(req) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") || "Not provided";
    const phone = formData.get("phone") || "Not provided";
    const address = formData.get("address") || "Not provided";
    const service = formData.get("service") || "General quote";
    const issue = formData.get("issue") || "Not provided";
    const photos = formData.getAll("photos") || [];

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      return Response.json({ success: false, error: "Missing Telegram env vars" }, { status: 500 });
    }

    const message = `
🛠 New HandyYet Quote Request

👤 Name: ${name}

📞 Phone: ${phone}

📍 Address: ${address}

🔧 Service: ${service}

📋 Issue:
${issue}

📸 Photos received: ${photos.length}
`;

    const textRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: message }),
    });

    const textData = await textRes.json();
    if (!textData.ok) throw new Error(textData.description || "Telegram text error");

    for (const photo of photos) {
      if (photo && photo.size > 0) {
        const photoForm = new FormData();
        photoForm.append("chat_id", chatId);
        photoForm.append("photo", photo, photo.name || "photo.jpg");

        const photoRes = await fetch(`https://api.telegram.org/bot${token}/sendPhoto`, {
          method: "POST",
          body: photoForm,
        });

        const photoData = await photoRes.json();
        if (!photoData.ok) throw new Error(photoData.description || "Telegram photo error");
      }
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error(error);
    return Response.json({ success: false, error: String(error.message || error) }, { status: 500 });
  }
}
