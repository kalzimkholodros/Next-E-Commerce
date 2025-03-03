import Link from 'next/link';

async function getCategoryWithProducts(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories/${id}`, {
    cache: 'no-store'
  });
  if (!res.ok) throw new Error('Failed to fetch category');
  return res.json();
}

export default async function CategoryPage({ params }: { params: { id: string } }) {
  const { category, products } = await getCategoryWithProducts(params.id);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">{category.name}</h2>
          <p className="mt-4 text-lg text-gray-500">{category.description}</p>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product: any) => (
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
                <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  Sepete Ekle
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 