import { NextRequest, NextResponse } from 'next/server';

const DNI_URL = 'https://enginefish.leadspediatrack.com/dni/dni.php';
const DEFAULT_RESPONSE = {
  number: '18773691725',
  display: '(877) 369-1725',
};

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

export async function GET(request: NextRequest) {
  const fbclid = request.nextUrl.searchParams.get('fbclid');

  if (!fbclid) {
    return NextResponse.json(DEFAULT_RESPONSE);
  }

  const ip = getVisitorIp(request);

  if (!ip) {
    return NextResponse.json(DEFAULT_RESPONSE, { status: 200 });
  }

  const url = new URL(DNI_URL);
  url.searchParams.set('lp_public_key', '1021c5e95f999f41328dc98bac18af69');
  url.searchParams.set('lp_block_id', '3');
  url.searchParams.set('lp_campaign_id', '261');
  url.searchParams.set('ip_address', ip);
  url.searchParams.set('fbclid', fbclid);

  try {
    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) return NextResponse.json(DEFAULT_RESPONSE);

    const data = await response.json();
    if (!data?.success || !data?.number || !data?.display) {
      return NextResponse.json(DEFAULT_RESPONSE);
    }

    return NextResponse.json({
      number: String(data.number),
      display: String(data.display),
    });
  } catch {
    return NextResponse.json(DEFAULT_RESPONSE);
  }
}
