import { NavLink } from 'react-router-dom'

// Повторяющиеся строки и количество продаж взяты из макета.
const products = [1, 2, 3, 4, 5]

export default function TopSellingProducts() {
    return (
        <section className="min-w-0 rounded-md border border-[#e6e9ef] bg-white p-5">
            <div className="flex items-center justify-between gap-3">
                <h2 className="text-base font-semibold text-[#1c2637]">Top selling products</h2>
                <NavLink to="#" aria-current="false" className="flex shrink-0 items-center gap-2 rounded text-xs font-semibold text-[#354052] hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600">
                    See All
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M4 12h16m-6-6 6 6-6 6" />
                    </svg>
                </NavLink>
            </div>

            <ul className="mt-5 space-y-5">
                {products.map((id) => (
                    <li key={id} className="flex items-center gap-3">
                        {/* SVG-заглушка вместо отсутствующей фотографии товара. */}
                        <svg viewBox="0 0 56 60" aria-hidden="true" className="h-15 w-14 shrink-0 rounded-md">
                            <rect width="56" height="60" rx="6" fill="#28434b" />
                            <path d="M0 43h56v17H0Z" fill="#d1d8d6" />
                            <ellipse cx="29" cy="53" rx="13" ry="3" fill="#aab5b1" />
                            <rect x="23" y="23" width="13" height="29" rx="3" fill="#eceee6" />
                            <rect x="26" y="17" width="7" height="8" rx="1" fill="#202c2c" />
                            <path d="M29 18v-5h7" stroke="#101c1c" strokeWidth="3" strokeLinecap="round" />
                            <rect x="25" y="32" width="9" height="13" rx="1" fill="#8a9f8e" />
                            <path d="m28 41 3-6m-3 2 3 2" stroke="#e6eade" strokeWidth="1" />
                        </svg>
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-[#263145]">Healthcare Erbology</p>
                            <p className="mt-1 text-xs text-[#8590a5]">in Accessories</p>
                        </div>
                        <div className="shrink-0 text-right text-xs">
                            <p className="font-medium text-[#20bd8b]">13,153</p>
                            <p className="mt-1 text-[#8590a5]">in sales</p>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    )
}
