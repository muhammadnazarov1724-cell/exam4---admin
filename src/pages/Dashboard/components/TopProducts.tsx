import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";

type Props = {
  emptyOnly?: boolean;
};

export default function TopProducts({ emptyOnly = false }: Props) {
  const dashboard = useSelector((state: RootState) => state.data.dashboard);

  if (!dashboard) return null;

  const filteredProducts = emptyOnly
    ? dashboard.products.filter((product) => product.quantity === 0)
    : dashboard.products;

  const products = filteredProducts.slice(0, 5);

  return (
    <section className="min-w-0 rounded-md border border-[#e6e9ef] p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-semibold">
          {emptyOnly ? "Нет в наличии" : "Каталог товаров"}
        </h2>

        <NavLink to="/products" className="text-xs text-blue-600">
          Все товары →
        </NavLink>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[400px] text-left text-sm">
          <thead className="border-b border-[#edf0f5] text-xs text-[#8590a5]">
            <tr>
              <th scope="col" className="pb-3 pr-4 font-normal">
                Товар
              </th>
              <th scope="col" className="pb-3 pr-4 text-right font-normal">
                Цена
              </th>
              <th scope="col" className="pb-3 text-right font-normal">
                Остаток
              </th>
            </tr>
          </thead>

          <tbody>
            {products.length === 0 && (
              <tr>
                <td colSpan={3} className="py-8 text-center text-slate-500">
                  {emptyOnly
                    ? "Товаров с нулевым остатком нет."
                    : "Каталог пока пуст."}
                </td>
              </tr>
            )}

            {products.map((product) => (
              <tr
                key={product.id}
                className="border-b border-[#edf0f5] last:border-0"
              >
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded bg-slate-100">
                      {product.image ? (
                        <img
                          src={`${import.meta.env.VITE_API}/images/${product.image}`}
                          alt={product.productName}
                          className="size-full object-contain"
                        />
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </div>

                    <span className="text-xs font-medium">
                      {product.productName}
                    </span>
                  </div>
                </td>

                <td className="py-3 pr-4 text-right text-xs tabular-nums">
                  ${product.price.toFixed(2)}
                </td>

                <td
                  className={`py-3 text-right text-xs tabular-nums ${
                    product.quantity === 0 ? "text-red-500" : "text-[#354052]"
                  }`}
                >
                  {product.quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {products.length > 0 && (
        <p className="mt-4 text-xs text-[#8590a5]">
          Показано {products.length} из {filteredProducts.length}
        </p>
      )}
    </section>
  );
}
