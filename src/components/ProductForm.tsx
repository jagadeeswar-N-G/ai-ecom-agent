"use client";
import { useState } from "react";

export default function ProductForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const [product, setProduct] = useState("");
  const [seo, setSeo] = useState("");
  const [email, setEmail] = useState("");
  return (
    <form
      className="space-y-4"
      onSubmit={e => {
        e.preventDefault();
        onSubmit({ product, seo, email });
      }}
    >
      <input className="input" placeholder="Product Description" value={product} onChange={e => setProduct(e.target.value)} required />
      <input className="input" placeholder="SEO Details" value={seo} onChange={e => setSeo(e.target.value)} required />
      <input className="input" placeholder="Email Campaign" value={email} onChange={e => setEmail(e.target.value)} required />
      <button className="btn" type="submit">Optimize</button>
    </form>
  );
}
