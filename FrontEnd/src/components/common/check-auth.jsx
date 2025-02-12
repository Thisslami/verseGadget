// import { Navigate, useLocation } from "react-router-dom";
// function CheckAuth({ isAuthenticated, user, children }) {
//   const location = useLocation();

//   // Skip auth check for reset-password route
//   if (
//     !isAuthenticated &&
//     !(
//       location.pathname.includes("/auth/login") ||
//       location.pathname.includes("/auth/register") ||
//       location.pathname.includes("/auth/verify-email") ||
//       location.pathname.includes("/auth/forgot-password") ||
//       location.pathname.includes("/auth/reset-password")  // Skip auth check here
//     )
//   ) {
//     return <Navigate to="/auth/login" />;
//   }

//   // Redirect authenticated users to their respective home pages if they try to access auth pages
//   if (
//     isAuthenticated &&
//     (location.pathname.includes("/auth/login") ||
//       location.pathname.includes("/auth/register") ||
//       location.pathname.includes("/auth/forgot-password") ||
//       location.pathname.includes("/auth/reset-password"))
//   ) {
//     if (user?.role === "admin") {
//       return <Navigate to="/admin/dashboard" />;
//     } else {
//       return <Navigate to="/shop/home" />;
//     }
//   }

//   // Handle email verification check
//   if (isAuthenticated && !user?.isVerified && !location.pathname.includes("/auth/verify-email")) {
//     return <Navigate to="/auth/verify-email" />;
//   }

//   // Handle unauthorized admin access
//   if (isAuthenticated && user?.role !== "admin" && location.pathname.includes("/admin")) {
//     return <Navigate to="/unauth-page" />;
//   }

//   // Handle access to shopping pages for authenticated users
//   if (isAuthenticated && user?.role === "admin" && location.pathname.includes("/shop")) {
//     return <Navigate to="/admin/dashboard" />;
//   }

//   return <>{children}</>;
// }

// export default CheckAuth;





import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

  // Redirect to login if trying to checkout without authentication
  if (!isAuthenticated && location.pathname === "/shop/checkout") {
    return <Navigate to="/auth/login" state={{ from: location }} />;
  }

  // Redirect authenticated users away from auth pages
  if (
    isAuthenticated &&
    ["/auth/login", "/auth/register", "/auth/forgot-password", "/auth/reset-password"].includes(location.pathname)
  ) {
    return <Navigate to={user?.role === "admin" ? "/admin/dashboard" : "/shop/home"} />;
  }

  // Ensure unverified users stay on the verification page
  if (isAuthenticated && !user?.isVerified && location.pathname !== "/auth/verify-email") {
    return <Navigate to="/auth/verify-email" />;
  }

  // After email verification, redirect users away from the verification page
  if (isAuthenticated && user?.isVerified && location.pathname === "/auth/verify-email") {
    return <Navigate to="/auth/login" />;
  }

  // Redirect non-admin users away from admin routes
  if (isAuthenticated && user?.role !== "admin" && location.pathname.startsWith("/admin")) {
    return <Navigate to="/unauth-page" />;
  }

  return children;
}

export default CheckAuth;


