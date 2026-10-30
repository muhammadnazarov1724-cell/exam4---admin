import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { getCategories, getBrands, addCategory } from "../../store/Redux";
import Header from "../Dashboard/components/Header";
import Aside from "../Dashboard/components/aside";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const categorySchema = z.object({
  CategoryName: z.string().trim().min(1, "Введите название категории"),
});

type CategoryValues = z.infer<typeof categorySchema>;

export default function Others() {
  const dispatch = useDispatch<AppDispatch>();

  const [tab, setTab] = useState("categories");
  const [search, setSearch] = useState("");

  const {
    categories,
    categoriesLoading,
    categoriesError,
    brands,
    brandsLoading,
    brandsError,
  } = useSelector((state: RootState) => state.data);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getBrands());
  }, [dispatch]);

  // Поиск среди загруженных справочников.
  const text = search.trim().toLowerCase();

  const filteredCategories = categories.filter((category) =>
    category.categoryName.toLowerCase().includes(text),
  );

  const filteredBrands = brands.filter((brand) =>
    brand.brandName.toLowerCase().includes(text),
  );

  const loading = tab === "categories" ? categoriesLoading : brandsLoading;

  const error = tab === "categories" ? categoriesError : brandsError;

  const total =
    tab === "categories" ? filteredCategories.length : filteredBrands.length;

  const categoryDialog = useRef<HTMLDialogElement>(null);

  const [categoryImage, setCategoryImage] = useState<File | null>(null);
  const [categoryError, setCategoryError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CategoryValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      CategoryName: "",
    },
  });

  const openCategoryDialog = () => {
    reset();
    setCategoryImage(null);
    setCategoryError("");
    categoryDialog.current?.showModal();
  };

  const onCreateCategory = async (values: CategoryValues) => {
    setCategoryError("");

    if (!categoryImage || !categoryImage.type.startsWith("image/")) {
      setCategoryError("Выберите изображение категории");
      return;
    }

    const formData = new FormData();
    formData.append("CategoryName", values.CategoryName);
    formData.append("CategoryImage", categoryImage);

    const result = await dispatch(addCategory(formData));

    if (addCategory.fulfilled.match(result)) {
      categoryDialog.current?.close();

      // Очищаем поиск, чтобы новая категория не скрылась из-за фильтра.
      setSearch("");
      dispatch(getCategories());
    }

    if (addCategory.rejected.match(result)) {
      setCategoryError(result.payload ?? "Не удалось создать категорию");
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#1c2637]">
      <Header />

      <div className="flex flex-col md:flex-row">
        <Aside />

        <main className="min-w-0 flex-1 p-5 lg:p-8">
          {/* Переключение вкладок */}
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                setTab("categories");
                setSearch("");
              }}
              className={`rounded px-4 py-2 text-sm ${
                tab === "categories"
                  ? "bg-blue-100 font-medium text-blue-600"
                  : "hover:bg-slate-100"
              }`}
            >
              Categories
            </button>

            <button
              type="button"
              onClick={() => {
                setTab("brands");
                setSearch("");
              }}
              className={`rounded px-4 py-2 text-sm ${
                tab === "brands"
                  ? "bg-blue-100 font-medium text-blue-600"
                  : "hover:bg-slate-100"
              }`}
            >
              Brands
            </button>

            <button
              type="button"
              disabled
              className="rounded px-4 py-2 text-sm text-slate-400"
            >
              Banners
            </button>

            {tab === "categories" && (
              <button
                type="button"
                onClick={openCategoryDialog}
                className="ml-auto rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
              >
                + Add new
              </button>
            )}
          </div>

          {/* Поле поиска */}
          <input
            type="search"
            placeholder="Search..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="mt-8 h-12 w-full rounded border border-[#dce0e9] px-4 text-sm outline-none focus:border-blue-600 sm:max-w-[280px]"
          />

          {loading && (
            <p role="status" className="mt-6 text-slate-500">
              Загрузка...
            </p>
          )}

          {error && (
            <div role="alert" className="mt-6 text-red-600">
              <p>{error}</p>

              <button
                type="button"
                onClick={() => {
                  if (tab === "categories") {
                    dispatch(getCategories());
                  } else {
                    dispatch(getBrands());
                  }
                }}
                className="mt-2 text-sm underline"
              >
                Повторить загрузку
              </button>
            </div>
          )}

          {!loading && !error && (
            <>
              {/* Карточки категорий */}
              {tab === "categories" && (
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                  {filteredCategories.map((category) => (
                    <article
                      key={category.id}
                      className="flex min-h-36 flex-col justify-between rounded border border-[#dce0e9] p-5"
                    >
                      <div className="flex size-14 items-center justify-center">
                        {category.categoryImage ? (
                          <img
                            src={`${import.meta.env.VITE_API}/images/${category.categoryImage}`}
                            alt={category.categoryName}
                            className="size-full object-contain"
                          />
                        ) : (
                          <span className="text-2xl text-slate-400">—</span>
                        )}
                      </div>

                      <h2 className="mt-4 break-words text-sm font-medium">
                        {category.categoryName}
                      </h2>
                    </article>
                  ))}
                </div>
              )}

              {/* Таблица брендов */}
              {tab === "brands" && (
                <div className="mt-6 max-w-xl overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="border-b border-[#e6e9ef] text-[#7e84a3]">
                      <tr>
                        <th scope="col" className="py-3 font-normal">
                          Brands
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredBrands.map((brand) => (
                        <tr
                          key={brand.id}
                          className="border-b border-[#e6e9ef]"
                        >
                          <td className="py-4">{brand.brandName}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {total === 0 && (
                <p className="mt-6 text-sm text-slate-500">
                  Ничего не найдено.
                </p>
              )}

              <p className="mt-6 text-sm text-[#7e84a3]">{total} Results</p>
            </>
          )}
        </main>
      </div>
      <dialog
        ref={categoryDialog}
        aria-labelledby="category-dialog-title"
        onCancel={(event) => {
          if (isSubmitting) {
            event.preventDefault();
          }
        }}
        className="m-auto w-[90vw] max-w-[460px] rounded bg-white p-6 text-[#1c2637] shadow-xl backdrop:bg-black/40"
      >
        <div className="flex items-center justify-between gap-4">
          <h2 id="category-dialog-title" className="text-lg font-bold">
            Add category
          </h2>

          <button
            type="button"
            aria-label="Закрыть"
            disabled={isSubmitting}
            onClick={() => categoryDialog.current?.close()}
            className="text-2xl text-[#7e84a3] disabled:opacity-40"
          >
            ×
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onCreateCategory)}
          noValidate
          className="mt-5 space-y-4"
        >
          <div>
            <label htmlFor="category-name" className="sr-only">
              Название категории
            </label>

            <input
              {...register("CategoryName")}
              id="category-name"
              placeholder="Category name"
              className="h-12 w-full rounded border border-[#dce0e9] px-4 text-sm outline-none focus:border-blue-600"
            />

            {errors.CategoryName && (
              <p role="alert" className="mt-2 text-sm text-red-600">
                {errors.CategoryName.message}
              </p>
            )}
          </div>

          <label className="flex min-h-36 cursor-pointer flex-col items-center justify-center gap-3 rounded border border-dashed border-[#b9c8ee] p-5 text-center hover:bg-blue-50">
            <span aria-hidden="true" className="text-3xl text-[#7e84a3]">
              ↑
            </span>

            <span className="text-sm text-blue-600">Click to upload</span>

            <input
              type="file"
              accept="image/*"
              disabled={isSubmitting}
              className="sr-only"
              onChange={(event) => {
                setCategoryImage(event.target.files?.[0] ?? null);
                setCategoryError("");

                // Позволяем повторно выбрать тот же файл.
                event.target.value = "";
              }}
            />

            {categoryImage && (
              <span className="max-w-full break-all text-xs text-slate-500">
                {categoryImage.name}
              </span>
            )}
          </label>

          {categoryError && (
            <p role="alert" className="text-sm text-red-600">
              {categoryError}
            </p>
          )}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => categoryDialog.current?.close()}
              className="rounded border border-[#dce0e9] px-5 py-2 text-sm text-blue-600 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded bg-blue-600 px-5 py-2 text-sm text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting ? "Создание..." : "Create"}
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
}
