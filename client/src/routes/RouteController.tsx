import {useRoutes} from "react-router-dom";
import {SuspenseElement as Suspense} from "../utils/Index.tsx";
import React, {LazyExoticComponent} from "react";

const Home: LazyExoticComponent<any> = React.lazy(() => import("../routes/home/Home.tsx"))
const Profile: LazyExoticComponent<any> = React.lazy(() => import("../routes/profile/Profile.tsx"))
const OurTeam: LazyExoticComponent<any> = React.lazy(() => import("../routes/our-team/OurTeam.tsx"))
const Gallery: LazyExoticComponent<any> = React.lazy(() => import("../routes/gallery/Gallery.tsx"))

const Auth: LazyExoticComponent<any> = React.lazy(() => import("../routes/auth/Auth.tsx"))
const Login: LazyExoticComponent<any> = React.lazy(() => import("../routes/auth/signin/SignIn.tsx"))
const Register: LazyExoticComponent<any> = React.lazy(() => import("../routes/auth/signup/SignUp.tsx"))

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
      path: "profile",
      element: <Suspense><Profile/></Suspense>
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
