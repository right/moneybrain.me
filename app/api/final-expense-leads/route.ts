import { NextRequest, NextResponse } from 'next/server';

const LEADSPEDIA_POST_URL = 'https://enginefish.leadspediatrack.com/post.do';
const CAMPAIGN_ID = process.env.LEADSPEDIA_FINAL_EXPENSE_CAMPAIGN_ID;
const CAMPAIGN_KEY = process.env.LEADSPEDIA_FINAL_EXPENSE_CAMPAIGN_KEY;

function getVisitorIp(request: NextRequest) {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) return forwardedFor.split(',')[0]?.trim();

  return (
    request.headers.get('x-real-ip') ||
    request.headers.get('x-vercel-forwarded-for') ||
    request.headers.get('cf-connecting-ip') ||
    undefined
  );
}

function requiredString(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function getLeadspediaText(value: unknown): string {
  if (typeof value === 'string') return value;
  if (!value || typeof value !== 'object') return '';

  const fields = ['msg', 'message', 'error', 'errors', 'result'];
  return fields
    .map((field) => JSON.stringify((value as Record<string, unknown>)[field] ?? ''))
    .join(' ')
    .toLowerCase();
}

function isDuplicateLeadspediaResponse(value: unknown) {
  const text = getLeadspediaText(value);
  return text.includes('duplicate') || text.includes('dupe') || text.includes('already');
}

export async function POST(request: NextRequest) {
  if (!CAMPAIGN_ID || !CAMPAIGN_KEY) {
    return NextResponse.json({ ok: false, message: 'Lead posting is not configured yet.' }, { status: 500 });
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: 'Invalid lead payload.' }, { status: 400 });
  }

  const payload = body && typeof body === 'object' ? (body as Record<string, unknown>) : {};
  const name = requiredString(payload.name);
  const phone = requiredString(payload.phone);
  const email = requiredString(payload.email);
  const zip = requiredString(payload.zip);

  if (!name || !phone || !email || !zip) {
    return NextResponse.json({ ok: false, message: 'Please complete all required fields.' }, { status: 400 });
  }

  const lead = new URLSearchParams({
    lp_campaign_id: CAMPAIGN_ID,
    lp_campaign_key: CAMPAIGN_KEY,
    lp_response: 'json',
    first_name: name,
    phone_cell: phone,
    email_address: email,
    zip_code: zip,
  });

  const ip = getVisitorIp(request);
  if (ip) lead.set('ip_address', ip);

  try {
    const response = await fetch(LEADSPEDIA_POST_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: lead,
      cache: 'no-store',
    });

    const raw = await response.text();
    let data: Record<string, unknown> | null = null;

    try {
      data = JSON.parse(raw) as Record<string, unknown>;
    } catch {
      data = null;
    }

    const accepted = response.ok && data?.result === 'success';
    const duplicate = isDuplicateLeadspediaResponse(data ?? raw);

    if (!accepted && !duplicate) {
      return NextResponse.json(
        { ok: false, message: 'Lead was not accepted. Please call us instead.', leadspedia: data ?? raw },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, duplicate, leadId: data?.lead_id ?? null });
  } catch {
    return NextResponse.json({ ok: false, message: 'Lead posting failed. Please call us instead.' }, { status: 502 });
  }
}
