import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Login = lazy(() => import("./pages/Login/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const Orders = lazy(() => import("./pages/Orders/Orders"));
const Products = lazy(() => import("./pages/Products/Products"));
const AddProducts = lazy(() => import("./pages/Products/AddProducts"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const Others = lazy(() => import("./pages/Others/Others"));

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense fallback={<h1>Loading...</h1>}>
          <Login />
        </Suspense>
      ),
    },
    {
      path: "/dashboard",
      element: (
        <Suspense fallback={<h1>Loading...</h1>}>
          <Dashboard />
        </Suspense>
      ),
    },
    {
      path: "/orders",
      element: (
        <Suspense fallback={<h1>Loading...</h1>}>
          <Orders />
        </Suspense>
      ),
    },
    {
      path: "/products",
      element: (
        <Suspense fallback={<h1>Loading...</h1>}>
          <Products />
        </Suspense>
      ),
    },
{
    path: "/products/add",
    element: (
        <Suspense fallback={<h1>Loading...</h1>}>
            <AddProducts key="add" />
        </Suspense>
    ),
},
    {
      path: "/products/:id/edit",
      element: (
        <Suspense fallback={<h1>Loading...</h1>}>
          <AddProducts key="edit" />
        </Suspense>
      ),
    },
    {
      path: "/profile",
      element: (
        <Suspense fallback={<h1>Loading...</h1>}>
          <Profile />
        </Suspense>
      ),
    },
    {
      path: "/others",
      element: (
        <Suspense fallback={<h1>Loading...</h1>}>
          <Others />
        </Suspense>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}
