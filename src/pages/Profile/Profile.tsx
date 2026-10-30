import { useDispatch, useSelector } from 'react-redux'
import Header from '../Dashboard/components/Header'
import Aside from '../Dashboard/components/aside'
import { handleLogout } from '../../utils/token'
import type { AppDispatch, RootState } from '../../store/store'
import { useEffect } from 'react'
import { getProfile } from '../../store/Redux'

export default function Profile() {
    const dispatch = useDispatch<AppDispatch>()
    const { profile, profileLoading, profileError } = useSelector(
    (state: RootState) => state.data
)

useEffect(() => {
    dispatch(getProfile())
}, [dispatch])

    return (
        <div className="min-h-screen bg-white text-[#1c2637]">
            <Header />

            <div className="flex flex-col md:flex-row">
                <Aside />

                <main className="min-w-0 flex-1 p-5 lg:p-8">
                    <div className="flex items-center justify-between gap-4">
                        <h1 className="text-2xl font-bold">
                            My profile
                        </h1>

                        <button
                            type="button"
                            onClick={handleLogout}
                            className="rounded border border-red-500 px-5 py-2 text-sm text-red-500 hover:bg-red-50"
                        >
                            Log out
                        </button>
                    </div>
                </main>
                {profileLoading && (
    <p role="status" className="mt-6 text-slate-500">
        Загрузка профиля...
    </p>
)}

{profileError && (
    <div role="alert" className="mt-6 text-red-600">
        <p>{profileError}</p>

        <button
            type="button"
            onClick={() => dispatch(getProfile())}
            className="mt-2 text-sm underline"
        >
            Повторить загрузку
        </button>
    </div>
)}

{!profileLoading && !profileError && profile && (
    <section className="mt-8 max-w-3xl rounded-lg border border-[#e6e9ef] p-6">
        <div className="flex items-center gap-5">
            {profile.image ? (
                <img
                    src={`${import.meta.env.VITE_API}/images/${profile.image}`}
                    alt="Фото профиля"
                    className="size-20 rounded-full bg-slate-100 object-cover"
                />
            ) : (
                <div className="flex size-20 items-center justify-center rounded-full bg-emerald-500 text-3xl text-white">
                    {profile.userName.slice(0, 1).toUpperCase()}
                </div>
            )}

            <div>
                <h2 className="text-xl font-semibold">
                    {profile.firstName} {profile.lastName}
                </h2>

                <p className="mt-1 text-sm text-[#7e84a3]">
                    @{profile.userName}
                </p>
            </div>
        </div>

        <dl className="mt-8 grid gap-6 sm:grid-cols-2">
            <div>
                <dt className="text-sm text-[#7e84a3]">Email</dt>
                <dd className="mt-1 break-words">
                    {profile.email || '—'}
                </dd>
            </div>

            <div>
                <dt className="text-sm text-[#7e84a3]">Телефон</dt>
                <dd className="mt-1">
                    {profile.phoneNumber || '—'}
                </dd>
            </div>

            <div>
                <dt className="text-sm text-[#7e84a3]">Дата рождения</dt>
                <dd className="mt-1">
                    {profile.dob && !profile.dob.startsWith('0001-')
                        ? profile.dob
                        : '—'}
                </dd>
            </div>
        </dl>
    </section>
)}
            </div>
        </div>
    )
}