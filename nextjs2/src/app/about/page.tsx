'use client';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Hakkımızda
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Yenilikçi çözümler ve müşteri memnuniyeti odaklı yaklaşımımızla sektörde öncü olmaya devam ediyoruz.
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Vision */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Vizyonumuz</h2>
            <p className="text-gray-600">
              Teknoloji dünyasında öncü, yenilikçi ve güvenilir bir marka olarak, müşterilerimize en iyi hizmeti sunmayı hedefliyoruz. Sürekli gelişen ve değişen dünyada, en son teknolojileri kullanarak müşterilerimizin ihtiyaçlarına çözüm üretiyoruz.
            </p>
          </div>

          {/* Mission */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Misyonumuz</h2>
            <p className="text-gray-600">
              Müşterilerimize en kaliteli ürün ve hizmetleri sunarak, onların dijital dönüşüm yolculuklarında güvenilir bir partner olmak. Sürdürülebilir büyüme ve müşteri memnuniyeti odaklı yaklaşımımızla sektörde fark yaratmak.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Ekibimiz
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-900">Ahmet Yılmaz</h3>
              <p className="text-gray-600">CEO</p>
            </div>

            {/* Team Member 2 */}
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-900">Ayşe Demir</h3>
              <p className="text-gray-600">CTO</p>
            </div>

            {/* Team Member 3 */}
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-900">Mehmet Kaya</h3>
              <p className="text-gray-600">Tasarım Direktörü</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 