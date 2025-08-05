import { NextRequest, NextResponse } from 'next/server';
import { getOpenAIWeeklySummary } from '@/lib/openai';

function simulateMetrics() {
  // Simulate Shopify and Google Analytics metrics
  return {
    shopify: {
      totalSales: Math.floor(Math.random() * 10000) + 1000,
      orders: Math.floor(Math.random() * 200) + 20,
      topProduct: 'AI Coffee Mug',
    },
    analytics: {
      visitors: Math.floor(Math.random() * 5000) + 500,
      bounceRate: (Math.random() * 30 + 30).toFixed(2) + '%',
      avgSession: (Math.random() * 2 + 1).toFixed(2) + ' min',
    },
    week: '2024-06-01 to 2024-06-07',
  };
}

export async function GET(_req: NextRequest) {
  const metrics = simulateMetrics();
  const summary = await getOpenAIWeeklySummary(metrics);
  return NextResponse.json({ metrics, summary });
}