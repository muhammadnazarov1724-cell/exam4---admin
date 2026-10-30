// Цветные миниатюры временно заменяют фотографии одежды.
const products = [
    { name: 'Men Grey Hoodie', price: '$49.90', units: 204, color: '#485b60', background: '#d8e5e8' },
    { name: 'Women Striped T-Shirt', price: '$34.90', units: 155, color: '#8b8c87', background: '#e4e1dc' },
    { name: 'Women White T-Shirt', price: '$40.90', units: 120, color: '#f4f0e8', background: '#dde7e8' },
    { name: 'Men White T-Shirt', price: '$49.90', units: 204, color: '#e9e6df', background: '#e9e8e2' },
    { name: 'Women Red T-Shirt', price: '$34.90', units: 155, color: '#dc4d56', background: '#e3e8e7' },
]

export default function TopProducts() {
    return (
        <section className="min-w-0 rounded-md border border-[#e6e9ef] bg-white p-5">
            <h2 className="text-base font-semibold text-[#1c2637]">Top Products by Units Sold</h2>

            <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[410px] text-left text-sm">
                    <thead className="border-b border-[#edf0f5] text-xs text-[#8590a5]">
                        <tr>
                            <th scope="col" className="pb-3 pr-4 font-normal">Name</th>
                            <th scope="col" className="pb-3 pr-4 text-right font-normal">Price</th>
                            <th scope="col" className="pb-3 text-right font-normal">Units</th>
                        </tr>
                    </thead>
                    <tbody className="text-[#354052]">
                        {products.map((item) => (
                            <tr key={item.name}>
                                <td className="py-2.5 pr-4">
                                    <div className="flex items-center gap-3">
                                        <svg viewBox="0 0 40 44" aria-hidden="true" className="h-11 w-10 shrink-0 rounded">
                                            <rect width="40" height="44" rx="4" fill={item.background} />
                                            <path d="m13 5-9 9 6 6 3-4v24h14V16l3 4 6-6-9-9-3 3h-8Z" fill={item.color} stroke="#1c2637" strokeOpacity="0.12" strokeLinejoin="round" />
                                            <path d="M16 5c0 5 8 5 8 0" fill="none" stroke="#1c2637" strokeOpacity="0.2" />
                                            <path d="M15 16v20m10-20v20" stroke="white" strokeOpacity="0.15" />
                                        </svg>
                                        <span className="text-xs font-medium">{item.name}</span>
                                    </div>
                                </td>
                                <td className="py-2.5 pr-4 text-right text-xs tabular-nums">{item.price}</td>
                                <td className="py-2.5 text-right text-xs tabular-nums">{item.units}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}
