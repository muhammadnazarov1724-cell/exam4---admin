import Header from '../../components/Header'
import Aside from '../../components/aside'

// Временные данные из макета. Запросы и действия подключим отдельно.
const orders = [
  { order: '#12512B', date: 'May 5, 4:20 PM', customer: 'Tom Anderson', payment: 'Paid', status: 'Ready', total: '$49.90', selected: true },
  { order: '#12523C', date: 'May 5, 4:15 PM', customer: 'Jayden Walker', payment: 'Paid', status: 'Ready', total: '$34.36', selected: true },
  { order: '#51232A', date: 'May 5, 4:15 PM', customer: 'Inez Kim', payment: 'Paid', status: 'Ready', total: '$5.51', selected: true },
  { order: '#23534D', date: 'May 5, 4:12 PM', customer: 'Francisco Henry', payment: 'Paid', status: 'Shipped', total: '$29.74', selected: true },
  { order: '#51323C', date: 'May 5, 4:12 PM', customer: 'Violet Phillips', payment: 'Paid', status: 'Shipped', total: '$23.06', selected: false },
  { order: '#35622A', date: 'May 5, 4:12 PM', customer: 'Rosetta Becker', payment: 'Paid', status: 'Shipped', total: '$87.44', selected: false },
  { order: '#34232D', date: 'May 5, 4:10 PM', customer: 'Dean Love', payment: 'Paid', status: 'Ready', total: '$44.55', selected: false },
  { order: '#56212D', date: 'May 5, 4:08 PM', customer: 'Nettie Tyler', payment: 'Paid', status: 'Ready', total: '$36.79', selected: false },
  { order: '#23534D', date: 'May 5, 4:04 PM', customer: 'Miguel Harris', payment: 'Pending', status: 'Ready', total: '$50.54', selected: false },
  { order: '#12523C', date: 'May 5, 4:04 PM', customer: 'Angel Conner', payment: 'Pending', status: 'Ready', total: '$63.47', selected: false },
  { order: '#51232A', date: 'May 5, 4:03 PM', customer: 'Rosalie Singleton', payment: 'Pending', status: 'Received', total: '$91.63', selected: false },
]

const statusColors: Record<string, string> = {
  Ready: 'bg-[#ff9900]',
  Shipped: 'bg-[#5a607f]',
  Received: 'bg-[#3366ff]',
}

export default function Orders() {
  return (
    <div className="min-h-screen bg-white font-sans text-[#1c2637]">
      <Header />
      <div className="flex flex-col md:flex-row">
        <Aside />

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:p-8">
          <div className="mx-auto max-w-[1440px]">
            <div className="flex items-center justify-between gap-4">
              <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
              <button type="button" className="flex h-11 items-center gap-2 rounded bg-[#2563eb] px-4 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                Add order
              </button>
            </div>

            {/* Пока только оформление поиска, фильтра и кнопок действий. */}
            <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex w-full flex-wrap items-center gap-4 sm:w-auto">
                <label className="relative block w-full sm:w-[280px]">
                  <span className="sr-only">Поиск заказов</span>
                  <input type="search" placeholder="Search..." className="h-14 w-full rounded border border-[#dce0e9] bg-white py-3 pr-12 pl-4 text-sm outline-none placeholder:text-[#8b8b8b] focus:border-blue-600 focus:ring-2 focus:ring-blue-100" />
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#85858b" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true" className="pointer-events-none absolute top-4 right-4">
                    <circle cx="10.5" cy="10.5" r="6.5" />
                    <path d="m16 16 4 4" />
                  </svg>
                </label>

                <div className="relative w-[170px]">
                  <label htmlFor="orders-filter" className="absolute -top-2 left-3 z-10 bg-white px-1 text-xs text-[#8590a5]">Filter</label>
                  <select id="orders-filter" defaultValue="newest" className="h-14 w-full appearance-none rounded border border-[#dce0e9] bg-white py-3 pr-10 pl-4 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100">
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                  </select>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#85858b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="pointer-events-none absolute top-5 right-4">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button type="button" aria-label="Редактировать заказы" className="flex size-11 items-center justify-center rounded border border-[#e0e6f3] text-[#3366ff] hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-blue-600">
                  <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m14 5 5 5M4 20h16M5 15 16 4a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />
                  </svg>
                </button>
                <button type="button" aria-label="Удалить заказы" className="flex size-11 items-center justify-center rounded border border-[#e0e6f3] text-[#3366ff] hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-blue-600">
                  <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 6h16M9 6V3h6v3M6 6l1 15h10l1-15M10 10v7m4-7v7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* На небольшом экране таблица прокручивается по горизонтали. */}
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[850px] border-collapse text-left text-sm">
                <thead className="border-b border-[#dce2f0] text-[#7e84a3]">
                  <tr>
                    <th scope="col" className="w-11 px-2 py-4">
                      <input type="checkbox" aria-label="Выбрать все заказы" className="block size-5 cursor-pointer accent-[#3366ff]" />
                    </th>
                    <th scope="col" className="py-4 pr-5 font-normal">Order</th>
                    <th scope="col" className="py-4 pr-5 font-normal">Date</th>
                    <th scope="col" className="py-4 pr-5 font-normal">Customer</th>
                    <th scope="col" className="py-4 pr-5 font-normal">Payment status</th>
                    <th scope="col" className="py-4 pr-5 font-normal">Order Status</th>
                    <th scope="col" className="py-4 pr-5 font-normal">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((item) => (
                    <tr key={`${item.order}-${item.customer}`} className={`border-b border-[#e6eaf4] ${item.selected ? 'bg-[#f9f9fb]' : 'bg-white'}`}>
                      <td className="px-2 py-4">
                        <input type="checkbox" defaultChecked={item.selected} aria-label={`Выбрать заказ ${item.order}, ${item.customer}`} className="block size-5 cursor-pointer accent-[#3366ff]" />
                      </td>
                      <td className="whitespace-nowrap py-4 pr-5 font-medium">{item.order}</td>
                      <td className="whitespace-nowrap py-4 pr-5">{item.date}</td>
                      <td className="whitespace-nowrap py-4 pr-5">{item.customer}</td>
                      <td className="py-4 pr-5">
                        <span className={`inline-block rounded px-2 py-0.5 text-sm ${item.payment === 'Paid' ? 'bg-[#c4f8e5] text-[#26b78a]' : 'bg-[#e6e9f4] text-[#7e84a3]'}`}>{item.payment}</span>
                      </td>
                      <td className="py-4 pr-5">
                        <span className={`inline-block rounded px-2 py-0.5 text-sm text-white ${statusColors[item.status]}`}>{item.status}</span>
                      </td>
                      <td className="whitespace-nowrap py-4 pr-5 tabular-nums">{item.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Статичный вид пагинации из макета, без переключения данных. */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-sm text-[#7e84a3]">
              <nav aria-label="Страницы заказов" className="flex max-w-full flex-wrap items-center gap-1">
                <button type="button" aria-label="Предыдущая страница" className="flex size-9 items-center justify-center rounded hover:bg-[#f1f4fb] focus-visible:outline-2 focus-visible:outline-blue-600">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5m6-6-6 6 6 6" /></svg>
                </button>
                <button type="button" aria-label="Страница 1" className="size-9 rounded hover:bg-[#f1f4fb]">1</button>
                <button type="button" aria-label="Страница 2" aria-current="page" className="size-9 rounded bg-[#edf2ff] font-medium text-[#3366ff]">2</button>
                <button type="button" aria-label="Страница 3" className="size-9 rounded hover:bg-[#f1f4fb]">3</button>
                <button type="button" aria-label="Страница 4" className="size-9 rounded hover:bg-[#f1f4fb]">4</button>
                <button type="button" aria-label="Страница 5" className="size-9 rounded hover:bg-[#f1f4fb]">5</button>
                <button type="button" aria-label="Страница 6" className="size-9 rounded hover:bg-[#f1f4fb]">6</button>
                <span aria-hidden="true" className="flex size-9 items-center justify-center">...</span>
                <button type="button" aria-label="Страница 24" className="size-9 rounded hover:bg-[#f1f4fb]">24</button>
                <button type="button" aria-label="Следующая страница" className="flex size-9 items-center justify-center rounded hover:bg-[#f1f4fb] focus-visible:outline-2 focus-visible:outline-blue-600">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>
                </button>
              </nav>
              <p>274 Results</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
