import TopProducts from './TopProducts'

export default function RecentTransactions() {
    // Используем ту же таблицу, но только для нулевого остатка.
    return <TopProducts emptyOnly />
}