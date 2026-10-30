import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosRequest, saveToken } from "../utils/token";
import axios from "axios";

type LoginData = {
  userName: string;
  password: string;
};

type LoginResponse = {
  data: string | null;
  errors: unknown;
  statusCode: number;
};

const initialState = {
  isLoading: false,
  error: null as string | null,
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
  },
});

export default dataSlice.reducer
