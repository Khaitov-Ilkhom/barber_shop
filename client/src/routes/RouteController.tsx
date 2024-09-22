import {useRoutes} from "react-router-dom";
import {SuspenseElement as Suspense} from "../utils";
import React, {lazy} from "react";

const Home: React.LazyExoticComponent<JSX.Element> = lazy(() => import("../routes/home/Home.tsx"))
const Profile: React.LazyExoticComponent<JSX.Element> = lazy(() => import("../routes/profile/Profile.tsx"))
const OurTeam: React.LazyExoticComponent<JSX.Element> = lazy(() => import("../routes/our-team/OurTeam.tsx"))
const Gallery: React.LazyExoticComponent<JSX.Element> = lazy(() => import("../routes/gallery/Gallery.tsx"))

const Auth: React.LazyExoticComponent<JSX.Element> = React.lazy(() => import("../routes/auth/Auth.tsx"))
const Login: React.LazyExoticComponent<JSX.Element> = React.lazy(() => import("../routes/auth/signin/SignIn.tsx"))
const Register: React.LazyExoticComponent<JSX.Element> = React.lazy(() => import("../routes/auth/signup/SignUp.tsx"))

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
