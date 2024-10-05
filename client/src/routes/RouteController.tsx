import {useRoutes} from "react-router-dom";
import {SuspenseElement as Suspense} from "../utils/Index.tsx";
import React, {LazyExoticComponent} from "react";

const Home: LazyExoticComponent<any> = React.lazy(() => import("./home/Home.tsx"))
const UserProfile: LazyExoticComponent<any> = React.lazy(() => import("./profile/Profile.tsx"))
const OurTeam: LazyExoticComponent<any> = React.lazy(() => import("./our-team/OurTeam.tsx"))
const Gallery: LazyExoticComponent<any> = React.lazy(() => import("./gallery/Gallery.tsx"))
const Bookings: LazyExoticComponent<any> = React.lazy(() => import("./bookings/Booking.tsx"))

const Auth: LazyExoticComponent<any> = React.lazy(() => import("./auth/Auth.tsx"))
const Login: LazyExoticComponent<any> = React.lazy(() => import("./auth/signin/SignIn.tsx"))
const Register: LazyExoticComponent<any> = React.lazy(() => import("./auth/signup/SignUp.tsx"))

const Protected: LazyExoticComponent<any> = React.lazy(() => import("./protected/Protected.tsx"))
const Dashboard: LazyExoticComponent<any> = React.lazy(() => import("./dashboard/Dashboard.tsx"))
const Profile: LazyExoticComponent<any> = React.lazy(() => import("./dashboard/profile/Profile.tsx"))
const AllUser: LazyExoticComponent<any> = React.lazy(() => import("./dashboard/users/AllUsers.tsx"))
const Barbers: LazyExoticComponent<any> = React.lazy(() => import("./dashboard/barbers/Barbers.tsx"))
const Service: LazyExoticComponent<any> = React.lazy(() => import("./dashboard/service/Service.tsx"))
const Booking: LazyExoticComponent<any> = React.lazy(() => import("./dashboard/booking/Booking.tsx"))

const RouteController = () => {
  return useRoutes([
    {
      path: "",
      element: <Suspense><Home/></Suspense>
    },
    {
      path: "auth",
      element: <Suspense><Auth/></Suspense>,
      children: [
        {
          path: "",
          element: <Suspense><Login/></Suspense>
        },
        {
          path: "sign-up",
          element: <Suspense><Register/></Suspense>
        }
      ]
    },
    {
      path: "dashboard",
      element: <Suspense><Protected/></Suspense>,
      children: [
        {
          path: "",
          element: <Suspense><Dashboard/></Suspense>,
          children: [
            {
              path: "profile",
              element: <Suspense><Profile/></Suspense>
            },
            {
              path: "users",
              element: <Suspense><AllUser/></Suspense>
            },
            {
              path: "barbers",
              element: <Suspense><Barbers/></Suspense>
            },
            {
              path: "service",
              element: <Suspense><Service/></Suspense>
            },
            {
              path: "booking",
              element: <Suspense><Booking/></Suspense>
            }
          ]
        }
      ]
    },
    {
      path: "profile",
      element: <Suspense><UserProfile/></Suspense>
    },
    {
      path: "our-team",
      element: <Suspense><OurTeam/></Suspense>
    },
    {
      path: "gallery",
      element: <Suspense><Gallery/></Suspense>
    },
    {
      path: "bookings",
      element: <Suspense><Bookings/></Suspense>
    }
  ])
}
export default RouteController
