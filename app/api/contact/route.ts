import {NextResponse} from 'next/server';

const MAX_BODY_BYTES = 12_000;
const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 5;
const requests = new Map<string, number[]>();
const clean = (value: unknown, max: number) => typeof value === 'string'
  ? value.normalize('NFKC').replace(/[<>\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max)
  : '';
const fail = (error: string, status: number) => NextResponse.json({error}, {status});

function rateLimited(ip: string, now: number) {
  const recent = (requests.get(ip) || []).filter(time => now - time < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS_PER_WINDOW) return true;
  recent.push(now);
  requests.set(ip, recent);
  if (requests.size > 1000) requests.forEach((times, key) => { if (!times.some(time => now - time < WINDOW_MS)) requests.delete(key); });
  return false;
}

export async function POST(req: Request) {
  const length = Number(req.headers.get('content-length') || 0);
  if (length > MAX_BODY_BYTES) return fail('Request is too large.', 413);
  if (!req.headers.get('content-type')?.includes('application/json')) return fail('Expected a JSON request.', 415);
  const forwarded = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (rateLimited(forwarded, Date.now())) return fail('Too many requests. Please wait a minute and try again.', 429);

  let data: Record<string, unknown>;
  try { data = await req.json(); } catch { return fail('Invalid request body.', 400); }
  if (new TextEncoder().encode(JSON.stringify(data)).length > MAX_BODY_BYTES) return fail('Request is too large.', 413);
  if (clean(data.company_fax, 100)) return fail('This request could not be accepted.', 400);

  const name = clean(data.name, 100), business = clean(data.business, 150);
  const email = clean(data.email, 254), message = clean(data.message, 3000);
  const category = clean(data.category, 100), website = clean(data.website, 300);
  const technicians = clean(data.technicians, 50), software = clean(data.software, 150);
  if (!name || !business || !email || !category || !message || message.length < 10) return fail('Please complete the required fields with a valid message.', 400);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return fail('Enter a valid business email address.', 400);
  if (website && !/^https?:\/\/[^\s]+$/i.test(website)) return fail('Enter a valid website URL, including https://.', 400);

  const key = process.env.RESEND_API_KEY, to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || "NJ's Business Marketing <onboarding@resend.dev>";
  if (!key || !to) return fail('The contact form is not configured yet. Please try again later.', 503);
  const lines = [`Name: ${name}`, `Business: ${business}`, `Email: ${email}`, `Website: ${website || 'Not provided'}`, `Service category: ${category}`, `Technicians: ${technicians || 'Not provided'}`, `Software: ${software || 'Not provided'}`, '', message].join('\n');
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST', headers: {Authorization: `Bearer ${key}`, 'Content-Type': 'application/json'},
      body: JSON.stringify({from, to, reply_to: email, subject: `Website & workflow review — ${business}`, text: lines}),
    });
    if (!response.ok) return fail('We could not send your request right now. Please try again later.', 502);
    return NextResponse.json({ok: true, message: 'Your request was accepted for delivery.'});
  } catch { return fail('We could not reach the email service. Please try again later.', 502); }
}
