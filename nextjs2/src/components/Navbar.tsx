'use client';

import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-gray-800">Logo</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
              Ana Sayfa
            </Link>
            <Link href="/products" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
              Ürünler
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
              Hakkımızda
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
              İletişim
            </Link>
            <Link href="/login" className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-md ml-4">
              Giriş Yap
            </Link>
            <Link href="/signup" className="bg-green-500 text-white hover:bg-green-600 px-4 py-2 rounded-md">
              Kayıt Ol
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              <span className="sr-only">Ana menüyü aç</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="block text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
              Ana Sayfa
            </Link>
            <Link href="/products" className="block text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
              Ürünler
            </Link>
            <Link href="/about" className="block text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
              Hakkımızda
            </Link>
            <Link href="/contact" className="block text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
              İletişim
            </Link>
            <Link href="/login" className="block bg-blue-500 text-white hover:bg-blue-600 px-3 py-2 rounded-md mt-4">
              Giriş Yap
            </Link>
            <Link href="/signup" className="block bg-green-500 text-white hover:bg-green-600 px-3 py-2 rounded-md mt-2">
              Kayıt Ol
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 