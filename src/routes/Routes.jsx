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
import AllUsers from "../Pages/AllUsers/AllUsers";
import PrivateRoute from "../RootLayout/PrivateRoute";
import MyOrders from "../Pages/MyOders/MyOrders";
import PageSuccess from "../Pages/PaymentPages/PageSuccess";
import PageCancel from "../Pages/PaymentPages/PageCancel";
import Covarage from "../Pages/covarage/Covarage";
import AB from "../Pages/AllBooks/AB";
import WishList from "../Pages/WishList/WishList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      {
        path:'/',
        Component: Home
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
      },
      {
        path: '/my-orders',
        Component: MyOrders
      },
      {
        path:'/payment-success',
        Component: PageSuccess
      },
      {
        path: '/payment-cancel',
        Component: PageCancel
      },
      {
        path: '/covagage',
        Component: Covarage,
        loader: () => fetch('/serviceCenters.json').then(res=> res.json())
      },
      {
        path: '/all-book',
        Component: AB
      },
      {
        path: 'wish-list',
        Component: WishList
      }
    ],
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
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
      {
        path:'all-users',
        Component: AllUsers
      },
    ],
  }
]);

export default router;
