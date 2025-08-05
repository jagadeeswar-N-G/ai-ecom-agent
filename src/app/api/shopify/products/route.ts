import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
  // Use token from env for local/dev
  const accessToken = process.env.SHOPIFY_ADMIN_API_TOKEN;
  const shop = process.env.SHOPIFY_STORE_DOMAIN;

  if (!accessToken || !shop) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const productsRes = await axios.get(`https://${shop}/admin/api/2023-10/products.json`, {
    headers: {
      'X-Shopify-Access-Token': accessToken,
    },
  });

  return NextResponse.json(productsRes.data.products);
}