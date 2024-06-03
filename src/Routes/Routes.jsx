import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Main/Main";
import Login from "../Authentication/Login";
import Register from "../Authentication/Register";
import ErrorPage from "../Components/ErrorPage/ErrorPage";




  
 export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement: <ErrorPage></ErrorPage>,

      children:[
        {
            path: '/login',
            element: <Login></Login>
          },
          {
            path: '/register',
            element: <Register></Register>
          },
        // {
        //   path: '/',
        //   element: <Home></Home>
        // },
    //     {
    //       path: '/menu',
    //       element: <Menu></Menu>
    //     },
    //     {
    //       path: '/order/:category',
    //       element: <Order></Order>
    //     },

    //     {
    //       path: '/login',
    //       element: <LogIn></LogIn>
    //     },
    //     {
    //       path: '/signUp',
    //       element: <SignUp></SignUp>
    //     },
    //     {
    //       path: '/profile',
    //       element: <PrivateRoutes> <Profile></Profile> </PrivateRoutes>
    //     },
    //     {
    //       path: '/secret',
    //       element: <PrivateRoutes> <Secret></Secret> </PrivateRoutes>
    //     }

    //   ]
    // },

    // {
    //   path: "dashboard",
    //   element: <PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
    //   children:[
    //     {
    //       path: 'userHome',
    //       element: <UserHome></UserHome>
    //     },

    //     {
    //       path: 'cart',
    //       element: <Cart></Cart>
    //     },

    //     {
    //       path: 'payment',
    //       element: <Payment></Payment>
    //     },
    //     {
    //       path: 'paymentHistory',
    //       element: <PaymentHistory></PaymentHistory>
    //     },

    //     // for admin panel
    //   {
    //      path: 'adminHome',
    //      element: <AdminRoutes><AdminHome></AdminHome></AdminRoutes>

    //   },
    //     {
    //       path: 'addItems',
    //       element: <AdminRoutes> <AddItems></AddItems> </AdminRoutes>

    //     },
    //     {
    //       path: 'updatedItems/:id',
    //       element: <AdminRoutes> <UpdatedItems></UpdatedItems> </AdminRoutes>,
    //       loader: ({params}) => fetch(`http://localhost:5000/menu/${params.id}`)
    //     },
    //     {
    //       path: 'manageItems',
    //       element: <AdminRoutes> <ManageItems></ManageItems> </AdminRoutes>

    //     },

    //     {
    //       path: 'allUsers',
    //       element: <AdminRoutes><AllUsers></AllUsers></AdminRoutes>
    //     }
        
      ]
    },
  ]);