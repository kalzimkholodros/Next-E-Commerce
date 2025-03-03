'use client';

import { useState } from 'react';
import Link from 'next/link';

// Bu örnek için statik veri kullanıyoruz. Gerçek uygulamada bu veriler API'den gelecek
const initialCartItems = [
  {
    id: 1,
    name: 'Kablosuz Kulaklık',
    price: 999.99,
    image: '/products/headphones.jpg',
    quantity: 1
  },
  {
    id: 2,
    name: 'Akıllı Saat',
    price: 1299.99,
    image: '/products/smartwatch.jpg',
    quantity: 1
  }
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 150 ? 0 : 29.99;
  const total = subtotal + shipping;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Alışveriş Sepeti</h1>

        {cartItems.length === 0 ? (
          <div className="mt-10 text-center">
            <p className="text-gray-500">Sepetinizde ürün bulunmamaktadır.</p>
            <Link
              href="/products"
              className="mt-6 inline-block rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-500"
            >
              Alışverişe Başla
            </Link>
          </div>
        ) : (
          <div className="mt-10">
            <div className="flow-root">
              <ul className="-my-6 divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <Link href={`/products/${item.id}`}>{item.name}</Link>
                          </h3>
                          <p className="ml-4">
                            {(item.price * item.quantity).toLocaleString('tr-TR', {
                              style: 'currency',
                              currency: 'TRY'
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="rounded-md bg-gray-100 px-2 py-1 hover:bg-gray-200"
                          >
                            -
                          </button>
                          <span className="font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="rounded-md bg-gray-100 px-2 py-1 hover:bg-gray-200"
                          >
                            +
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="font-medium text-blue-600 hover:text-blue-500"
                        >
                          Kaldır
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 border-t border-gray-200 pt-10">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Ara Toplam</p>
                <p>
                  {subtotal.toLocaleString('tr-TR', {
                    style: 'currency',
                    currency: 'TRY'
                  })}
                </p>
              </div>
              <div className="flex justify-between text-base font-medium text-gray-900 mt-4">
                <p>Kargo</p>
                <p>
                  {shipping === 0
                    ? 'Ücretsiz'
                    : shipping.toLocaleString('tr-TR', {
                        style: 'currency',
                        currency: 'TRY'
                      })}
                </p>
              </div>
              <div className="flex justify-between text-base font-medium text-gray-900 mt-4">
                <p>Toplam</p>
                <p>
                  {total.toLocaleString('tr-TR', {
                    style: 'currency',
                    currency: 'TRY'
                  })}
                </p>
              </div>

              <div className="mt-6">
                <Link
                  href="/checkout"
                  className="flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-500"
                >
                  Ödemeye Geç
                </Link>
              </div>
              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                  veya{' '}
                  <Link href="/products" className="font-medium text-blue-600 hover:text-blue-500">
                    Alışverişe Devam Et
                  </Link>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 