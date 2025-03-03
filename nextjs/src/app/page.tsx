'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface User {
  id: number;
  name: string;
  image: string;
  price: number;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3001/api/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error('Error fetching users:', err));

    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    if (token) {
      // Favorileri getir
      fetch('http://localhost:3001/api/favorites', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => setFavorites(data.map((item: User) => item.id)))
        .catch(console.error);
    }
  }, []);

  const handleFavorite = async (itemId: number) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login first');
      return;
    }

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
        setFavorites(prev => 
          prev.includes(itemId) 
            ? prev.filter(id => id !== itemId)
            : [...prev, itemId]
        );
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const handleAddToCart = async (itemId: number) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login first');
      return;
    }

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
      <h1 className="text-4xl font-bold mb-8 text-center">Welcome to Next.js App</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-w-7xl mx-auto px-4">
        {users.map(user => (
          <div key={user.id} className="bg-white rounded-lg shadow-md p-4">
            <div className="relative w-full aspect-square mb-3">
              <Image
                src={user.image}
                alt={user.name}
                fill
                className="rounded-lg object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
              />
              <button
                onClick={() => handleFavorite(user.id)}
                className={`absolute top-2 right-2 p-2 rounded-full ${
                  favorites.includes(user.id) 
                    ? 'bg-red-500 text-white' 
                    : 'bg-white text-gray-600'
                }`}
              >
                ★
              </button>
            </div>
            <h2 className="text-lg font-semibold text-gray-800">{user.name}</h2>
            <p className="text-sm text-gray-600 mb-2">User ID: {user.id}</p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-green-600">${user.price}</span>
              <button
                onClick={() => handleAddToCart(user.id)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
