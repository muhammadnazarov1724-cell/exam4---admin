import { useDispatch, useSelector } from "react-redux";
import Header from "../Dashboard/components/Header";
import Aside from "../Dashboard/components/aside";
import type { AppDispatch, RootState } from "../../store/store";
import { useEffect, useRef, useState } from "react";
import { deleteProduct, getProducts } from "../../store/Redux";
import { NavLink } from "react-router-dom";

export default function Products() {
  const dispatch = useDispatch<AppDispatch>();
  const [search, setSearch] = useState("");

  const deleteDialog = useRef<HTMLDialogElement>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const [query, setQuery] = useState({
    search: "",
    page: 1,
  });

  const { products, productsLoading, productsError, totalPages, totalRecords } =
    useSelector((state: RootState) => state.data);

  useEffect(() => {
    dispatch(getProducts(query));
  }, [dispatch, query]);

  const changePage = (number: number) => {
    setQuery({
      search: query.search,
      page: number,
    });
  };

  const openDeleteDialog = (id: number) => {
    setDeleteId(id);
    setDeleteError("");
    deleteDialog.current?.showModal();
  };

  const closeDeleteDialog = () => {
    deleteDialog.current?.close();
    setDeleteId(null);
    setDeleteError("");
  };

  const handleDelete = async () => {
    if (deleteId === null || isDeleting) return;

    setIsDeleting(true);
    setDeleteError("");

    const result = await dispatch(deleteProduct(deleteId));

    setIsDeleting(false);

    if (deleteProduct.fulfilled.match(result)) {
      closeDeleteDialog();

      const nextPage =
        products.length === 1 && query.page > 1 ? query.page - 1 : query.page;

      setQuery({
        search: query.search,
        page: nextPage,
      });
    }

    if (deleteProduct.rejected.match(result)) {
      setDeleteError(result.payload ?? "Не удалось удалить товар");
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[#1c2637]">
      <Header />
      <div className="flex flex-col md:flex-row">
        <Aside />

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:p-8">
          <div className="mx-auto max-w-[1440px]">
            <div className="flex items-center justify-between gap-4">
              <h1 className="text-2xl font-bold tracking-tight">Products</h1>
              <NavLink
                to="/products/add"
                className="flex h-11 items-center gap-2 rounded bg-[#2563eb] px-4 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
                Add product
              </NavLink>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex w-full flex-wrap items-center gap-4 sm:w-auto">
                <form
                  className="relative w-full sm:w-[280px]"
                  onSubmit={(event) => {
                    event.preventDefault();

                    if (!productsLoading) {
                      setQuery({
                        search: search.trim(),
                        page: 1,
                      });
                    }
                  }}
                >
                  <label htmlFor="product-search" className="sr-only">
                    Поиск товаров
                  </label>

                  <input
                    id="product-search"
                    type="search"
                    placeholder="Search..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    className="h-14 w-full rounded border border-[#dce0e9] bg-white py-3 pr-12 pl-4 text-sm outline-none placeholder:text-[#8b8b8b] focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />

                  <button
                    type="submit"
                    aria-label="Найти товары"
                    disabled={productsLoading}
                    className="absolute top-0 right-0 flex h-14 w-12 items-center justify-center rounded text-[#85858b] hover:text-blue-600 disabled:opacity-40"
                  >
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      aria-hidden="true"
                    >
                      <circle cx="10.5" cy="10.5" r="6.5" />
                      <path d="m16 16 4 4" />
                    </svg>
                  </button>
                </form>

                <div className="relative w-[190px]">
                  <label
                    htmlFor="products-category"
                    className="absolute -top-2 left-3 z-10 bg-white px-1 text-xs text-[#8590a5]"
                  >
                    Category
                  </label>
                  <select
                    id="products-category"
                    defaultValue="all"
                    className="h-14 w-full appearance-none rounded border border-[#dce0e9] bg-white py-3 pr-10 pl-4 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="all">All categories</option>
                    <option value="men">Men Clothing</option>
                    <option value="women">Women Clothing</option>
                  </select>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#85858b"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="pointer-events-none absolute top-5 right-4"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="flex size-11 items-center justify-center rounded border border-[#e0e6f3] text-[#3366ff] hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  <svg
                    width="21"
                    height="21"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m14 5 5 5M4 20h16M5 15 16 4a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="flex size-11 items-center justify-center rounded border border-[#e0e6f3] text-[#3366ff] hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-blue-600"
                >
                  <svg
                    width="21"
                    height="21"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M4 6h16M9 6V3h6v3M6 6l1 15h10l1-15M10 10v7m4-7v7" />
                  </svg>
                </button>
              </div>
            </div>

            {productsLoading && (
              <p role="status" className="mt-6 text-slate-500">
                Загрузка товаров...
              </p>
            )}

            {productsError && (
              <p role="alert" className="mt-6 text-red-600">
                {productsError}
              </p>
            )}

            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[820px] border-collapse text-left text-sm">
                <thead className="border-b border-[#dce2f0] text-[#7e84a3]">
                  <tr>
                    <th scope="col" className="w-11 px-2 py-4">
                      <input
                        type="checkbox"
                        aria-label="Выбрать все товары"
                        className="block size-5 cursor-pointer accent-[#3366ff]"
                      />
                    </th>
                    <th scope="col" className="py-4 pr-6 font-normal">
                      Product
                    </th>
                    <th scope="col" className="py-4 pr-6 font-normal">
                      Inventory
                    </th>
                    <th scope="col" className="py-4 pr-6 font-normal">
                      Category
                    </th>
                    <th scope="col" className="py-4 pr-6 font-normal">
                      Price
                    </th>
                    <th
                      scope="col"
                      className="py-4 pr-2 text-right font-normal"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-[#e6eaf4] transition-colors hover:bg-[#fafbfe]"
                    >
                      <td className="px-2 py-3">
                        <input
                          type="checkbox"
                          aria-label={`Выбрать товар ${item.productName}`}
                          className="block size-5 cursor-pointer accent-[#3366ff]"
                        />
                      </td>
                      <td className="py-3 pr-6">
                        <div className="flex items-center gap-3">
                          {item.image && (
                            <img
                              src={`${import.meta.env.VITE_API}/images/${item.image}`}
                              className="h-14 w-13 shrink-0 rounded-md bg-slate-100 object-contain"
                            />
                          )}
                          <div>
                            <p className="whitespace-nowrap font-medium">
                              {item.productName}
                            </p>
                            <p className="mt-1 text-xs text-[#8590a5]">
                              ID: {item.id}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap py-3 pr-6">
                        {item.quantity > 0 ? (
                          <span className="text-[#26b78a]">
                            {item.quantity} in stock
                          </span>
                        ) : (
                          <span className="rounded bg-[#fff0f1] px-2 py-1 text-xs text-[#e3546b]">
                            Out of stock
                          </span>
                        )}
                      </td>
                      <td className="whitespace-nowrap py-3 pr-6 text-[#5a607f]">
                        {item.categoryName}
                      </td>
                      <td className="whitespace-nowrap py-3 pr-6 tabular-nums">
                        {item.price}
                      </td>
                      <td className="py-3 pr-1">
                        <div className="flex items-center justify-end gap-2">
                          <NavLink
                            to={`/products/${item.id}/edit`}
                            aria-label={`Редактировать ${item.productName}`}
                            className="flex size-9 items-center justify-center rounded text-[#3366ff] hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                          >
                            <svg
                              width="19"
                              height="19"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <path d="m14 5 5 5M4 20h16M5 15 16 4a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />
                            </svg>
                          </NavLink>6
                          <button
                            type="button"
                            onClick={() => openDeleteDialog(item.id)}
                            className="flex size-9 items-center justify-center rounded text-[#e3546b] hover:bg-rose-50 focus-visible:outline-2 focus-visible:outline-rose-500"
                          >
                            <svg
                              width="19"
                              height="19"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <path d="M4 6h16M9 6V3h6v3M6 6l1 15h10l1-15M10 10v7m4-7v7" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-sm text-[#7e84a3]">
              <nav className="flex max-w-full flex-wrap items-center gap-1">
                <button
                  type="button"
                  disabled={query.page <= 1 || productsLoading}
                  onClick={() => changePage(query.page - 1)}
                  className="size-9 rounded hover:bg-[#f1f4fb] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  ←
                </button>

                {Array.from({ length: totalPages }, (_, index) => {
                  const number = index + 1;

                  return (
                    <button
                      key={number}
                      type="button"
                      disabled={productsLoading}
                      onClick={() => changePage(number)}
                      className={`size-9 rounded disabled:opacity-50 ${
                        query.page === number
                          ? "bg-[#edf2ff] font-medium text-[#3366ff]"
                          : "hover:bg-[#f1f4fb]"
                      }`}
                    >
                      {number}
                    </button>
                  );
                })}

                <button
                  type="button"
                  aria-label="Следующая страница"
                  disabled={query.page >= totalPages || productsLoading}
                  onClick={() => changePage(query.page + 1)}
                  className="size-9 rounded hover:bg-[#f1f4fb] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  →
                </button>
              </nav>
              <p>{totalRecords} Results</p>
            </div>
          </div>
        </main>
      </div>
      <dialog
        ref={deleteDialog}
        onCancel={(event) => {
          event.preventDefault();

          if (!isDeleting) {
            closeDeleteDialog();
          }
        }}
        className="m-auto w-[90vw] max-w-[480px] rounded bg-white p-6 text-[#1c2637] shadow-xl backdrop:bg-black/40"
      >
        <div className="flex items-center justify-between gap-4">
          <h2 id="delete-title" className="text-xl font-bold">
            Delete product
          </h2>

          <button
            type="button"
            aria-label="Закрыть диалог"
            disabled={isDeleting}
            onClick={closeDeleteDialog}
            className="text-2xl text-[#7e84a3] disabled:opacity-40"
          >
            ×
          </button>
        </div>

        <p id="delete-description" className="mt-4 text-sm">
          Are you sure you want to delete this product?
        </p>

        {deleteError && (
          <p role="alert" className="mt-4 text-sm text-red-600">
            {deleteError}
          </p>
        )}

        <div className="mt-7 flex justify-end gap-3">
          <button
            type="button"
            autoFocus
            disabled={isDeleting}
            onClick={closeDeleteDialog}
            className="rounded bg-blue-600 px-6 py-2.5 text-sm text-white hover:bg-blue-700 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={isDeleting}
            onClick={handleDelete}
            className="rounded border border-red-500 px-6 py-2.5 text-sm text-red-500 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isDeleting ? "Удаление..." : "Delete"}
          </button>
        </div>
      </dialog>
    </div>
  );
}
