export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  // Strip /api/sleeper prefix to get the Sleeper path
  const path = req.url.replace(/^\/api\/sleeper/, '');
  const url = `https://api.sleeper.app/v1${path}`;

  try {
    const r = await fetch(url);
    const ct = r.headers.get('content-type') || 'application/json';
    const body = await r.text();
    res.setHeader('Content-Type', ct);
    res.status(r.status).send(body);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}