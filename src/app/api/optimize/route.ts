import { NextRequest, NextResponse } from 'next/server';
import { getOpenAIRecommendations } from '@/lib/openai';

export async function POST(req: NextRequest) {
  const { product, seo, email } = await req.json();
  const result = await getOpenAIRecommendations(product, seo, email);
  return NextResponse.json(result);
}
