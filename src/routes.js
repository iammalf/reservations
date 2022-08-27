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
import Tours from "./pages/Tours";
import NewTour from "./pages/Tours/NewTour";
import EditTour from "./pages/Tours/EditTour";
import Reservations from "./pages/Reservations/Reservations";
import NewReservations from "./pages/Reservations/NewReservations";
import EditReservations from "./pages/Reservations/EditReservations";
import NewUser from "./pages/NewUser";
import DashboardApp from "./pages/DashboardApp";
import { AuthContext } from "./context/AuthContext";
import EditUser from "./pages/EditUser";

// ----------------------------------------------------------------------
//CODIGO DE FIREBASE USARIO ACTIVO

export default function Router() {
  //CODIGO DE LOGIN
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
          path: "reservations",
          element: (
            <RequireAuth>
              <Reservations />
            </RequireAuth>
          ),
        },
        {
          path: "newreservations",
          element: (
            <RequireAuth>
              <NewReservations />
            </RequireAuth>
          ),
        },
        {
          path: "editreservations/:id",
          element: (
            <RequireAuth>
              <EditReservations />
            </RequireAuth>
          ),
        },
        {
          path: "tours",
          element: (
            <RequireAuth>
              <Tours />
            </RequireAuth>
          ),
        },
        {
          path: "newtour",
          element: (
            <RequireAuth>
              <NewTour />
            </RequireAuth>
          ),
        },
        {
          path: "edittour/:id",
          element: (
            <RequireAuth>
              <EditTour />
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
          path: "newuser",
          element: (
            <RequireAuth>
              <NewUser />
            </RequireAuth>
          ),
        },
        {
          path: "edituser/:id",
          element: (
            <RequireAuth>
              <EditUser />
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
