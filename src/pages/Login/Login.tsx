import z from "zod";
import logo from "../../assets/logo.png";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { login } from "../../store/Redux";
import { useNavigate } from "react-router-dom";

const loginSchema = z.object({
  userName: z.string().trim().min(1, "Введите имя пользователя"),
  password: z.string().min(1, "Введите пароль"),
});

type LoginValues = z.infer<typeof loginSchema>;

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { isLoading } = useSelector((state: RootState) => state.data);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      userName: "",
      password: "",
    },
    mode: "onTouched",
  });

  const onSubmit = async (values: LoginValues) => {
    const result = await dispatch(login(values));

    // Открываем Dashboard после успешного входа.
    if (login.fulfilled.match(result)) {
      navigate("/dashboard", { replace: true });
    }
  };

  return (
    <main className="grid min-h-screen bg-white font-sans md:grid-cols-[53%_47%]">
      <section className="flex items-center bg-[#1c2637] bg-[radial-gradient(ellipse_at_top_left,rgba(13,103,103,0.3),transparent_55%),radial-gradient(ellipse_at_top_right,rgba(75,57,130,0.22),transparent_50%)] px-8 py-12 md:min-h-screen md:px-[9.5%]">
        <div>
          <p className="mb-6 text-xl font-medium text-white lg:text-2xl">
            Welcome to admin panel
          </p>

          <img
            src={logo}
            className="h-auto w-[280px] max-w-full lg:w-[350px]"
          />
        </div>
      </section>

      <section className="flex items-center justify-center px-6 py-16 md:py-12">
        <div className="w-full max-w-[400px]">
          <h1 className="mb-5 text-2xl font-semibold text-[#1c2637]">Log in</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>

              <input
                {...register("userName")}
                type="text"
                placeholder="Username"
                className="h-14 w-full rounded border border-gray-200 px-4 text-sm text-slate-900 outline-none placeholder:text-gray-500 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
              {errors.userName && (
                <p role="alert" className="mt-2 text-sm text-red-600">
                  {errors.userName.message}
                </p>
              )}
            </div>

            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Password
              </label>

              <input
                {...register("password")}
                type="password"
                placeholder="Password"
                className="h-14 w-full rounded border border-gray-200 py-4 pr-12 pl-4 text-sm text-slate-900 outline-none placeholder:text-gray-500 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
              {errors.password && (
                <p role="alert" className="text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-500"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </span>
            </div>

            <div className="pt-3 text-center">
              <p className="rounded text-sm font-medium text-blue-600 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600">
                Forgot password?
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading || isSubmitting}
              className="h-13 w-full cursor-pointer rounded bg-[#2563eb] px-4 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
            >
              Log in
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
