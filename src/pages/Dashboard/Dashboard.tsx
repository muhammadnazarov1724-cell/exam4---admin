import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../store/store'
import { getDashboard } from '../../store/Redux'
import SalesOverview from './components/SalesOverview'
import TopSellingProducts from './components/TopSellingProducts'
import RecentTransactions from './components/RecentTransactions'
import TopProducts from './components/TopProducts'
import Header from './components/Header'
import Aside from './components/aside'

export default function Dashboard() {
    const dispatch = useDispatch<AppDispatch>()

    const {
        dashboard,
        dashboardLoading,
        dashboardError,
    } = useSelector((state: RootState) => state.data)

    useEffect(() => {
        const request = dispatch(getDashboard())

        // Отменяем загрузку при уходе со страницы.
        return () => request.abort()
    }, [dispatch])

    return (
        <div className="min-h-screen">
            <Header />

            <div className="flex flex-col md:flex-row">
                <Aside />

                <main className="min-w-0 flex-1 bg-white p-5 text-[#1c2637] lg:p-8">
                    <div className="mx-auto max-w-[1440px]">
                        <h1 className="mb-6 text-2xl font-bold">
                            Dashboard
                        </h1>

                        {dashboardLoading && (
                            <p role="status" className="text-slate-500">
                                Загрузка данных каталога...
                            </p>
                        )}

                        {dashboardError && (
                            <div role="alert" className="text-red-600">
                                <p>{dashboardError}</p>

                                <button
                                    type="button"
                                    onClick={() => dispatch(getDashboard())}
                                    className="mt-3 text-sm underline"
                                >
                                    Повторить
                                </button>
                            </div>
                        )}

                        {!dashboardLoading && !dashboardError && dashboard && (
                            <>
                                <div className="grid gap-5 xl:grid-cols-[minmax(0,2.1fr)_minmax(300px,1fr)]">
                                    <SalesOverview />
                                    <TopSellingProducts />
                                </div>

                                <div className="mt-5 grid gap-5 lg:grid-cols-2">
                                    <RecentTransactions />
                                    <TopProducts />
                                </div>
                            </>
                        )}
                    </div>
                </main>
            </div>
        </div>
    )
}