import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const SHOPIFY_API_KEY = process.env.SHOPIFY_API_KEY!;
const SHOPIFY_API_SECRET = process.env.SHOPIFY_API_SECRET!;
const SHOPIFY_APP_URL = process.env.SHOPIFY_APP_URL!;

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const shop = params.get('shop');
  const code = params.get('code');

  if (!shop || !code) return NextResponse.json({ error: 'Missing params' }, { status: 400 });

  // Exchange code for access token
  const tokenRes = await axios.post(`https://${shop}/admin/oauth/access_token`, {
    client_id: SHOPIFY_API_KEY,
    client_secret: SHOPIFY_API_SECRET,
    code,
  });

  const accessToken = tokenRes.data.access_token;

  // Store accessToken in a cookie (for demo; use a DB in production)
  const response = NextResponse.redirect(`${SHOPIFY_APP_URL}/dashboard`);
  response.cookies.set('shopify_access_token', accessToken, { httpOnly: true, path: '/' });
  response.cookies.set('shop', shop, { httpOnly: true, path: '/' });

  return response;
}