// Временные показатели из макета. Позже заменим ответом сервера.
const statistics = [
    { title: 'Sales', value: '$152k', color: 'bg-[#fff3f2]', icon: 'bg-[#ff9c8e]', path: 'M6 18v-5m6 5V6m6 12V9' },
    { title: 'Cost', value: '$99.7k', color: 'bg-[#fff9e9]', icon: 'bg-[#ffc18e]', path: 'M7 7V6a5 5 0 0 1 10 0v1M5 7h14l1 14H4L5 7Z' },
    { title: 'Profit', value: '$32.1k', color: 'bg-[#edfdf7]', icon: 'bg-[#83df88]', path: 'm6 12 4 4 8-9' },
]

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export default function SalesOverview() {
    return (
        <section aria-label="Sales overview" className="min-w-0 space-y-5">
            <div className="grid gap-3 sm:grid-cols-3">
                {statistics.map((item) => (
                    <div key={item.title} className={`flex items-center gap-4 rounded-md px-5 py-5 ${item.color}`}>
                        <span className={`flex size-11 shrink-0 -rotate-12 items-center justify-center rounded-xl text-white ${item.icon}`}>
                            <svg width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d={item.path} />
                            </svg>
                        </span>
                        <div>
                            <p className="text-sm text-[#8590a5]">{item.title}</p>
                            <p className="mt-1 text-2xl font-bold tracking-tight text-[#1c2637]">{item.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="rounded-md border border-[#e6e9ef] bg-white p-5">
                <h2 className="text-base font-semibold text-[#1c2637]">Sales Revenue</h2>

                {/* Статичный SVG-график: без библиотеки и загрузки данных. */}
                <svg viewBox="0 0 660 290" role="img" aria-label="Пример графика продаж по месяцам с января по декабрь" className="mt-4 block w-full">
                    {[0, 10, 20, 30, 40, 50].map((value) => (
                        <g key={value}>
                            <line x1="42" y1={242 - value * 4} x2="642" y2={242 - value * 4} stroke="#e9edf5" strokeDasharray="2 5" />
                            <text x="27" y={246 - value * 4} textAnchor="end" fill="#a4aec7" fontSize="11">{value}</text>
                        </g>
                    ))}
                    <polyline points="48,202 102,222 156,182 210,142 264,102 318,122 372,102 426,42 480,62 534,142 588,142 642,102" fill="none" stroke="#3366ff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="264" cy="102" r="6" fill="white" stroke="#3366ff" strokeWidth="3.5" />

                    {/* Подсказка показана постоянно, как на макете. */}
                    <rect x="207" y="27" width="114" height="54" rx="4" fill="#373951" />
                    <path d="m258 81 6 7 6-7" fill="#373951" />
                    <text x="264" y="49" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">864 Orders</text>
                    <text x="264" y="68" textAnchor="middle" fill="#d6d8e6" fontSize="11">May</text>

                    {months.map((month, index) => (
                        <text key={month} x={48 + index * 54} y="272" textAnchor="middle" fill="#a4aec7" fontSize="11">{month}</text>
                    ))}
                </svg>
            </div>
        </section>
    )
}
