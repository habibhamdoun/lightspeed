import nodemailer from 'nodemailer';
export async function sendMail({ to, name, subject, body }) {
  const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;

  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });
  try {
    const testResult = await transport.verify();
    console.log(testResult);
  } catch (err) {
    console.log(err);
  }

  try {
    const sendResult = await transport.sendMail({
      from: JSON.stringify(SMTP_EMAIL),
      to,
      subject,
      html: JSON.stringify(body),
    });
    console.log(sendResult);
  } catch (err) {
    console.log(err);
  }
}
