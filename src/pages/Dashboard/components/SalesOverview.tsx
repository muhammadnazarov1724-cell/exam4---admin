import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";

export default function SalesOverview() {
  const dashboard = useSelector((state: RootState) => state.data.dashboard);

  if (!dashboard) return null;

  const statistics = [
    {
      title: "Товары",
      value: dashboard.totalProducts,
      background: "bg-[#fff3f2]",
      icon: "bg-[#ff9c8e]",
    },
    {
      title: "Категории",
      value: dashboard.totalCategories,
      background: "bg-[#fff9e9]",
      icon: "bg-[#ffc18e]",
    },
    {
      title: "Бренды",
      value: dashboard.totalBrands,
      background: "bg-[#edfdf7]",
      icon: "bg-[#83df88]",
    },
  ];

  // Самая большая категория занимает всю ширину полосы.
  const maximum = Math.max(
    1,
    ...dashboard.categoryStats.map((category) => category.count),
  );

  return (
    <section className="min-w-0 space-y-5">
      <div className="grid gap-3 sm:grid-cols-3">
        {statistics.map((item) => (
          <div
            key={item.title}
            className={`flex items-center gap-4 rounded-md p-5 ${item.background}`}
          >
            <span
              className={`flex size-11 shrink-0 -rotate-12 items-center justify-center rounded-xl text-white ${item.icon}`}
            >
              <svg
                width="25"
                height="25"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M6 18v-5m6 5V6m6 12V9" />
              </svg>
            </span>

            <div>
              <p className="text-sm text-[#8590a5]">{item.title}</p>
              <p className="mt-1 text-2xl font-bold">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-md border border-[#e6e9ef] p-5">
        <h2 className="font-semibold">Товары по категориям</h2>

        {dashboard.categoryStats.length === 0 ? (
          <p className="mt-5 text-sm text-slate-500">Категорий пока нет.</p>
        ) : (
          <ul className="mt-5 max-h-80 space-y-4 overflow-y-auto pr-2">
            {dashboard.categoryStats.map((category) => (
              <li key={category.id}>
                <div className="mb-2 flex justify-between gap-3 text-sm">
                  <span>{category.name}</span>
                  <span className="font-medium">{category.count}</span>
                </div>

                <div className="h-3 overflow-hidden rounded bg-[#edf2ff]">
                  <div
                    className="h-full rounded bg-[#3366ff]"
                    style={{
                      width: `${(category.count / maximum) * 100}%`,
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
