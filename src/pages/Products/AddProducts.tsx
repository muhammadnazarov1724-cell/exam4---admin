import { NavLink, useNavigate, useParams } from "react-router-dom";
import Header from "../Dashboard/components/Header";
import Aside from "../Dashboard/components/aside";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { useEffect, useState } from "react";
import {
  addProduct,
  getBrands,
  getCategories,
  getColors,
  getProductById,
  updateProduct,
} from "../../store/Redux";
import { useForm } from "react-hook-form";
import {
  addProductSchema,
  type AddProductValues,
} from "../../utils/productSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function AddProduct() {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [formLoading, setFormLoading] = useState(true);
  const [loadedProductId, setLoadedProductId] = useState("");

  const [existingImages, setExistingImages] = useState<
    { id: number; images: string }[]
  >([]);

  const [brandId, setBrandId] = useState("");
  const [submitError, setSubmitError] = useState("");

  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [colorId, setColorId] = useState("");

  const [images, setImages] = useState<File[]>([]);

  const [imagesError, setImagesError] = useState("");

  const {
    brands,
    brandsLoading,
    brandsError,
    categories,
    categoriesError,
    categoriesLoading,
    colors,
    colorsLoading,
    colorsError,
  } = useSelector((state: RootState) => state.data);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddProductValues>({
    resolver: zodResolver(addProductSchema),

    defaultValues: {
      ProductName: "",
      Code: "",
      Description: "",
      Price: 0,
      Quantity: 0,
      HasDiscount: false,
      DiscountPrice: 0,
      Size: "",
      Weight: "",
    },

    // Проверяем поле после выхода из него.
    mode: "onTouched",
  });

  useEffect(() => {
    let active = true;

    const loadForm = async () => {
      setFormLoading(true);
      setSubmitError("");

      try {
        // Загружаем справочники одновременно.
        const [brandsData, categoriesData, colorsData] = await Promise.all([
          dispatch(getBrands()).unwrap(),
          dispatch(getCategories()).unwrap(),
          dispatch(getColors()).unwrap(),
        ]);

        if (!id || !active) return;

        const product = await dispatch(getProductById(Number(id))).unwrap();

        if (!active) return;

        reset({
          ProductName: product.productName,
          Code: product.code,
          Description: product.description,
          Price: product.price,
          Quantity: product.quantity,
          HasDiscount: product.hasDiscount,
          DiscountPrice: product.discountPrice,
          Size: product.size ?? "",
          Weight: product.weight ?? "",
        });

        const brand = brandsData.find(
          (item) => item.brandName === product.brand,
        );

        const color = colorsData.find(
          (item) => item.colorName === product.color,
        );

        const category = categoriesData.find((item) =>
          item.subCategories.some((sub) => sub.id === product.subCategoryId),
        );

        setBrandId(brand ? String(brand.id) : "");
        setColorId(color ? String(color.id) : "");
        setCategoryId(category ? String(category.id) : "");
        setSubCategoryId(category ? String(product.subCategoryId) : "");

        setExistingImages(product.images);
        setLoadedProductId(id);
      } catch (error) {
        if (active) {
          setSubmitError(
            typeof error === "string" ? error : "Не удалось загрузить форму",
          );
        }
      } finally {
        if (active) {
          setFormLoading(false);
        }
      }
    };

    loadForm();

    return () => {
      active = false;
    };
  }, [dispatch, id, reset]);

  const selectedCategory = categories.find(
    (category) => category.id === Number(categoryId),
  );

  const subCategories = selectedCategory?.subCategories ?? [];

  const inputClass =
    "h-12 w-full rounded border border-[#dce0e9] bg-white px-4 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100";

  const onSubmit = async (values: AddProductValues) => {
    setSubmitError("");

    if (!brandId || !subCategoryId || !colorId) {
      setSubmitError("Выберите бренд, подкатегорию и цвет");
      return;
    }

    if (isEdit) {
      // Не сохраняем пустую форму, если загрузка товара не удалась.
      if (loadedProductId !== id) {
        setSubmitError("Сначала загрузите данные товара");
        return;
      }

      const result = await dispatch(
        updateProduct({
          ...values,
          Id: Number(id),
          BrandId: Number(brandId),
          ColorId: Number(colorId),
          SubCategoryId: Number(subCategoryId),
        }),
      );

      if (updateProduct.fulfilled.match(result)) {
        navigate("/products");
      }

      if (updateProduct.rejected.match(result)) {
        setSubmitError(result.payload ?? "Не удалось обновить товар");
      }

      return;
    }

    if (images.length === 0) {
      setImagesError("Добавьте хотя бы одно изображение");
      return;
    }

    if (imagesError) {
      return;
    }

    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    formData.append("BrandId", brandId);
    formData.append("SubCategoryId", subCategoryId);
    formData.append("ColorId", colorId);

    if (!values.HasDiscount) {
      formData.set("DiscountPrice", "0");
    }

    images.forEach((file) => {
      formData.append("Images", file);
    });

    const result = await dispatch(addProduct(formData));

    if (addProduct.fulfilled.match(result)) {
      navigate("/products");
    }

    if (addProduct.rejected.match(result)) {
      setSubmitError(result.payload ?? "Не удалось добавить товар");
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#1c2637]">
      <Header />

      <div className="flex flex-col md:flex-row">
        <Aside />

        <main className="min-w-0 flex-1 p-5 lg:p-8">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <NavLink
                to="/products"
                aria-label="Вернуться к товарам"
                className="text-2xl text-[#7e84a3]"
              >
                ←
              </NavLink>
              <h1 className="text-2xl font-bold">
                Products / {isEdit ? "Edit product" : "Add new"}
              </h1>{" "}
            </div>

            <div className="flex gap-3">
              <NavLink
                to="/products"
                className="rounded border border-[#dce0e9] px-6 py-2.5 text-sm text-blue-600"
              >
                Cancel
              </NavLink>

              <button
                type="button"
                onClick={handleSubmit(onSubmit)}
                disabled={
                  isSubmitting ||
                  formLoading ||
                  (isEdit && loadedProductId !== id) ||
                  brandsLoading ||
                  categoriesLoading ||
                  colorsLoading
                }
                className="rounded bg-blue-600 px-8 py-2.5 text-sm text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? "Сохранение..." : "Save"}
              </button>
            </div>
          </div>

          {formLoading && (
            <p role="status" className="mb-5 text-sm text-slate-500">
              Загрузка формы...
            </p>
          )}

          {isEdit && !formLoading && loadedProductId !== id && (
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mb-5 text-sm text-blue-600 underline"
            >
              Повторить загрузку формы
            </button>
          )}

          {submitError && (
            <p
              role="alert"
              className="mb-5 rounded border border-red-200 bg-red-50 p-4 text-sm text-red-600"
            >
              {submitError}
            </p>
          )}

          {Object.keys(errors).length > 0 && (
            <div
              role="alert"
              className="mb-5 space-y-1 rounded border border-red-200 bg-red-50 p-4 text-sm text-red-600"
            >
              {Object.entries(errors).map(([field, error]) => (
                <p key={field}>{error?.message}</p>
              ))}
            </div>
          )}

          <div className="grid gap-8 xl:grid-cols-[minmax(0,1.7fr)_minmax(280px,1fr)]">
            {/* Левая колонка */}
            <div className="space-y-8">
              <section>
                <h2 className="mb-4 font-semibold">Information</h2>

                <div className="grid gap-4 sm:grid-cols-[1fr_150px]">
                  <input
                    {...register("ProductName")}
                    placeholder="Product name"
                    maxLength={100}
                    className={inputClass}
                  />

                  <input
                    {...register("Code")}
                    placeholder="Code"
                    className={inputClass}
                  />
                </div>

                <textarea
                  {...register("Description")}
                  placeholder="Description"
                  maxLength={500}
                  className="mt-4 min-h-52 w-full resize-y rounded border border-[#dce0e9] p-4 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <select
                    value={categoryId}
                    disabled={categoriesLoading}
                    onChange={(event) => {
                      setCategoryId(event.target.value);

                      setSubCategoryId("");
                    }}
                    className={inputClass}
                  >
                    <option value="" disabled>
                      {categoriesLoading ? "Загрузка..." : "Categories"}
                    </option>

                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.categoryName}
                      </option>
                    ))}
                  </select>

                  <select
                    value={brandId}
                    onChange={(event) => setBrandId(event.target.value)}
                    name="BrandId"
                    disabled={brandsLoading}
                    className={inputClass}
                  >
                    <option value="" disabled>
                      {brandsLoading ? "Загрузка..." : "Brands"}
                    </option>

                    {brands.map((brand) => (
                      <option key={brand.id} value={brand.id}>
                        {brand.brandName}
                      </option>
                    ))}
                  </select>

                  {brandsError && (
                    <div role="alert" className="text-sm text-red-600">
                      <p>{brandsError}</p>

                      <button
                        type="button"
                        onClick={() => dispatch(getBrands())}
                        className="mt-1 underline"
                      >
                        Повторить загрузку
                      </button>
                    </div>
                  )}

                  <select
                    name="SubCategoryId"
                    aria-label="Подкатегория"
                    value={subCategoryId}
                    disabled={categoriesLoading || subCategories.length === 0}
                    onChange={(event) => setSubCategoryId(event.target.value)}
                    className={inputClass}
                  >
                    <option value="" disabled>
                      {categoryId
                        ? "Subcategory"
                        : "Сначала выберите категорию"}
                    </option>

                    {subCategories.map((subCategory) => (
                      <option key={subCategory.id} value={subCategory.id}>
                        {subCategory.subCategoryName}
                      </option>
                    ))}
                  </select>

                  {categoryId &&
                    !categoriesLoading &&
                    subCategories.length === 0 && (
                      <p className="text-sm text-slate-500">
                        У этой категории пока нет подкатегорий.
                      </p>
                    )}

                  {categoriesError && (
                    <div role="alert" className="text-sm text-red-600">
                      <p>{categoriesError}</p>

                      <button
                        type="button"
                        onClick={() => dispatch(getCategories())}
                        className="mt-1 underline"
                      >
                        Повторить загрузку
                      </button>
                    </div>
                  )}
                </div>
              </section>

              <section>
                <h2 className="mb-4 font-semibold">Price</h2>

                <div className="grid gap-4 sm:grid-cols-3">
                  <input
                    {...register("Price", { valueAsNumber: true })}
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="Product price"
                    className={inputClass}
                  />

                  <input
                    {...register("DiscountPrice", { valueAsNumber: true })}
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="Discount price"
                    className={inputClass}
                  />

                  <input
                    {...register("Quantity", { valueAsNumber: true })}
                    type="number"
                    min="0"
                    step="1"
                    placeholder="Count"
                    className={inputClass}
                  />
                </div>

                <label className="mt-5 flex items-center gap-3 text-sm">
                  <input
                    {...register("HasDiscount")}
                    type="checkbox"
                    className="size-4 accent-blue-600"
                  />
                  Has discount
                </label>
              </section>

              <section>
                <h2 className="mb-4 font-semibold">Options</h2>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="space-y-2 text-sm text-[#7e84a3]">
                    <span>Size</span>
                    <input
                      {...register("Size")}
                      placeholder="Например: M"
                      className={inputClass}
                    />
                  </label>

                  <label className="space-y-2 text-sm text-[#7e84a3]">
                    <span>Weight</span>
                    <input
                      {...register("Weight")}
                      placeholder="Например: 0.5 kg"
                      className={inputClass}
                    />
                  </label>
                </div>
              </section>
            </div>

            {/* Правая колонка */}
            <div className="space-y-6">
              <section className="rounded border border-[#e6e9ef] p-5">
                <h2 className="mb-4 font-semibold">Colour</h2>

                <select
                  name="ColorId"
                  value={colorId}
                  disabled={colorsLoading}
                  onChange={(event) => setColorId(event.target.value)}
                  className={inputClass}
                >
                  <option value="" disabled>
                    {colorsLoading ? "Загрузка..." : "Select colour"}
                  </option>

                  {colors.map((color) => (
                    <option key={color.id} value={color.id}>
                      {color.colorName}
                    </option>
                  ))}
                </select>

                {colorsError && (
                  <div role="alert" className="mt-2 text-sm text-red-600">
                    <p>{colorsError}</p>

                    <button
                      type="button"
                      onClick={() => dispatch(getColors())}
                      className="mt-1 underline"
                    >
                      Повторить загрузку
                    </button>
                  </div>
                )}
              </section>

              <section>
                <h2 className="mb-4 font-semibold">Images</h2>

                {isEdit && (
                  <div className="flex flex-wrap gap-3">
                    {existingImages.map((image) => (
                      <img
                        key={image.id}
                        src={`${import.meta.env.VITE_API}/images/${image.images}`}
                        alt="Изображение товара"
                        className="size-20 rounded border border-slate-200 object-contain"
                      />
                    ))}
                  </div>
                )}

                <label className="flex min-h-40 cursor-pointer flex-col items-center justify-center gap-3 rounded border border-dashed border-[#b9c8ee] p-5 text-center hover:bg-blue-50">
                  <span aria-hidden="true" className="text-3xl text-[#7e84a3]">
                    ↑
                  </span>

                  <span className="text-sm font-medium text-blue-600">
                    Click to upload
                  </span>

                  <span className="text-xs text-[#7e84a3]">
                    Выбери изображения товара
                  </span>

                  <input
                    name="Images"
                    type="file"
                    accept="image/*"
                    multiple
                    className="sr-only"
                    onChange={(event) => {
                      // Превращаем выбранные файлы в обычный массив.
                      const files = Array.from(event.target.files ?? []);

                      // Проверяем, что выбраны изображения.
                      const hasWrongFile = files.some(
                        (file) => !file.type.startsWith("image/"),
                      );

                      if (hasWrongFile) {
                        setImagesError("Выберите только изображения");
                      } else {
                        setImages(files);
                        setImagesError("");
                      }

                      // Позволяет повторно выбрать тот же файл.
                      event.target.value = "";
                    }}
                  />
                </label>
                {imagesError && (
                  <p role="alert" className="mt-3 text-sm text-red-600">
                    {imagesError}
                  </p>
                )}

                <ul className="mt-4 space-y-2">
                  {images.map((file, index) => (
                    <li
                      key={`${file.name}-${index}`}
                      className="flex items-center justify-between gap-3 rounded border border-[#e6e9ef] p-3"
                    >
                      <span className="min-w-0 truncate text-sm">
                        {file.name}
                      </span>

                      <button
                        type="button"
                        aria-label={`Убрать ${file.name}`}
                        className="shrink-0 text-sm text-red-500 hover:underline"
                        onClick={() => {
                          // Оставляем все файлы, кроме выбранного.
                          setImages(
                            images.filter(
                              (_, fileIndex) => fileIndex !== index,
                            ),
                          );
                        }}
                      >
                        Удалить
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
