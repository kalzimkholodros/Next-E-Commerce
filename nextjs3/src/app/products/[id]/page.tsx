import Link from 'next/link';

async function getProduct(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`, {
    cache: 'no-store'
  });
  if (!res.ok) throw new Error('Failed to fetch product');
  return res.json();
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
        {/* Product Image */}
        <div className="lg:max-w-lg lg:self-end">
          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
            <img
              src={product.images[0]}
              alt={product.name}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="lg:col-start-2">
          <div className="mt-4 lg:mt-0">
            <div className="flex justify-between">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.name}</h1>
              <p className="text-3xl tracking-tight text-gray-900">
                {product.price.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
              </p>
            </div>
            
            {product.comparePrice && (
              <p className="mt-1 text-lg text-gray-500 line-through">
                {product.comparePrice.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
              </p>
            )}

            <Link
              href={`/categories/${product.category._id}`}
              className="mt-4 inline-block text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              {product.category.name}
            </Link>

            {/* Description */}
            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Açıklama</h2>
              <div className="mt-4 prose prose-sm text-gray-500">
                <p>{product.description}</p>
              </div>
            </div>

            {/* Specifications */}
            {product.specifications && product.specifications.length > 0 && (
              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Özellikler</h2>
                <div className="mt-4">
                  <ul className="list-none space-y-2">
                    {product.specifications.map((spec: any) => (
                      <li key={spec.name} className="text-sm text-gray-500">
                        <span className="font-medium text-gray-900">{spec.name}:</span> {spec.value}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Stock Info & Add to Cart */}
            <div className="mt-10">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-medium text-gray-900">Stok Durumu</h2>
                <p className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {product.stock > 0 ? 'Stokta' : 'Stokta Yok'}
                </p>
              </div>
              
              {product.stock > 0 && (
                <div className="mt-4">
                  <button className="w-full bg-blue-600 text-white px-8 py-3 rounded-md text-base font-medium hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    Sepete Ekle
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 