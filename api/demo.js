export default async function handler(req, res) {
  const input = (req.body && req.body.input) || "";
  const hasKey = Boolean(process.env.MIMO_API_KEY);
  const mode = hasKey ? "mimo-ready" : "mock-demo";
  const project = "mimo-code-review-bot";
  const task = "review";
  const mock = {"summary": "Potential hardcoded secret detected. Avoid printing sensitive values. Move secrets to environment variables.", "severity": "high", "findings": ["Hardcoded password string", "Sensitive value printed to stdout", "Missing secret management"]};
  return res.status(200).json({
    ok: true,
    project,
    task,
    mode,
    input_preview: input.slice(0, 500),
    result: mock,
    next_step: hasKey ? "Connect live MiMo request in this API route." : "Set MIMO_API_KEY in Vercel Environment Variables to enable real MiMo calls."
  });
}
