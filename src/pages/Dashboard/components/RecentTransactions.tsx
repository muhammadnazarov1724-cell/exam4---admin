// Демонстрационные строки таблицы из макета.
const transactions = [
    { name: 'Jagarnath S.', date: '24.05.2023', amount: '$124.97', status: 'Paid' },
    { name: 'Anand G.', date: '23.05.2023', amount: '$55.42', status: 'Pending' },
    { name: 'Kartik S.', date: '23.05.2023', amount: '$89.90', status: 'Paid' },
    { name: 'Rakesh S.', date: '22.05.2023', amount: '$144.94', status: 'Pending' },
    { name: 'Anup S.', date: '22.05.2023', amount: '$70.52', status: 'Paid' },
    { name: 'Jimmy P.', date: '22.05.2023', amount: '$70.52', status: 'Paid' },
]

export default function RecentTransactions() {
    return (
        <section className="min-w-0 rounded-md border border-[#e6e9ef] bg-white p-5">
            <h2 className="text-base font-semibold text-[#1c2637]">Recent Transactions</h2>

            {/* На узком экране таблица прокручивается внутри блока. */}
            <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[410px] text-left text-sm">
                    <thead className="border-b border-[#edf0f5] text-xs font-normal text-[#8590a5]">
                        <tr>
                            <th scope="col" className="pb-3 pr-4 font-normal">Name</th>
                            <th scope="col" className="pb-3 pr-4 font-normal">Date</th>
                            <th scope="col" className="pb-3 pr-4 text-right font-normal">Amount</th>
                            <th scope="col" className="pb-3 text-right font-normal">Status</th>
                        </tr>
                    </thead>
                    <tbody className="text-[#354052]">
                        {transactions.map((item) => (
                            <tr key={item.name}>
                                <td className="py-3.5 pr-4 font-medium">{item.name}</td>
                                <td className="whitespace-nowrap py-3.5 pr-4 text-xs">{item.date}</td>
                                <td className="py-3.5 pr-4 text-right text-xs tabular-nums">{item.amount}</td>
                                <td className="py-3.5 text-right">
                                    <span className={`inline-block min-w-17 rounded px-2 py-1 text-center text-xs ${item.status === 'Paid' ? 'bg-[#c4f8e5] text-[#23b487]' : 'bg-[#e7eaf5] text-[#7e84a3]'}`}>
                                        {item.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}
