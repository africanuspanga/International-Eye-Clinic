import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      doctor,
      service,
      date,
      time,
      firstName,
      lastName,
      phone,
      email,
      age,
      gender,
      existingPatient,
      reason,
    } = body;

    const { data, error } = await resend.emails.send({
      from: "appointments@resend.dev",
      to: ["info@eye.co.tz"],
      subject: `New Appointment Request from ${firstName} ${lastName}`,
      html: `
        <div style="font-family: 'Poppins', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <div style="background: #e62d26; padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 22px;">New Appointment Request</h1>
          </div>
          <div style="padding: 20px; background: #fff;">
            <p style="color: #111827; font-size: 16px;">A new appointment has been requested through the website.</p>
            
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #6b7280; width: 40%;">Patient Name</td>
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
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #6b7280;">Doctor</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee; color: #111827;">${doctor || "N/A"}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #6b7280;">Service</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee; color: #111827;">${service || "N/A"}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #6b7280;">Date & Time</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee; color: #111827;">${date || "N/A"} at ${time || "N/A"}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #6b7280;">Age</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee; color: #111827;">${age || "N/A"}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #6b7280;">Gender</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee; color: #111827;">${gender || "N/A"}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #6b7280;">Existing Patient</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee; color: #111827;">${existingPatient || "N/A"}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #6b7280; vertical-align: top;">Reason for Visit</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee; color: #111827;">${reason ? reason.replace(/\n/g, "<br/>") : "N/A"}</td>
              </tr>
            </table>

            <p style="margin-top: 30px; color: #6b7280; font-size: 12px;">
              This email was sent automatically from the International Eye Hospital website appointment booking system.
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ success: true, data });
  } catch (err: any) {
    console.error("Appointment email error:", err);
    return Response.json({ error: err.message || "Internal server error" }, { status: 500 });
  }
}
