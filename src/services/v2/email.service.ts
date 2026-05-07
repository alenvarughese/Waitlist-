import nodemailer from 'nodemailer';

const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

const getV2Template = (name: string, message?: string): string => `
  <!DOCTYPE html>
  <html>
    <body style="background-color: #f4f7fa; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 40px 0;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td align="center">
            <table border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); overflow: hidden;">
              <!-- Header -->
              <tr>
                <td align="center" style="background: #4F46E5; padding: 40px 20px;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 300;">You're In!</h1>
                </td>
              </tr>
              <!-- Content -->
              <tr>
                <td style="padding: 40px 30px;">
                  <h2 style="color: #1a1a1a; margin-top: 0;">Hi ${name},</h2>
                  <p style="color: #4a4a4a; font-size: 16px; line-height: 1.8;">
                    Welcome to the next generation of our product. You've successfully secured your spot on our exclusive waitlist.
                  </p>
                  <p style="color: #4a4a4a; font-size: 16px; line-height: 1.8;">
                    We're working hard to bring you something amazing, and we'll be sure to reach out with updates and early access opportunities.
                  </p>
                  
                  ${message ? `
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; border-radius: 6px; margin: 30px 0;">
                      <tr>
                        <td style="padding: 20px; border-left: 4px solid #4F46E5;">
                          <p style="margin: 0 0 5px 0; font-size: 12px; color: #64748b; text-transform: uppercase; font-weight: bold;">Your Feedback</p>
                          <p style="margin: 0; font-size: 14px; color: #334155; font-style: italic;">"${message}"</p>
                        </td>
                      </tr>
                    </table>
                  ` : ''}

                  <div style="text-align: center; margin-top: 40px;">
                    <span style="background-color: #4F46E5; color: #ffffff; padding: 15px 30px; border-radius: 5px; font-weight: bold; text-decoration: none; display: inline-block;">
                      Waitlist Confirmed
                    </span>
                  </div>
                </td>
              </tr>
              <!-- Footer -->
              <tr>
                <td style="background-color: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
                  <p style="margin: 0; font-size: 12px; color: #94a3b8;">
                    &copy; ${new Date().getFullYear()} Our Company. All rights reserved.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
`;

const sendEmail = async (
  email: string,
  subject: string,
  html: string
) => {
  const transporter = createTransporter();
  await transporter.sendMail({
    from: `"Waitlist" <${process.env.EMAIL_USER}>`,
    to: email,
    subject,
    html,
  });
};

export const sendWaitlistConfirmation = async (
  name: string,
  email: string,
  message?: string
) => {
  await sendEmail(email, '🚀 You\'re on the Waitlist!', getV2Template(name, message));
};
