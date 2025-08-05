"use client";
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 flex items-center justify-between px-8 py-4 shadow-sm">
      <div className="flex items-center gap-4">
        <span className="font-extrabold text-2xl tracking-tight text-black">NIKE</span>
        <Link href="/dashboard" className="font-semibold text-gray-700 hover:text-black transition">Dashboard</Link>
        <Link href="/products" className="font-semibold text-gray-700 hover:text-black transition">Products</Link>
      </div>
      <div>
        {/* Add user/account/cart icons here if needed */}
      </div>
    </nav>
  );
}