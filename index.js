import 'dotenv/config';
import { Octokit } from '@octokit/rest';

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const MIMO_API_KEY = process.env.MIMO_API_KEY;

async function askMiMo(diff) {
  const res = await fetch(process.env.MIMO_BASE_URL || 'https://platform.xiaomimimo.com/v1/chat/completions', {
    method: 'POST', headers: { 'Authorization': `Bearer ${MIMO_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: process.env.MIMO_MODEL || 'mimo-v2.5', messages: [
      {role:'system', content:'You are a strict senior code reviewer. Return concise actionable review.'},
      {role:'user', content:`Review this diff:\n${diff.slice(0,12000)}`}
    ]})
  });
  const data = await res.json();
  return data.choices?.[0]?.message?.content || JSON.stringify(data).slice(0,2000);
}

export async function reviewPR(owner, repo, pull_number) {
  const files = await octokit.pulls.listFiles({owner, repo, pull_number});
  const diff = files.data.map(f => `FILE: ${f.filename}\n${f.patch || ''}`).join('\n\n');
  const review = await askMiMo(diff);
  await octokit.issues.createComment({owner, repo, issue_number: pull_number, body: `## MiMo Review\n\n${review}`});
}

if (process.argv[2]) {
  const [owner, repo, pr] = process.argv[2].split('/');
  reviewPR(owner, repo, Number(pr));
}
