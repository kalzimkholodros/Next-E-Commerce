'use client';

import { useState } from 'react';
import Link from 'next/link';

// Bu örnek için statik veri kullanıyoruz. Gerçek uygulamada bu veriler API'den gelecek
const user = {
  name: 'Ahmet Yılmaz',
  email: 'ahmet@example.com',
  phone: '+90 (555) 123 45 67',
  address: {
    street: 'Atatürk Caddesi No: 123',
    city: 'İstanbul',
    state: 'Kadıköy',
    zipCode: '34700',
    country: 'Türkiye'
  }
};

const orders = [
  {
    id: 1,
    date: '2024-03-01',
    total: 2299.98,
    status: 'Teslim Edildi',
    items: [
      {
        id: 1,
        name: 'Kablosuz Kulaklık',
        price: 999.99,
        quantity: 1
      },
      {
        id: 2,
        name: 'Akıllı Saat',
        price: 1299.99,
        quantity: 1
      }
    ]
  },
  {
    id: 2,
    date: '2024-02-15',
    total: 799.99,
    status: 'Kargoda',
    items: [
      {
        id: 3,
        name: 'Spor Ayakkabı',
        price: 799.99,
        quantity: 1
      }
    ]
  }
];

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full text-left px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'profile'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-900 hover:bg-gray-50'
                }`}
              >
                Profil Bilgileri
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full text-left px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'orders'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-900 hover:bg-gray-50'
                }`}
              >
                Siparişlerim
              </button>
              <button
                onClick={() => setActiveTab('addresses')}
                className={`w-full text-left px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'addresses'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-900 hover:bg-gray-50'
                }`}
              >
                Adres Bilgileri
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="mt-10 lg:col-span-9 lg:mt-0">
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Profil Bilgileri</h2>
                <div className="mt-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Ad Soyad</label>
                    <p className="mt-1 text-sm text-gray-900">{user.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">E-posta</label>
                    <p className="mt-1 text-sm text-gray-900">{user.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Telefon</label>
                    <p className="mt-1 text-sm text-gray-900">{user.phone}</p>
                  </div>
                  <button className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500">
                    Bilgileri Güncelle
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Siparişlerim</h2>
                <div className="mt-6 space-y-8">
                  {orders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">Sipariş No: #{order.id}</p>
                          <p className="text-sm text-gray-500">Tarih: {order.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">
                            {order.total.toLocaleString('tr-TR', {
                              style: 'currency',
                              currency: 'TRY'
                            })}
                          </p>
                          <p className="text-sm text-gray-500">{order.status}</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-900">Ürünler</h4>
                        <ul className="mt-2 divide-y divide-gray-200">
                          {order.items.map((item) => (
                            <li key={item.id} className="py-2">
                              <div className="flex justify-between">
                                <div>
                                  <p className="text-sm text-gray-900">{item.name}</p>
                                  <p className="text-sm text-gray-500">Adet: {item.quantity}</p>
                                </div>
                                <p className="text-sm font-medium text-gray-900">
                                  {item.price.toLocaleString('tr-TR', {
                                    style: 'currency',
                                    currency: 'TRY'
                                  })}
                                </p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'addresses' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Adres Bilgileri</h2>
                <div className="mt-6">
                  <div className="border rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900">Teslimat Adresi</h3>
                    <div className="mt-4 space-y-2">
                      <p className="text-sm text-gray-500">{user.address.street}</p>
                      <p className="text-sm text-gray-500">
                        {user.address.state}, {user.address.city} {user.address.zipCode}
                      </p>
                      <p className="text-sm text-gray-500">{user.address.country}</p>
                    </div>
                    <button className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500">
                      Adresi Düzenle
                    </button>
                  </div>
                  <button className="mt-4 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Yeni Adres Ekle
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 