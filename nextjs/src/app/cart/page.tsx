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

export default function Cart() {
  const [cartItems, setCartItems] = useState<User[]>([]);
  const [balance, setBalance] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    // Sepet içeriğini getir
    fetch('http://localhost:3001/api/cart', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setCartItems(data))
      .catch(console.error);

    // Bakiyeyi getir
    fetch('http://localhost:3001/api/balance', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setBalance(data.balance))
      .catch(console.error);
  }, [router]);

  const handlePurchase = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch('http://localhost:3001/api/purchase', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (response.ok) {
        setCartItems([]);
        setBalance(data.newBalance);
        alert(`Purchase successful! Total: $${data.total}`);
      } else {
        alert(data.message || 'Purchase failed');
      }
    } catch (error) {
      console.error('Error making purchase:', error);
      alert('Error making purchase');
    }
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-[80vh] py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Your Cart</h1>
      
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg">Your Balance:</span>
            <span className="text-xl font-bold text-green-600">${balance}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-lg">Total Price:</span>
            <span className="text-xl font-bold text-blue-600">${totalPrice}</span>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-600">Your cart is empty.</p>
        ) : (
          <>
            <div className="space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="bg-white rounded-lg shadow-md p-4 flex items-center">
                  <div className="relative w-20 h-20 mr-4">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="rounded-lg object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                    <p className="text-sm text-gray-600">User ID: {item.id}</p>
                  </div>
                  <span className="text-lg font-bold text-green-600">${item.price}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={handlePurchase}
                disabled={totalPrice > balance}
                className={`px-8 py-3 rounded-lg text-white text-lg font-semibold ${
                  totalPrice > balance
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {totalPrice > balance ? 'Insufficient Balance' : 'Purchase All'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 