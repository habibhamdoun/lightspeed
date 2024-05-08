import { sendMail } from '@/app/lib/mail';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await sendMail(req.body);
      res.status(200).json({ message: 'Mail sent!' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
