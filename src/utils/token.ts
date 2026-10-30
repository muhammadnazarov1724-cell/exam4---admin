import axios from "axios";

export const axiosRequest = axios.create({
    baseURL: import.meta.env.VITE_API,
})

export function saveToken(token: string) {
    localStorage.setItem('token', token)
}

export const removeToken = () => {
    localStorage.removeItem('token')
}

axiosRequest.interceptors.request.use((config) => {
    if (config.url?.startsWith('/Account/')) {
        return config
    }

    const token = localStorage.getItem('token')

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

axiosRequest.interceptors.response.use(
    (response) => response,

    (error: unknown) => {
        if (axios.isAxiosError(error)) {
            const original = error.config

            if (original?.url?.startsWith('/Account/')) {
                return Promise.reject(error)
            }

            if (error.response?.status === 401) {
                handleLogout()
            }
        }
        return Promise.reject(error)
    }
)

export function handleLogout() {
    removeToken()

    window.location.href = '/'
}

export function getUserId(): string | null {
    const token = localStorage.getItem('token')

    if (!token) return null

    try {
        const part = token.split('.')[1]

        const base64 = part.replace(/-/g, '+').replace(/_/g, '/')
        const payload = JSON.parse(atob(base64))

        const id =
            payload.sid ??
            payload.sub ??
            payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']

        return typeof id === 'string' ? id : null
    } catch {
        return null
    }
}