import {Outlet} from "react-router-dom";


const Auth = () => {
  return (
      <div className="w-full flex justify-center items-center m-auto h-screen bg-slate-500">
        <Outlet/>
      </div>
  )
}
export default Auth
