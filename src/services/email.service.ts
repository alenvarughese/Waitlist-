import nodemailer from 'nodemailer';

export const sendWaitlistConfirmation = async (
  name: string,
  email: string,
  message?: string
) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Waitlist" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: '🎉 Welcome to the Waitlist!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #4F46E5;">Welcome, ${name}!</h1>
        <p style="font-size: 16px; color: #374151;">
          Thank you for joining our waitlist. We're thrilled to have you on board!
          Thanks for showing interestin our product.
        </p>
        ${message ? `<p style="font-size: 14px; color: #6B7280; background: #F3F4F6; padding: 12px; border-radius: 8px;"><strong>Your message:</strong> ${message}</p>` : ''}
        <p style="font-size: 14px; color: #6B7280;">
          We'll notify you as soon as we're ready to launch. Stay tuned!
        </p>
      </div>
    `,
  });
};
