import Link from 'next/link';

async function getCategories() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`, {
    cache: 'no-store'
  });
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
}

async function getProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
    cache: 'no-store'
  });
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export default async function Home() {
  const categories = await getCategories();
  const products = await getProducts();

  // En yeni 8 ürünü al
  const latestProducts = products.slice(0, 8);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative">
        <div className="mx-auto max-w-7xl">
          <div className="relative z-10 pt-14 lg:w-full lg:max-w-2xl">
            <div className="relative px-6 py-32 sm:py-40 lg:px-8 lg:py-56 lg:pr-0">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  En Yeni Teknoloji Ürünleri
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  En son teknoloji ürünlerini keşfedin. Akıllı telefonlar, laptoplar, aksesuarlar ve daha fazlası.
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  <Link
                    href="/products"
                    className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    Alışverişe Başla
                  </Link>
                  <Link href="/categories" className="text-sm font-semibold leading-6 text-gray-900">
                    Tüm Kategoriler <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            src="https://picsum.photos/800/600?random=1"
            alt="Hero"
            className="aspect-[3/2] object-cover lg:aspect-auto lg:h-full lg:w-full"
          />
        </div>
      </div>

      {/* Categories Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="sm:flex sm:items-center sm:justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Kategoriler</h2>
          <Link href="/categories" className="hidden text-sm font-semibold text-blue-600 hover:text-blue-500 sm:block">
            Tüm Kategorileri Gör<span aria-hidden="true"> →</span>
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4">
          {categories.map((category: any) => (
            <Link key={category._id} href={`/categories/${category._id}`} className="group relative">
              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={category.image}
                  alt={category.name}
                  className="object-cover object-center group-hover:opacity-75"
                />
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{category.itemCount} Ürün</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 sm:hidden">
          <Link href="/categories" className="block text-sm font-semibold text-blue-600 hover:text-blue-500">
            Tüm Kategorileri Gör<span aria-hidden="true"> →</span>
          </Link>
        </div>
      </div>

      {/* Latest Products Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 bg-gray-50">
        <div className="sm:flex sm:items-center sm:justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">En Yeni Ürünler</h2>
          <Link href="/products" className="hidden text-sm font-semibold text-blue-600 hover:text-blue-500 sm:block">
            Tüm Ürünleri Gör<span aria-hidden="true"> →</span>
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {latestProducts.map((product: any) => (
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
            </div>
          ))}
        </div>

        <div className="mt-6 sm:hidden">
          <Link href="/products" className="block text-sm font-semibold text-blue-600 hover:text-blue-500">
            Tüm Ürünleri Gör<span aria-hidden="true"> →</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
