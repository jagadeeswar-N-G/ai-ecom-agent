"use client";
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import ProductOptimizer from '@/components/ProductOptimizer';
import WeeklyReport from '@/components/WeeklyReport';

export default function DashboardPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/shopify/products')
      .then(res => {
        if (res.status === 401) setConnected(false);
        else return res.json();
      })
      .then(data => {
        if (data && Array.isArray(data)) {
          setProducts(data);
          setConnected(true);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleConnect = () => {
    const shop = prompt('Enter your Shopify store (e.g. mystore.myshopify.com):');
    if (shop) window.location.href = `/api/shopify/auth?shop=${shop}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-gray-50 to-white py-12 mb-8 border-b border-gray-200">
        <div className="container mx-auto px-8 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">AI E-Commerce Optimization</h1>
          <p className="text-lg text-gray-600 max-w-2xl mb-6">Supercharge your Shopify store with AI-powered product optimization, weekly reports, and actionable insights. Designed for modern brands.</p>
          {!connected && !loading && (
            <Button onClick={handleConnect} className="px-8 py-3 text-lg font-bold bg-black text-white rounded-full hover:bg-gray-900 transition">
              Connect Shopify Store
            </Button>
          )}
        </div>
      </section>

      <main className="flex-1 container mx-auto px-8 pb-12">
        {/* Product Grid */}
        {connected && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Your Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {products.map(product => (
                <ProductOptimizer key={product.id} product={product} imageSize={160} />
              ))}
            </div>
          </section>
        )}

        {/* Alerts for not connected */}
        {!connected && !loading && (
          <Alert className="mb-8">
            <AlertDescription>
              Connect your Shopify store to start optimizing your products and generating reports.
            </AlertDescription>
          </Alert>
        )}

        {/* Weekly Report */}
        <WeeklyReport />
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-gray-200 py-6 bg-white text-center text-gray-500 text-sm mt-auto">
        &copy; {new Date().getFullYear()} Nike AI E-Commerce Agent. Not affiliated with Nike, Inc.
      </footer>
    </div>
  );
}