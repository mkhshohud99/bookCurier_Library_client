import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../RootLayout/RootLayout";
import Home from "../Pages/Home/Home";
import Error from "../Pages/Error";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import MainDashboard from "../Pages/Dashboard/MainDashboard/MainDashboard";
import AddBooks from "../Pages/Dashboard/AddBooks/AddBooks";
import ManageBook from "../Pages/ManageBooks/ManageBook";
import OrderPage from "../Pages/OrderPage/OrderPage"
import ManageOrders from "../Pages/ManageOrders/ManageOrders";

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
      {
        path: '/books/id/:id',
        element:<OrderPage/>
      }
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index:true,
        element: <MainDashboard />,
      },
      {
        path: 'add-books',
        Component: AddBooks
      },
      {
        path:'manage-books',
        Component: ManageBook
      },
      {
        path:'manage-orders',
        Component: ManageOrders
      },
    ],
  }
]);

export default router;
