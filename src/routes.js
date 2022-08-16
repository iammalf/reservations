import { useContext } from "react";
import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
//
import Blog from "./pages/Blog";
import User from "./pages/User";
import Login from "./pages/Login";
import NotFound from "./pages/Page404";
import Register from "./pages/Register";
import Products from "./pages/Products";
import DashboardApp from "./pages/DashboardApp";
import { AuthContext } from "./context/AuthContext";

// ----------------------------------------------------------------------
//CODIGO DE FIREBASE USARIO ACTIVO

export default function Router() {
  const { currentUser } = useContext(AuthContext);
  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };
  console.log(currentUser);
  return useRoutes([
    {
      path: "/dashboard",
      element: (
        <RequireAuth>
          <DashboardLayout />
        </RequireAuth>
      ),
      children: [
        {
          path: "app",
          element: (
            <RequireAuth>
              <DashboardApp />
            </RequireAuth>
          ),
        },
        {
          path: "user",
          element: (
            <RequireAuth>
              <User />
            </RequireAuth>
          ),
        },
        {
          path: "products",
          element: (
            <RequireAuth>
              <Products />
            </RequireAuth>
          ),
        },
        {
          path: "blog",
          element: (
            <RequireAuth>
              <Blog />
            </RequireAuth>
          ),
        },
      ],
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "register",
      element: <Register />,
    },
    {
      path: "/",
      element: <LogoOnlyLayout />,
      children: [
        { path: "/", element: <Navigate to="/dashboard/app" /> },
        { path: "404", element: <NotFound /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);
}
