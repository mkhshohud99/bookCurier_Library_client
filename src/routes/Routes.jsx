import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../RootLayout/RootLayout";
import Home from "../Pages/Home/Home";
import Error from "../Pages/Error";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import MainDashboard from "../Pages/Dashboard/MainDashboard/MainDashboard";
import AddBooks from "../Pages/Dashboard/AddBooks/AddBooks";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: 'main',
        element: <MainDashboard />,
      },
      {
        path: 'add-books',
        Component: AddBooks
      }
    ],
  }
]);

export default router;
