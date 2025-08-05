"use client";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function WeeklyReport() {
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchReport = async () => {
    setLoading(true);
    const res = await fetch('/api/weekly-report');
    const data = await res.json();
    setReport(data);
    setLoading(false);
  };

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Weekly Report</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={fetchReport} disabled={loading} className="mb-4">
          {loading ? 'Generating...' : 'Generate Weekly Report'}
        </Button>
        {report && (
          <div className="space-y-4">
            <Alert>
              <AlertDescription>
                <strong>Week:</strong> {report.metrics.week}
              </AlertDescription>
            </Alert>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Shopify Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div><strong>Sales:</strong> ${report.metrics.shopify.totalSales}</div>
                    <div><strong>Orders:</strong> {report.metrics.shopify.orders}</div>
                    <div><strong>Top Product:</strong> {report.metrics.shopify.topProduct}</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div><strong>Visitors:</strong> {report.metrics.analytics.visitors}</div>
                    <div><strong>Bounce Rate:</strong> {report.metrics.analytics.bounceRate}</div>
                    <div><strong>Avg. Session:</strong> {report.metrics.analytics.avgSession}</div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>AI Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="whitespace-pre-line">{report.summary}</div>
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
}