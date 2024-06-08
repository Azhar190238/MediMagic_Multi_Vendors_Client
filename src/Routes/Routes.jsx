import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Order from "../Pages/Order/Order";
import LogIn from "../Pages/LogIn/LogIn";
import SignUp from "../Pages/SignUp/SignUp";
import PrivateRoutes from "./PrivateRoutes";
import Profile from "../Pages/Profile/Profile";
import Dashboard from "../Layout/Dashboard";
import Cart from "../Pages/Cart/Cart";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import AddItems from "../Pages/Dashboard/AddItems/AddItems";
import AdminRoutes from "./AdminRoutes";
import ManageItems from "../Pages/Dashboard/ManageItems/ManageItems";
import UpdatedItems from "../Pages/Dashboard/UpdatedItems/UpdatedItems";
// import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentHistory from "../Pages/Dashboard/PyamentHistory/PaymentHistory";
import AdminHome from "../Pages/Dashboard/AdminHome/AdminHome";
import UserHome from "../Pages/Dashboard/UserHome/UserHome";
import SellerHome from "../Pages/Dashboard/SellerHome/SellerHome";
import ErrorPage from "../Components/SocialLogIn/ErrorPage/ErrorPage";
import ManageMedicine from "../Pages/Dashboard/Seller/ManageMedicine/ManageMedicine";
import SellerRoutes from "./SellerRoutes";
import Shop from "../Pages/Shop/Shop";
import Payment from "../Pages/Payment/Payment";
import InvoicePage from "../Pages/InvoicePage/InvoicePage";
import PaymentManagement from "../Pages/Dashboard/PaymentManagement/PaymentManagement";
import Advertisement from "../Pages/Dashboard/Seller/Advertisement/Advertisement";
import PaymentSeller from "../Pages/Dashboard/Seller/PaymentHistorySeller/PaymentSeller";
import AdminAdvertisement from "../Pages/Dashboard/AdminAdvertisement/AdminAdvertisement";

  
 export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement: <ErrorPage></ErrorPage>,
      children:[
        {
          path: '/',
          element: <Home></Home>
        },
        {
          path: '/shop',
          element: <Shop></Shop>
        },
        {
          path: '/order/:category',
          element: <Order></Order>
        },


        {
          path: '/login',
          element: <LogIn></LogIn>
        },
        {
          path: '/signUp',
          element: <SignUp></SignUp>
        },
        {
          path: '/profile',
          element: <PrivateRoutes> <Profile></Profile> </PrivateRoutes>
        },
        {
          path: '/addCart',
          element: <PrivateRoutes> <Cart></Cart> </PrivateRoutes>
        },
        {
          path: 'payment',
          element: <PrivateRoutes><Payment></Payment></PrivateRoutes>
        },
        {
          path: 'invoicePage',
          element: <PrivateRoutes> <InvoicePage></InvoicePage> </PrivateRoutes>
        },


      ]
    },

    {
      path: "dashboard",
      element: <PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
      children:[
        {
          path: 'userHome',
          element: <UserHome></UserHome>
        },

        {
          path: 'cart',
          element: <Cart></Cart>
        },
        {
          path: 'paymentHistory',
          element: <PaymentHistory></PaymentHistory>
        },

        // for admin panel
      {
         path: 'adminHome',
         element: <AdminRoutes><AdminHome></AdminHome></AdminRoutes>

      },
        {
          path: 'managePayment',
          element: <AdminRoutes> <PaymentManagement></PaymentManagement> </AdminRoutes>

        },
        {
          path: 'updatedItems/:id',
          element: <AdminRoutes> <UpdatedItems></UpdatedItems> </AdminRoutes>,
          loader: ({params}) => fetch(`http://localhost:5000/menu/${params.id}`)
        },
        {
          path: 'manageItems',
          element: <AdminRoutes> <ManageItems></ManageItems> </AdminRoutes>

        },
        {
          path: 'adminAdvertise',
          element: <AdminRoutes> <AdminAdvertisement></AdminAdvertisement> </AdminRoutes>
        },

        {
          path: 'allUsers',
          element: <AdminRoutes><AllUsers></AllUsers></AdminRoutes>
        },

        // for seller
        {
          path: 'sellerHome',
          element: <SellerRoutes><SellerHome></SellerHome></SellerRoutes>
 
       },
         {
          path: 'manageMedicine',
          element: <SellerRoutes> <ManageMedicine></ManageMedicine> </SellerRoutes>
         },
         {
          path: 'advertisement',
          element: <SellerRoutes> <Advertisement></Advertisement> </SellerRoutes>
         },
         {
          path: 'paymentHistorySeller',
          element: <SellerRoutes> <PaymentSeller></PaymentSeller> </SellerRoutes>
         }

        
      ]
    },
  ]);