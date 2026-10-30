import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";

export default function TopSellingProducts() {
  const dashboard = useSelector((state: RootState) => state.data.dashboard);

  if (!dashboard) return null;

  // Выбираем остаток от 1 до 10, затем сортируем по возрастанию.
  const lowStock = dashboard.products
    .filter((product) => product.quantity > 0 && product.quantity <= 10)
    .sort((first, second) => first.quantity - second.quantity);

  const products = lowStock.slice(0, 5);

  return (
    <section className="min-w-0 rounded-md border border-[#e6e9ef] p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-semibold">Небольшой остаток</h2>

        <NavLink to="/products" className="text-xs text-blue-600">
          Все товары →
        </NavLink>
      </div>

      <p className="mt-2 text-xs text-[#8590a5]">От 1 до 10 штук</p>

      {products.length === 0 ? (
        <p className="mt-6 text-sm text-slate-500">
          Товаров с небольшим остатком нет.
        </p>
      ) : (
        <>
          <ul className="mt-5 space-y-5">
            {products.map((product) => (
              <li key={product.id} className="flex items-center gap-3">
                <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded bg-slate-100">
                  {product.image ? (
                    <img
                      src={`${import.meta.env.VITE_API}/images/${product.image}`}
                      alt={product.productName}
                      className="size-full object-contain"
                    />
                  ) : (
                    <span className="text-xs text-slate-400">—</span>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">
                    {product.productName}
                  </p>
                  <p className="mt-1 truncate text-xs text-[#8590a5]">
                    {product.categoryName || "Без категории"}
                  </p>
                </div>

                <span className="shrink-0 text-sm font-semibold text-orange-500">
                  {product.quantity} шт.
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-5 text-xs text-[#8590a5]">
            Показано {products.length} из {lowStock.length}
          </p>
        </>
      )}
    </section>
  );
}
