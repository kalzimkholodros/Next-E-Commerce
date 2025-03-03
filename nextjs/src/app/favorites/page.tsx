'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface User {
  id: number;
  name: string;
  image: string;
  price: number;
}

export default function Favorites() {
  const [favorites, setFavorites] = useState<User[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    fetch('http://localhost:3001/api/favorites', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setFavorites(data))
      .catch(console.error);
  }, [router]);

  const handleRemoveFavorite = async (itemId: number) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch('http://localhost:3001/api/favorites/toggle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ itemId })
      });

      if (response.ok) {
        setFavorites(prev => prev.filter(item => item.id !== itemId));
      }
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  const handleAddToCart = async (itemId: number) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch('http://localhost:3001/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ itemId })
      });

      if (response.ok) {
        alert('Added to cart!');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <div className="min-h-[80vh] py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Your Favorites</h1>
      
      {favorites.length === 0 ? (
        <p className="text-center text-gray-600">No favorites yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto px-4">
          {favorites.map(item => (
            <div key={item.id} className="bg-white rounded-lg shadow-md p-4">
              <div className="relative w-full aspect-square mb-3">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="rounded-lg object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <button
                  onClick={() => handleRemoveFavorite(item.id)}
                  className="absolute top-2 right-2 p-2 rounded-full bg-red-500 text-white"
                >
                  ★
                </button>
              </div>
              <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
              <p className="text-sm text-gray-600 mb-2">User ID: {item.id}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-green-600">${item.price}</span>
                <button
                  onClick={() => handleAddToCart(item.id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 