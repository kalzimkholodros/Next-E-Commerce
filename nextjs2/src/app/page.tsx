'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  stock: number;
  date: string;
  imageUrl: string;
  brand: string;
}

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        if (!response.ok) {
          throw new Error('Ürünler yüklenirken bir hata oluştu');
        }
        const data = await response.json();
        // Son eklenen 6 ürünü göster
        setFeaturedProducts(data.slice(0, 6));
        setLoading(false);
      } catch (err) {
        console.error('Ürünler yüklenirken hata:', err);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Metal Shop'a Hoş Geldiniz</h1>
        <p className="text-xl text-gray-600 mb-8">
          Kaliteli ürünler, uygun fiyatlar ve profesyonel hizmet
        </p>
        <Link
          href="/products"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Tüm Ürünleri Görüntüle
        </Link>
      </div>

      {/* Featured Products */}
      <section className="w-full mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Öne Çıkan Ürünler</h2>
        {loading ? (
          <div className="text-center">Yükleniyor...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{product.brand}</p>
                  <p className="text-gray-600 mb-4 text-sm line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-blue-600">
                      {product.price.toFixed(2)} TL
                    </span>
                    <Link
                      href="/products"
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors text-sm"
                    >
                      İncele
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Categories */}
      <section className="w-full mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Kategoriler</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/products?category=elektrik" className="group">
            <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2">Elektrik</h3>
              <p className="text-gray-600">Kablolar, Panolar ve Daha Fazlası</p>
            </div>
          </Link>
          <Link href="/products?category=inşaat" className="group">
            <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2">İnşaat</h3>
              <p className="text-gray-600">Profiller, Demirler ve Yapı Malzemeleri</p>
            </div>
          </Link>
          <Link href="/products?category=beyaz eşya" className="group">
            <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2">Beyaz Eşya</h3>
              <p className="text-gray-600">Yedek Parçalar ve Aksesuarlar</p>
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
}
