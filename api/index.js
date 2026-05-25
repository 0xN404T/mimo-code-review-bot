export default async function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json({ ok: true, project: 'mimo-code-review-bot', deploy: 'vercel' });
  }
  return res.status(200).json({ ok: true, message: 'GitHub webhook endpoint placeholder. Connect MiMo review logic here.' });
}
