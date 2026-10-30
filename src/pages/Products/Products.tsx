import Header from '../../components/Header'
import Aside from '../../components/aside'

// Демонстрационные товары для оформления страницы, без запросов к API.
const products = [
  { id: 'FC-001', name: 'Men Grey Hoodie', category: 'Men Clothing', price: '$49.90', stock: 56, color: '#485b60', background: '#dde8ea', striped: false },
  { id: 'FC-002', name: 'Women Striped T-Shirt', category: 'Women Clothing', price: '$34.90', stock: 23, color: '#9d9d96', background: '#ece7df', striped: true },
  { id: 'FC-003', name: 'Women White T-Shirt', category: 'Women Clothing', price: '$40.90', stock: 0, color: '#f4f0e8', background: '#dce7e9', striped: false },
  { id: 'FC-004', name: 'Men White T-Shirt', category: 'Men Clothing', price: '$49.90', stock: 46, color: '#e9e6df', background: '#e9e8e2', striped: false },
  { id: 'FC-005', name: 'Women Red T-Shirt', category: 'Women Clothing', price: '$34.90', stock: 12, color: '#dc4d56', background: '#ece4e4', striped: false },
  { id: 'FC-006', name: 'Men Black T-Shirt', category: 'Men Clothing', price: '$29.90', stock: 38, color: '#30343d', background: '#e3e6eb', striped: false },
  { id: 'FC-007', name: 'Women Green T-Shirt', category: 'Women Clothing', price: '$39.90', stock: 0, color: '#7f9d86', background: '#e4ede7', striped: false },
  { id: 'FC-008', name: 'Men Blue T-Shirt', category: 'Men Clothing', price: '$32.90', stock: 64, color: '#6686a8', background: '#e4eaf2', striped: false },
  { id: 'FC-009', name: 'Women Beige T-Shirt', category: 'Women Clothing', price: '$36.90', stock: 19, color: '#c5af94', background: '#eee9e1', striped: false },
  { id: 'FC-010', name: 'Men Striped T-Shirt', category: 'Men Clothing', price: '$44.90', stock: 27, color: '#7a8691', background: '#e5e8ed', striped: true },
]

export default function Products() {
  return (
    <div className="min-h-screen bg-white font-sans text-[#1c2637]">
      <Header />
      <div className="flex flex-col md:flex-row">
        <Aside />

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:p-8">
          <div className="mx-auto max-w-[1440px]">
            <div className="flex items-center justify-between gap-4">
              <h1 className="text-2xl font-bold tracking-tight">Products</h1>
              <button type="button" className="flex h-11 items-center gap-2 rounded bg-[#2563eb] px-4 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                Add product
              </button>
            </div>

            {/* Поиск, фильтр и кнопки пока представлены только визуально. */}
            <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex w-full flex-wrap items-center gap-4 sm:w-auto">
                <label className="relative block w-full sm:w-[280px]">
                  <span className="sr-only">Поиск товаров</span>
                  <input type="search" placeholder="Search..." className="h-14 w-full rounded border border-[#dce0e9] bg-white py-3 pr-12 pl-4 text-sm outline-none placeholder:text-[#8b8b8b] focus:border-blue-600 focus:ring-2 focus:ring-blue-100" />
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#85858b" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true" className="pointer-events-none absolute top-4 right-4">
                    <circle cx="10.5" cy="10.5" r="6.5" />
                    <path d="m16 16 4 4" />
                  </svg>
                </label>

                <div className="relative w-[190px]">
                  <label htmlFor="products-category" className="absolute -top-2 left-3 z-10 bg-white px-1 text-xs text-[#8590a5]">Category</label>
                  <select id="products-category" defaultValue="all" className="h-14 w-full appearance-none rounded border border-[#dce0e9] bg-white py-3 pr-10 pl-4 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100">
                    <option value="all">All categories</option>
                    <option value="men">Men Clothing</option>
                    <option value="women">Women Clothing</option>
                  </select>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#85858b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="pointer-events-none absolute top-5 right-4">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button type="button" aria-label="Редактировать выбранные товары" className="flex size-11 items-center justify-center rounded border border-[#e0e6f3] text-[#3366ff] hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-blue-600">
                  <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m14 5 5 5M4 20h16M5 15 16 4a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />
                  </svg>
                </button>
                <button type="button" aria-label="Удалить выбранные товары" className="flex size-11 items-center justify-center rounded border border-[#e0e6f3] text-[#3366ff] hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-blue-600">
                  <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 6h16M9 6V3h6v3M6 6l1 15h10l1-15M10 10v7m4-7v7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Таблица прокручивается внутри страницы на узких экранах. */}
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[820px] border-collapse text-left text-sm">
                <thead className="border-b border-[#dce2f0] text-[#7e84a3]">
                  <tr>
                    <th scope="col" className="w-11 px-2 py-4">
                      <input type="checkbox" aria-label="Выбрать все товары" className="block size-5 cursor-pointer accent-[#3366ff]" />
                    </th>
                    <th scope="col" className="py-4 pr-6 font-normal">Product</th>
                    <th scope="col" className="py-4 pr-6 font-normal">Inventory</th>
                    <th scope="col" className="py-4 pr-6 font-normal">Category</th>
                    <th scope="col" className="py-4 pr-6 font-normal">Price</th>
                    <th scope="col" className="py-4 pr-2 text-right font-normal">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((item) => (
                    <tr key={item.id} className="border-b border-[#e6eaf4] transition-colors hover:bg-[#fafbfe]">
                      <td className="px-2 py-3">
                        <input type="checkbox" aria-label={`Выбрать товар ${item.name}`} className="block size-5 cursor-pointer accent-[#3366ff]" />
                      </td>
                      <td className="py-3 pr-6">
                        <div className="flex items-center gap-3">
                          {/* SVG-заглушки в том же стиле, что и на Dashboard. */}
                          <svg viewBox="0 0 40 44" aria-hidden="true" className="h-14 w-13 shrink-0 rounded-md">
                            <rect width="40" height="44" rx="4" fill={item.background} />
                            <path d="m13 5-9 9 6 6 3-4v24h14V16l3 4 6-6-9-9-3 3h-8Z" fill={item.color} stroke="#1c2637" strokeOpacity="0.12" strokeLinejoin="round" />
                            <path d="M16 5c0 5 8 5 8 0" fill="none" stroke="#1c2637" strokeOpacity="0.2" />
                            {item.striped && <path d="M13 17h14M13 22h14M13 27h14M13 32h14M13 37h14" stroke="#f6f4ee" strokeWidth="2" />}
                          </svg>
                          <div>
                            <p className="whitespace-nowrap font-medium">{item.name}</p>
                            <p className="mt-1 text-xs text-[#8590a5]">SKU: {item.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap py-3 pr-6">
                        {item.stock > 0 ? (
                          <span className="text-[#26b78a]">{item.stock} in stock</span>
                        ) : (
                          <span className="rounded bg-[#fff0f1] px-2 py-1 text-xs text-[#e3546b]">Out of stock</span>
                        )}
                      </td>
                      <td className="whitespace-nowrap py-3 pr-6 text-[#5a607f]">{item.category}</td>
                      <td className="whitespace-nowrap py-3 pr-6 tabular-nums">{item.price}</td>
                      <td className="py-3 pr-1">
                        <div className="flex items-center justify-end gap-2">
                          <button type="button" aria-label={`Редактировать ${item.name}`} className="flex size-9 items-center justify-center rounded text-[#3366ff] hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-blue-600">
                            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <path d="m14 5 5 5M4 20h16M5 15 16 4a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />
                            </svg>
                          </button>
                          <button type="button" aria-label={`Удалить ${item.name}`} className="flex size-9 items-center justify-center rounded text-[#e3546b] hover:bg-rose-50 focus-visible:outline-2 focus-visible:outline-rose-500">
                            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <path d="M4 6h16M9 6V3h6v3M6 6l1 15h10l1-15M10 10v7m4-7v7" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Пагинация пока статична, как и остальные данные страницы. */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-sm text-[#7e84a3]">
              <nav aria-label="Страницы товаров" className="flex max-w-full flex-wrap items-center gap-1">
                <button type="button" aria-label="Предыдущая страница" className="flex size-9 items-center justify-center rounded hover:bg-[#f1f4fb] focus-visible:outline-2 focus-visible:outline-blue-600">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5m6-6-6 6 6 6" /></svg>
                </button>
                <button type="button" aria-label="Страница 1" aria-current="page" className="size-9 rounded bg-[#edf2ff] font-medium text-[#3366ff]">1</button>
                <button type="button" aria-label="Страница 2" className="size-9 rounded hover:bg-[#f1f4fb]">2</button>
                <button type="button" aria-label="Страница 3" className="size-9 rounded hover:bg-[#f1f4fb]">3</button>
                <button type="button" aria-label="Страница 4" className="size-9 rounded hover:bg-[#f1f4fb]">4</button>
                <button type="button" aria-label="Страница 5" className="size-9 rounded hover:bg-[#f1f4fb]">5</button>
                <span aria-hidden="true" className="flex size-9 items-center justify-center">...</span>
                <button type="button" aria-label="Страница 10" className="size-9 rounded hover:bg-[#f1f4fb]">10</button>
                <button type="button" aria-label="Следующая страница" className="flex size-9 items-center justify-center rounded hover:bg-[#f1f4fb] focus-visible:outline-2 focus-visible:outline-blue-600">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>
                </button>
              </nav>
              <p>100 Results</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
