import SalesOverview from './components/SalesOverview'
import TopSellingProducts from './components/TopSellingProducts'
import RecentTransactions from './components/RecentTransactions'
import TopProducts from './components/TopProducts'
import Aside from '../../components/aside'
import Header from '../../components/Header'

export default function Dashboard() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="flex flex-col md:flex-row">
      <Aside />
    <main className="min-w-0 flex-1 bg-white px-4 py-6 font-sans text-[#1c2637] sm:px-6 lg:p-8">
      <div className="mx-auto max-w-[1440px]">
        <h1 className="mb-6 text-2xl font-bold tracking-tight">Dashboard</h1>

        {/* Верхний ряд: показатели с графиком и список товаров. */}
        <div className="grid items-stretch gap-5 xl:grid-cols-[minmax(0,2.1fr)_minmax(300px,1fr)]">
          <SalesOverview />
          <TopSellingProducts />
        </div>

        {/* Нижний ряд: две таблицы. */}
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <RecentTransactions />
          <TopProducts />
        </div>
      </div>
    </main>
      </div>
    </div>
  )
}
