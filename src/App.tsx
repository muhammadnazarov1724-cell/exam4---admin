import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const Login = lazy(() => import('./pages/Login/Login'))
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'))
const Orders = lazy(() => import('./pages/Orders/Orders'))
const Products = lazy(() => import('./pages/Products/Products'))

export default function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element:  (
        <Suspense fallback={<h1>Loading...</h1>}>
          <Login/>
        </Suspense>
      )
    },
    {
    path: '/dashboard',
    element: (
        <Suspense fallback={<h1>Loading...</h1>}>
            <Dashboard />
        </Suspense>
    ),
    },
    {
    path: '/orders',
    element: (
        <Suspense fallback={<h1>Loading...</h1>}>
            <Orders />
        </Suspense>
    ),
    },
    {
    path: '/products',
    element: (
        <Suspense fallback={<h1>Loading...</h1>}>
            <Products/>
        </Suspense>
    ),
    },
  ])

  return <RouterProvider router={router}/> 
}
