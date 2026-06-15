export async function POST(req) {
  try {
    const formData = await req.formData();

    const name = formData.get("name");
    const phone = formData.get("phone");
    const address = formData.get("address");
    const issue = formData.get("issue");
    const photos = formData.getAll("photos");

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    const message = `
🛠 New HandyYet Quote Request

👤 Name: ${name}

📞 Phone: ${phone}

📍 Address: ${address || "Not provided"}

📋 Issue:
${issue}
`;

    // Send text message
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    });

    // Send photos
await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    chat_id: chatId,
    text: `Photos received: ${photos.length}`,
  }),
});

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
    console.log("PHOTO RESPONSE:", photoData);

    if (!photoData.ok) {
      throw new Error(photoData.description);
    }
  }
}
    return Response.json({ success: true });
  } catch (error) {
    console.log(error);

    return Response.json({ success: false });
  }
}