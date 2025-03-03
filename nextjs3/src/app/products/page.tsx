'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Product {
  _id: string;
  name: string;
  price: number;
  comparePrice?: number;
  images: string[];
  category: {
    _id: string;
    name: string;
  };
  stock: number;
}

interface Category {
  _id: string;
  name: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories');
        if (!res.ok) throw new Error('Kategoriler yüklenemedi');
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Kategoriler yüklenirken bir hata oluştu');
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams();
        if (selectedCategory) {
          params.append('category', selectedCategory);
        }
        if (searchQuery) {
          params.append('search', searchQuery);
        }

        const url = `/api/products${params.toString() ? `?${params.toString()}` : ''}`;
        console.log('Fetching URL:', url);

        const res = await fetch(url, {
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
          }
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || 'Ürünler yüklenirken bir hata oluştu');
        }

        const data = await res.json();
        console.log('Fetched products:', data.length);
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err instanceof Error ? err.message : 'Ürünler yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, searchQuery]);

  if (error) {
    return (
      <div className="min-h-screen bg-white px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
        <div className="mx-auto max-w-max">
          <main className="sm:flex">
            <p className="text-4xl font-bold tracking-tight text-blue-600 sm:text-5xl">404</p>
            <div className="sm:ml-6">
              <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                  {error}
                </h1>
                <p className="mt-1 text-base text-gray-500">
                  Lütfen daha sonra tekrar deneyin.
                </p>
              </div>
              <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                <Link
                  href="/"
                  className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  Ana Sayfaya Dön
                </Link>
                <button
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Yenile
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4 sm:mb-0">Tüm Ürünler</h2>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            {/* Kategori Filtresi */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="block rounded-md border-gray-300 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
            >
              <option value="">Tüm Kategoriler</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>

            {/* Arama Kutusu */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ürün ara..."
                className="block w-full rounded-md border-gray-300 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>

        {error ? (
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500"
            >
              Yenile
            </button>
          </div>
        ) : loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Ürün bulunamadı.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <div key={product._id} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <Link href={`/products/${product._id}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{product.category.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {product.price.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
                    </p>
                    {product.comparePrice && (
                      <p className="mt-1 text-sm text-gray-500 line-through">
                        {product.comparePrice.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-4">
                  <button
                    className={`w-full px-4 py-2 text-sm font-medium rounded-md ${
                      product.stock > 0
                        ? 'bg-blue-600 text-white hover:bg-blue-500'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={product.stock === 0}
                  >
                    {product.stock > 0 ? 'Sepete Ekle' : 'Stokta Yok'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 