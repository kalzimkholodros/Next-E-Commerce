'use client';

import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form gönderme işlemi burada yapılacak
    console.log('Form data:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            İletişim
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Bizimle iletişime geçin. En kısa sürede size dönüş yapacağız.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">İletişim Formu</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Adınız Soyadınız
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  E-posta Adresiniz
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                  Konu
                </label>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Mesajınız
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Gönder
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">İletişim Bilgileri</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Adres</h3>
                <p className="text-gray-600">
                  Örnek Mahallesi, Örnek Sokak No:123<br />
                  Kadıköy, İstanbul
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900">Telefon</h3>
                <p className="text-gray-600">+90 (555) 123 45 67</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900">E-posta</h3>
                <p className="text-gray-600">info@sirket.com</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900">Çalışma Saatleri</h3>
                <p className="text-gray-600">
                  Pazartesi - Cuma: 09:00 - 18:00<br />
                  Cumartesi - Pazar: Kapalı
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 