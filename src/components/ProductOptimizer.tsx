"use client";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';
import { marked } from 'marked';

type Product = {
  id: number;
  title: string;
  body_html: string;
  image?: { src: string };
  [key: string]: any;
};

export default function ProductOptimizer({ product, imageSize = 160 }: { product: Product; imageSize?: number }) {
  const [optimized, setOptimized] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOptimize = async () => {
    console.log('Optimize button clicked');
    setLoading(true);
    setOptimized(null);
    setError(null);
    setOpen(true);
    try {
      const res = await fetch('/api/optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product: `${product.title}\n${product.body_html}`,
          seo: '',
          email: '',
        }),
      });
      if (!res.ok) throw new Error('Failed to get AI suggestions.');
      const data = await res.json();
      setOptimized(data.suggestions);
      console.log('AI suggestions received:', data.suggestions);
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
      console.error('Error during optimization:', err);
    } finally {
      setLoading(false);
    }
  };

  // Debug: log when Sheet open state changes
  React.useEffect(() => {
    console.log('Sheet open state:', open);
  }, [open]);

  return (
    <Card className="mb-8 shadow-lg border-0 transition hover:scale-105 duration-200">
      <CardHeader className="flex flex-row items-center gap-6 pb-0">
        <div
          className="bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden"
          style={{ width: imageSize, height: imageSize }}
        >
          {product.image?.src ? (
            <img src={product.image.src} alt={product.title} className="object-cover w-full h-full" style={{ width: imageSize, height: imageSize }} />
          ) : (
            <span className="text-gray-300 text-4xl">🛒</span>
          )}
        </div>
        <CardTitle className="text-2xl font-extrabold text-black">{product.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="prose mb-2 text-gray-700" dangerouslySetInnerHTML={{ __html: product.body_html }} />
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              onClick={handleOptimize}
              disabled={loading}
              className="mt-4 px-8 py-3 text-lg font-bold bg-black text-white rounded-full hover:bg-gray-900 transition"
            >
              {loading ? 'Optimizing...' : 'Optimize'}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-2xl">
            <SheetTitle asChild>
              <VisuallyHidden>Product Optimization Details</VisuallyHidden>
            </SheetTitle>
            <SheetDescription asChild>
              <VisuallyHidden>This panel shows the original and AI-optimized product details.</VisuallyHidden>
            </SheetDescription>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <h4 className="font-medium mb-1">Original</h4>
                <div className="prose" dangerouslySetInnerHTML={{ __html: product.body_html }} />
              </div>
              <div className="flex-1">
                <h4 className="font-medium mb-1">AI Suggestions</h4>
                {loading ? (
                  <Skeleton className="h-32 w-full rounded mb-2" />
                ) : error ? (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                ) : (
                  <div className="prose" dangerouslySetInnerHTML={{ __html: optimized ? marked(optimized) : '' }} />
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  );
}