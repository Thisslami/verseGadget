import { Outlet } from "react-router-dom";





function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200">
      <div className="hidden lg:flex items-center justify-center bg-black w-1/2 px-12 py-8">
        <div className="max-w-md space-y-6 text-center text-white">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Geelaw Technologies
          </h1>
          <p className="text-lg">Your go-to store for amazing gadgets!</p>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center bg-white px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
}


export default AuthLayout;
