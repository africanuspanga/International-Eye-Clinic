import { Resend } from "resend";
import { submitForm } from "@/lib/cms/submit";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { firstName, lastName, phone, email, subject, message } = body;

    // Save to the admin inbox first, so the message is never lost.
    const saved = await submitForm("contact", {
      name: `${firstName ?? ""} ${lastName ?? ""}`.trim(),
      phone,
      email,
      message,
      subject,
    });
    if (!saved.ok) console.error("Contact inbox save failed:", saved.error);

    const { data, error } = await resend.emails.send({
      from: "contact@resend.dev",
      to: ["info@eye.co.tz"],
      subject: `New Contact Message from ${firstName} ${lastName}${subject ? ` - ${subject}` : ""}`,
      html: `
        <div style="font-family: 'Poppins', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <div style="background: #e62d26; padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 22px;">New Contact Message</h1>
          </div>
          <div style="padding: 20px; background: #fff;">
            <p style="color: #111827; font-size: 16px;">A new message has been sent through the website contact form.</p>
            
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #6b7280; width: 40%;">Name</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee; color: #111827;">${firstName || "N/A"} ${lastName || "N/A"}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #6b7280;">Phone</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee; color: #111827;">${phone || "N/A"}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #6b7280;">Email</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee; color: #111827;">${email || "N/A"}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #6b7280;">Subject</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee; color: #111827;">${subject || "N/A"}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #6b7280; vertical-align: top;">Message</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee; color: #111827;">${message ? message.replace(/\n/g, "<br/>") : "N/A"}</td>
              </tr>
            </table>

            <p style="margin-top: 30px; color: #6b7280; font-size: 12px;">
              This email was sent automatically from the International Eye Hospital website contact form.
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      if (saved.ok) return Response.json({ success: true, emailed: false });
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ success: true, data });
  } catch (err: any) {
    console.error("Contact email error:", err);
    return Response.json({ error: err.message || "Internal server error" }, { status: 500 });
  }
}
