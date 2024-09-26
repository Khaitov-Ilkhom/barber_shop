import {useRoutes} from "react-router-dom";
import {SuspenseElement as Suspense} from "../utils/Index.tsx";
import React, {LazyExoticComponent} from "react";

const Home: LazyExoticComponent<any> = React.lazy(() => import("../routes/home/Home.tsx"))
const UserProfile: LazyExoticComponent<any> = React.lazy(() => import("../routes/profile/Profile.tsx"))
const OurTeam: LazyExoticComponent<any> = React.lazy(() => import("../routes/our-team/OurTeam.tsx"))
const Gallery: LazyExoticComponent<any> = React.lazy(() => import("../routes/gallery/Gallery.tsx"))

const Auth: LazyExoticComponent<any> = React.lazy(() => import("../routes/auth/Auth.tsx"))
const Login: LazyExoticComponent<any> = React.lazy(() => import("../routes/auth/signin/SignIn.tsx"))
const Register: LazyExoticComponent<any> = React.lazy(() => import("../routes/auth/signup/SignUp.tsx"))

const Protected: LazyExoticComponent<any> = React.lazy(() => import("../routes/protected/Protected.tsx"))
const Dashboard: LazyExoticComponent<any> = React.lazy(() => import("../routes/dashboard/Dashboard.tsx"))
const Profile: LazyExoticComponent<any> = React.lazy(() => import("../routes/dashboard/profile/Profile.tsx"))
const AllUser: LazyExoticComponent<any> = React.lazy(() => import("./dashboard/users/AllUsers.tsx"))

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
    }
  ])
}
export default RouteController
