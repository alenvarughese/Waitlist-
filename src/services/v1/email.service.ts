import nodemailer from 'nodemailer';

let transporter: any;

const getTransporter = () => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }
  return transporter;
};

const getV1Template = (name: string, message?: string): string => `
  <!DOCTYPE html>
  <html>
    <body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #333; line-height: 1.6; margin: 0; padding: 0;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee;">
        <h2 style="color: #4F46E5;">Welcome to the Waitlist!</h2>
        <p>Hi <strong>${name}</strong>,</p>
        <p>Thank you for joining our waitlist. We're excited to have you with us!</p>
        ${message ? `
          <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #4F46E5; margin: 20px 0;">
            <p style="margin: 0; font-size: 14px;"><strong>Your message:</strong><br>${message}</p>
          </div>
        ` : ''}
        <p>We'll notify you as soon as we launch. Stay tuned!</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="font-size: 12px; color: #888;">This is an automated message, please do not reply.</p>
      </div>
    </body>
  </html>
`;

const sendEmail = async (
  email: string,
  subject: string,
  html: string
) => {
  const mailTransporter = getTransporter();
  await mailTransporter.sendMail({
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
  await sendEmail(email, '🎉 Welcome to the Waitlist!', getV1Template(name, message));
};
