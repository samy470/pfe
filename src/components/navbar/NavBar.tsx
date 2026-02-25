'use client';
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { searchItems } from "../../redux/shopSlice";

export default function NavBar({ onLogout }: { onLogout: () => void }) {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    router.push("/Login");
    localStorage.removeItem("username");
    onLogout();
  }

  if (pathname === '/Login' || pathname === '/Registration') return null;

  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          Navbar scroll
        </Link>
        <button className="lg:hidden block">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="w-full lg:w-auto lg:flex lg:items-center space-y-2 lg:space-y-0 lg:space-x-4 mt-4 lg:mt-0">
          <Link href="/" className="block hover:text-gray-300">
            Home
          </Link>
          <Link href="/Shop" className="block hover:text-gray-300">
            Shop
          </Link>
          <button onClick={handleLogout} className="block hover:text-gray-300">
            Logout
          </button>
          <div className="relative group">
            <button className="hover:text-gray-300">
              Language ▼
            </button>
            <div className="absolute hidden group-hover:block bg-gray-800 text-white rounded mt-2 py-2 w-48">
              <a href="#action3" className="block px-4 py-2 hover:bg-gray-700">English</a>
              <a href="#action4" className="block px-4 py-2 hover:bg-gray-700">French</a>              <a href="#action5" className="block px-4 py-2 hover:bg-gray-700">Arab</a>
            </div>
          </div>
        </div>

        {/* search */}
        <div className="w-full lg:w-auto mt-4 lg:mt-0">
          <div className="flex gap-2">
            <Link href="/Login" className="px-5 py-2 rounded-lg font-medium bg-white/10 hover:bg-white/20 border border-white/20">
            Sign in
          </Link>
          <Link href="/Registration" className="px-5 py-2 rounded-lg font-medium bg-blue-600 hover:bg-blue-700">
            Register
          </Link>
            <input
              type="search"
              placeholder="Search"
              className="px-3 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                dispatch(searchItems(e.target.value));
              }}
            />
            <button
              onClick={() => dispatch(searchItems(query))}
              className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}