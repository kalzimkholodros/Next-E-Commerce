'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

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

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        if (!response.ok) {
          throw new Error('Ürünler yüklenirken bir hata oluştu');
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError('Ürünler yüklenirken bir hata oluştu');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;

  if (loading) {
    return <div className="container mx-auto p-4">Yükleniyor...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Ürünlerimiz</h1>
      
      {/* Kategori Filtreleme */}
      <div className="mb-6 flex gap-2">
        <button
          className={`px-4 py-2 rounded ${!selectedCategory ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setSelectedCategory('')}
        >
          Tümü
        </button>
        <button
          className={`px-4 py-2 rounded ${selectedCategory === 'elektrik' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setSelectedCategory('elektrik')}
        >
          Elektrik
        </button>
        <button
          className={`px-4 py-2 rounded ${selectedCategory === 'inşaat' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setSelectedCategory('inşaat')}
        >
          İnşaat
        </button>
        <button
          className={`px-4 py-2 rounded ${selectedCategory === 'beyaz eşya' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setSelectedCategory('beyaz eşya')}
        >
          Beyaz Eşya
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
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
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 text-sm mb-2">{product.brand}</p>
              <p className="text-gray-600 mb-4 text-sm line-clamp-2">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-blue-600">
                  {product.price.toFixed(2)} TL
                </span>
                <span className="text-sm text-gray-500">
                  Stok: {product.stock}
                </span>
              </div>
              <div className="mt-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                  {product.category}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 