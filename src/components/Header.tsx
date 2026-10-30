import { NavLink } from 'react-router-dom'
import logo from '../assets/logo.png'

export default function Header() {
    return (
        <header className="sticky top-0 z-20 flex h-18 items-center bg-[#1c2637] font-sans text-[#d1d5df]">
            <NavLink to="/dashboard" aria-label="FastCart — Dashboard" className="flex h-full w-[155px] shrink-0 items-center px-5 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-blue-400 sm:w-[220px] md:w-[240px] md:px-7">
                <img src={logo} alt="FastCart" className="h-auto w-full max-w-[180px]" />
            </NavLink>

            <div className="flex min-w-0 flex-1 items-center justify-end gap-4 px-4 sm:justify-between sm:px-6 lg:px-8">
                {/* Пока только поле поиска, без фильтрации данных. */}
                <label className="hidden min-w-0 max-w-md flex-1 items-center gap-3 rounded sm:flex focus-within:text-white">
                    <span className="sr-only">Поиск по админке</span>
                    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true" className="shrink-0">
                        <circle cx="10.5" cy="10.5" r="6.5" />
                        <path d="m16 16 4 4" />
                    </svg>
                    <input type="search" placeholder="Search..." className="h-10 w-full min-w-0 rounded bg-transparent px-1 text-sm text-white outline-none placeholder:text-[#d1d5df] focus-visible:ring-2 focus-visible:ring-blue-400" />
                </label>

                {/* Счётчик, имя и аватар статичны, как на макете. */}
                <div className="flex shrink-0 items-center gap-3 sm:gap-5">
                    <button type="button" aria-label="Уведомления: 5" className="relative flex size-10 items-center justify-center rounded-md hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-blue-400">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9Z" />
                            <path d="M10 21h4" />
                        </svg>
                        <span className="absolute right-0.5 top-0.5 flex size-4 items-center justify-center rounded-full bg-[#3366ff] text-[10px] font-medium text-white">5</span>
                    </button>

                    <button type="button" aria-label="Профиль Randhir kumar" className="flex items-center gap-3 rounded-md py-1 text-sm hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400">
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#19c987] text-base font-semibold text-white">R</span>
                        <span className="hidden lg:inline">Randhir kumar</span>
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="m6 9 6 6 6-6" />
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    )
}
