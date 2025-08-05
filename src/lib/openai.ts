import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function getOpenAIRecommendations(product: string, seo: string, email: string) {
  const prompt = `
You are an e-commerce optimization expert. 
Given the following:
- Product: ${product}
- SEO: ${seo}
- Email: ${email}

Suggest:
1. Product improvements
2. SEO optimizations
3. Email engagement tips

Respond in markdown with clear sections.
  `;
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: prompt }],
  });
  return { suggestions: completion.choices[0].message.content };
}

export async function getOpenAIWeeklySummary(metrics: any) {
  const prompt = `
You are an e-commerce analytics expert. Given these weekly metrics:

Shopify:
- Total Sales: $${metrics.shopify.totalSales}
- Orders: ${metrics.shopify.orders}
- Top Product: ${metrics.shopify.topProduct}

Google Analytics:
- Visitors: ${metrics.analytics.visitors}
- Bounce Rate: ${metrics.analytics.bounceRate}
- Avg. Session: ${metrics.analytics.avgSession}

Week: ${metrics.week}

Write a short, plain-text summary of the store's performance, highlighting trends and any notable points.
  `;
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: prompt }],
  });
  return completion.choices[0].message.content;
}
