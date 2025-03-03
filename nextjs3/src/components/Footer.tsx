'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Category {
  _id: string;
  name: string;
}

const Footer = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories');
        if (!res.ok) throw new Error('Failed to fetch categories');
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <footer className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Mağaza Bilgileri */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">ShopNext</h3>
            <p className="text-gray-300 text-sm">
              Güvenilir alışverişin adresi. En yeni ürünler, en iyi fiyatlar ve hızlı teslimat garantisi ile yanınızdayız.
            </p>
          </div>

          {/* Kategoriler */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Kategoriler</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category._id}>
                  <Link href={`/categories/${category._id}`} className="text-gray-300 hover:text-white text-sm">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Müşteri Hizmetleri */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Müşteri Hizmetleri</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/help" className="text-gray-300 hover:text-white">
                  Yardım Merkezi
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-300 hover:text-white">
                  Kargo Takip
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-300 hover:text-white">
                  İade Koşulları
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white">
                  Bize Ulaşın
                </Link>
              </li>
            </ul>
          </div>

          {/* Güvenli Alışveriş */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Güvenli Alışveriş</h3>
            <div className="space-y-4">
              <p className="text-sm text-gray-300">
                SSL sertifikalı güvenli ödeme altyapısı
              </p>
              <div className="flex space-x-4">
                <img src="/visa.png" alt="Visa" className="h-8" />
                <img src="/mastercard.png" alt="Mastercard" className="h-8" />
                <img src="/paypal.png" alt="PayPal" className="h-8" />
              </div>
              <div className="mt-4">
                <Link href="/mobile-app" className="inline-flex items-center text-gray-300 hover:text-white">
                  <svg className="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.05 20H6.95c-1.05 0-1.9-.85-1.9-1.9V5.9c0-1.05.85-1.9 1.9-1.9h10.1c1.05 0 1.9.85 1.9 1.9v12.2c0 1.05-.85 1.9-1.9 1.9zM6.95 5c-.5 0-.9.4-.9.9v12.2c0 .5.4.9.9.9h10.1c.5 0 .9-.4.9-.9V5.9c0-.5-.4-.9-.9-.9H6.95z"/>
                    <path d="M12 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
                  </svg>
                  Mobil Uygulamamızı İndirin
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Alt Footer */}
        <div className="mt-8 border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} ShopNext. Tüm hakları saklıdır.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-gray-300 text-sm">
                Gizlilik Politikası
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-gray-300 text-sm">
                Kullanım Koşulları
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-gray-300 text-sm">
                Çerez Politikası
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 