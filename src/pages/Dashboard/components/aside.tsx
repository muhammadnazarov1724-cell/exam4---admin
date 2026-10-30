import { NavLink } from "react-router-dom";

export default function Aside() {
  return (
    <aside className="w-full shrink-0 bg-[#1c2637] px-4 pb-6 text-white md:sticky md:top-18 md:h-[calc(100dvh-4.5rem)] md:w-[240px] md:overflow-y-auto">
      <nav
        aria-label="Основное меню"
        className="mt-4 grid grid-cols-2 gap-2 md:mt-6 md:grid-cols-1"
      >
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            `flex h-12 items-center gap-3 rounded-md px-4 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 ${isActive ? "bg-white font-medium text-[#7e84a3]" : "text-[#d1d5df] hover:bg-white/5"}`
          }
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
            className="shrink-0"
          >
            <path d="m3 10 9-7 9 7v10H3V10Zm6 10v-7h6v7" />
          </svg>
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/orders"
          end
          className={({ isActive }) =>
            `flex h-12 items-center gap-3 rounded-md px-4 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 ${isActive ? "bg-white font-medium text-[#7e84a3]" : "text-[#d1d5df] hover:bg-white/5"}`
          }
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
            className="shrink-0"
          >
            <path d="M9 6h12M9 12h12M9 18h12M3 6h1M3 12h1M3 18h1" />
          </svg>
          <span>Orders</span>
          <span className="ml-auto rounded-full bg-[#111827] px-2 py-0.5 text-xs font-semibold text-white">
            16
          </span>
        </NavLink>

        <NavLink
          to="/products"
          className={({ isActive }) =>
            `flex h-12 items-center gap-3 rounded-md px-4 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 ${isActive ? "bg-white font-medium text-[#7e84a3]" : "text-[#d1d5df] hover:bg-white/5"}`
          }
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
            className="shrink-0"
          >
            <path d="M20 3h-7L3 13l8 8L21 11V4a1 1 0 0 0-1-1ZM17 7h.01" />
          </svg>
          <span>Products</span>
        </NavLink>

        <NavLink
          to="/others"
          className={({ isActive }) =>
            `flex h-12 items-center gap-3 rounded-md px-4 text-sm ${
              isActive
                ? "bg-white font-medium text-[#7e84a3]"
                : "text-[#d1d5df] hover:bg-white/5"
            }`
          }
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
            className="shrink-0"
          >
            <path d="M3 7V4h6l3 3h9v13H3V7Z" />
          </svg>
          <span>Other</span>
        </NavLink>
      </nav>
    </aside>
  );
}
