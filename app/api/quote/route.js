import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const body = await req.json();

    await resend.emails.send({
      from: "HandyYet <onboarding@resend.dev>",

      to: "nikita2808rnd@gmail.com",

      subject: "New HandyYet Quote Request",

      html: `
        <div style="font-family:sans-serif;padding:20px">
          <h1>New Quote Request</h1>

          <p><strong>Name:</strong> ${body.name}</p>

          <p><strong>Phone:</strong> ${body.phone}</p>

          <p><strong>Issue:</strong></p>

          <p>${body.issue}</p>
        </div>
      `,
    });

    return Response.json({
      success: true,
    });
  } catch (error) {
    console.log(error);

    return Response.json({
      success: false,
    });
  }
}