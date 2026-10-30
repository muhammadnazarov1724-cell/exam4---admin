import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosRequest, getUserId, saveToken } from "../utils/token";
import axios from "axios";
import type { AddProductValues } from "../utils/productSchema";

type Brand = {
  id: number;
  brandName: string;
};

type Color = {
  id: number;
  colorName: string;
};

type SubCategory = {
  id: number;
  subCategoryName: string;
};

type Category = {
    id: number
    categoryName: string
    categoryImage: string | null
    subCategories: SubCategory[]
}

type Product = {
  id: number;
  productName: string;
  image: string | null;
  quantity: number;
  categoryName: string | null;
  price: number;
  categoryId: number | null;
};

type ProductParams = {
  search: string;
  page: number;
};

type ProductsResponse = {
  data: {
    products: Product[];
  };
  totalPage: number;
  totalRecord: number;
  statusCode: number;
};

type LoginData = {
  userName: string;
  password: string;
};

type LoginResponse = {
  data: string | null;
  errors: unknown;
  statusCode: number;
};

type UpdateProductData = AddProductValues & {
  Id: number;
  BrandId: number;
  ColorId: number;
  SubCategoryId: number;
};

type ProductDetails = {
  id: number;
  productName: string;
  description: string;
  code: string;
  price: number;
  quantity: number;

  brand: string;
  color: string;
  subCategoryId: number;

  hasDiscount: boolean;
  discountPrice: number;
  size: string | null;
  weight: string | null;

  images: {
    id: number;
    images: string;
  }[];
};

type UserProfile = {
  userId: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dob: string;
  image: string | null;
};

type DashboardData = {
  products: Product[];
  totalProducts: number;
  totalCategories: number;
  totalBrands: number;

  categoryStats: {
    id: number;
    name: string;
    count: number;
  }[];
};

const initialState = {
  isLoading: false,
  error: null as string | null,
  products: [] as Product[],
  productsLoading: false,
  productsError: "",
  totalPages: 0,
  totalRecords: 0,
  brands: [] as Brand[],
  brandsLoading: false,
  brandsError: "",
  categories: [] as Category[],
  categoriesLoading: false,
  categoriesError: "",
  colors: [] as Color[],
  colorsLoading: false,
  colorsError: "",
  profile: null as UserProfile | null,
  profileLoading: false,
  profileError: "",
  dashboard: null as DashboardData | null,
  dashboardLoading: false,
  dashboardError: "",
  dashboardRequestId: "",
};

export const login = createAsyncThunk<void, LoginData, { rejectValue: string }>(
  "data/login",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axiosRequest.post<LoginResponse>(
        "/Account/login",
        values,
      );

      if (
        data.statusCode !== 200 ||
        typeof data.data !== "string" ||
        !data.data.trim()
      ) {
        return rejectWithValue("Сервер не подтвердил вход. Проверьте данные.");
      }

      saveToken(data.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (!error.response) {
          return rejectWithValue("Не удалось связаться с сервером.");
        }

        if ([400, 401].includes(error.response.status)) {
          return rejectWithValue("Проверьте имя пользователя и пароль.");
        }

        if (error.response.status === 403) {
          return rejectWithValue("Сервер запретил вход.");
        }
      }

      return rejectWithValue("Не удалось выполнить вход. Попробуйте ещё раз.");
    }
  },
);

export const getProducts = createAsyncThunk(
  "data/getProducts",
  async (params: ProductParams, { rejectWithValue }) => {
    try {
      const { data } = await axiosRequest.get<ProductsResponse>(
        "/Product/get-products",
        {
          params: {
            PageNumber: params.page,
            PageSize: 10,
            ProductName: params.search.trim(),
          },
        },
      );

      return data;
    } catch (error) {
      return rejectWithValue("Не удалось загрузить товары");
    }
  },
);

export const getBrands = createAsyncThunk(
  "data/getBrands",

  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosRequest.get("/Brand/get-brands", {
        params: {
          PageNumber: 1,
          PageSize: 1000,
        },
      });

      if (data.statusCode !== 200) {
        return rejectWithValue("Не удалось загрузить бренды");
      }

      // Внутри ответа data находится массив брендов.
      return data.data as Brand[];
    } catch {
      return rejectWithValue("Не удалось загрузить бренды");
    }
  },
);

export const getCategories = createAsyncThunk(
  "data/getCategories",

  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosRequest.get("/Category/get-categories");

      if (data.statusCode !== 200) {
        return rejectWithValue("Не удалось загрузить категории");
      }

      return data.data as Category[];
    } catch {
      return rejectWithValue("Не удалось загрузить категории");
    }
  },
);

export const getColors = createAsyncThunk(
  "data/getColors",

  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosRequest.get("/Color/get-colors", {
        params: {
          PageNumber: 1,
          PageSize: 1000,
        },
      });

      if (data.statusCode !== 200) {
        return rejectWithValue("Не удалось загрузить цвета");
      }

      return data.data as Color[];
    } catch {
      return rejectWithValue("Не удалось загрузить цвета");
    }
  },
);

export const addProduct = createAsyncThunk<
  boolean,
  FormData,
  { rejectValue: string }
>(
  "data/addProduct",

  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axiosRequest.post(
        "/Product/add-product",
        formData,
      );

      if (data.statusCode !== 200) {
        const message = Array.isArray(data.errors)
          ? data.errors.join(". ")
          : "";

        return rejectWithValue(message || "Сервер не создал товар");
      }

      return true;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 403) {
          return rejectWithValue("Нет прав на добавление товара");
        }

        const messages = error.response?.data?.errors;

        if (Array.isArray(messages) && messages.length) {
          return rejectWithValue(messages.join(". "));
        }
      }

      return rejectWithValue("Не удалось добавить товар");
    }
  },
);

export const deleteProduct = createAsyncThunk<
  boolean,
  number,
  { rejectValue: string }
>(
  "data/deleteProduct",

  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosRequest.delete("/Product/delete-product", {
        params: { id },
      });

      if (data.statusCode !== 200) {
        return rejectWithValue("Сервер не удалил товар");
      }

      return true;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 403) {
        return rejectWithValue("Нет прав на удаление товара");
      }

      return rejectWithValue("Не удалось удалить товар");
    }
  },
);

export const getProductById = createAsyncThunk<
  ProductDetails,
  number,
  { rejectValue: string }
>(
  "data/getProductById",

  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosRequest.get<{
        statusCode: number;
        data: ProductDetails;
      }>("/Product/get-product-by-id", {
        params: { id },
      });

      if (data.statusCode !== 200 || !data.data) {
        return rejectWithValue("Не удалось получить товар");
      }

      return data.data;
    } catch {
      return rejectWithValue("Не удалось загрузить товар");
    }
  },
);

export const updateProduct = createAsyncThunk<
  boolean,
  UpdateProductData,
  { rejectValue: string }
>(
  "data/updateProduct",

  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axiosRequest.put("/Product/update-product", null, {
        params: {
          ...values,

          // Без скидки отправляем нулевую цену скидки.
          DiscountPrice: values.HasDiscount ? values.DiscountPrice : 0,
        },
      });

      if (data.statusCode !== 200) {
        const message = Array.isArray(data.errors)
          ? data.errors.join(". ")
          : "";

        return rejectWithValue(message || "Сервер не обновил товар");
      }

      return true;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 403) {
          return rejectWithValue("Нет прав на редактирование этого товара");
        }

        const messages = error.response?.data?.errors;

        if (Array.isArray(messages) && messages.length) {
          return rejectWithValue(messages.join(". "));
        }
      }

      return rejectWithValue("Не удалось обновить товар");
    }
  },
);

export const getProfile = createAsyncThunk(
  "data/getProfile",

  async (_, { rejectWithValue }) => {
    try {
      const id = getUserId();

      if (!id) {
        return rejectWithValue(
          "Не удалось определить пользователя. Войдите заново.",
        );
      }

      const { data } = await axiosRequest.get(
        "/UserProfile/get-user-profile-by-id",
        {
          params: { id },
        },
      );

      if (data.statusCode !== 200) {
        return rejectWithValue("Не удалось получить профиль");
      }

      return data.data as UserProfile;
    } catch {
      return rejectWithValue("Не удалось загрузить профиль");
    }
  },
);

export const getDashboard = createAsyncThunk<
  DashboardData,
  void,
  { rejectValue: string }
>(
  "data/getDashboard",

  async (_, { rejectWithValue, signal }) => {
    try {
      // Загружаем первую страницу товаров и справочники.
      const [first, categoriesResponse, brandsResponse] = await Promise.all([
        axiosRequest.get<ProductsResponse>("/Product/get-products", {
          signal,
          params: {
            PageNumber: 1,
            PageSize: 100,
          },
        }),

        axiosRequest.get<{
          statusCode: number;
          data: Category[];
        }>("/Category/get-categories", { signal }),

        axiosRequest.get<{
          statusCode: number;
          totalRecord: number;
        }>("/Brand/get-brands", {
          signal,
          params: {
            PageNumber: 1,
            PageSize: 1,
          },
        }),
      ]);

      if (
        first.data.statusCode !== 200 ||
        categoriesResponse.data.statusCode !== 200 ||
        brandsResponse.data.statusCode !== 200
      ) {
        return rejectWithValue("Не удалось получить данные Dashboard");
      }

      const allProducts = [...first.data.data.products];

      // Если товаров больше одной страницы, собираем остальные.
      for (let page = 2; page <= first.data.totalPage; page++) {
        const { data } = await axiosRequest.get<ProductsResponse>(
          "/Product/get-products",
          {
            signal,
            params: {
              PageNumber: page,
              PageSize: 100,
            },
          },
        );

        if (data.statusCode !== 200) {
          return rejectWithValue("Не удалось загрузить все страницы каталога");
        }

        allProducts.push(...data.data.products);
      }

      // Убираем возможные повторения по ID.
      const unique = new Map<number, Product>();

      allProducts.forEach((product) => {
        unique.set(product.id, product);
      });

      const products = Array.from(unique.values());

      if (products.length !== first.data.totalRecord) {
        return rejectWithValue(
          "Каталог изменился во время загрузки. Повторите запрос.",
        );
      }

      const categories = categoriesResponse.data.data;

      // Считаем количество карточек товаров в каждой категории.
      const categoryStats = categories.map((category) => ({
        id: category.id,
        name: category.categoryName,
        count: products.filter((product) => product.categoryId === category.id)
          .length,
      }));

      // Учитываем товары, категория которых отсутствует в справочнике.
      const withoutCategory = products.filter(
        (product) =>
          !categories.some((category) => category.id === product.categoryId),
      ).length;

      if (withoutCategory > 0) {
        categoryStats.push({
          id: 0,
          name: "Без категории",
          count: withoutCategory,
        });
      }

      return {
        products,
        totalProducts: first.data.totalRecord,
        totalCategories: categories.length,
        totalBrands: brandsResponse.data.totalRecord,
        categoryStats,
      };
    } catch {
      return rejectWithValue("Не удалось загрузить Dashboard");
    }
  },
);

export const addCategory = createAsyncThunk<
    boolean,
    FormData,
    { rejectValue: string }
>(
    'data/addCategory',

    async (formData, { rejectWithValue }) => {
        try {
            const { data } = await axiosRequest.post(
                '/Category/add-category',
                formData
            )

            if (data.statusCode !== 200) {
                const message = Array.isArray(data.errors)
                    ? data.errors.join('. ')
                    : ''

                return rejectWithValue(
                    message || 'Не удалось создать категорию'
                )
            }

            return true
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 403) {
                    return rejectWithValue('Нет прав на создание категории')
                }

                const messages = error.response?.data?.errors

                if (Array.isArray(messages) && messages.length) {
                    return rejectWithValue(messages.join('. '))
                }
            }

            return rejectWithValue('Не удалось создать категорию')
        }
    }
)

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Не удалось выполнить вход.";
      });
    builder
      .addCase(getProducts.pending, (state) => {
        state.productsLoading = true;
        state.productsError = "";
      })

      .addCase(getProducts.fulfilled, (state, action) => {
        state.productsLoading = false;

        state.products = action.payload.data.products;
        state.totalPages = action.payload.totalPage;
        state.totalRecords = action.payload.totalRecord;
      })

      .addCase(getProducts.rejected, (state) => {
        state.productsLoading = false;
        state.productsError = "Не удалось загрузить товары";
      });
    builder
      .addCase(getBrands.pending, (state) => {
        state.brandsLoading = true;
        state.brandsError = "";
      })

      .addCase(getBrands.fulfilled, (state, action) => {
        state.brandsLoading = false;
        state.brands = action.payload;
      })

      .addCase(getBrands.rejected, (state) => {
        state.brandsLoading = false;
        state.brandsError = "Не удалось загрузить бренды";
      });
    builder
      .addCase(getCategories.pending, (state) => {
        state.categoriesLoading = true;
        state.categoriesError = "";
      })

      .addCase(getCategories.fulfilled, (state, action) => {
        state.categoriesLoading = false;
        state.categories = action.payload;
      })

      .addCase(getCategories.rejected, (state) => {
        state.categoriesLoading = false;
        state.categoriesError = "Не удалось загрузить категории";
      });

    builder
      .addCase(getColors.pending, (state) => {
        state.colorsLoading = true;
        state.colorsError = "";
      })

      .addCase(getColors.fulfilled, (state, action) => {
        state.colorsLoading = false;
        state.colors = action.payload;
      })

      .addCase(getColors.rejected, (state) => {
        state.colorsLoading = false;
        state.colorsError = "Не удалось загрузить цвета";
      });
    builder
      .addCase(getProfile.pending, (state) => {
        state.profileLoading = true;
        state.profileError = "";
        state.profile = null;
      })

      .addCase(getProfile.fulfilled, (state, action) => {
        state.profileLoading = false;
        state.profile = action.payload;
      })

      .addCase(getProfile.rejected, (state, action) => {
        state.profileLoading = false;
        state.profileError =
          typeof action.payload === "string"
            ? action.payload
            : "Не удалось загрузить профиль";
      });
    builder
      .addCase(getDashboard.pending, (state, action) => {
        state.dashboardLoading = true;
        state.dashboardError = "";
        state.dashboardRequestId = action.meta.requestId;
      })

      .addCase(getDashboard.fulfilled, (state, action) => {
        if (state.dashboardRequestId !== action.meta.requestId) return;

        state.dashboardLoading = false;
        state.dashboard = action.payload;
      })

      .addCase(getDashboard.rejected, (state, action) => {
        if (state.dashboardRequestId !== action.meta.requestId) return;

        state.dashboardLoading = false;

        if (!action.meta.aborted) {
          state.dashboardError =
            action.payload ?? "Не удалось загрузить Dashboard";
        }
      });
  },
});

export default dataSlice.reducer;
