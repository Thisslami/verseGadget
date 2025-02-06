import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

  // Skip auth check for reset-password route
  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/auth/login") ||
      location.pathname.includes("/auth/register") ||
      location.pathname.includes("/auth/verify-email") ||
      location.pathname.includes("/auth/forgot-password") ||
      location.pathname.includes("/auth/reset-password")  // Skip auth check here
    )
  ) {
    return <Navigate to="/auth/login" />;
  }

  // Redirect authenticated users to their respective home pages if they try to access auth pages
  if (
    isAuthenticated &&
    (location.pathname.includes("/auth/login") ||
      location.pathname.includes("/auth/register") ||
      location.pathname.includes("/auth/forgot-password") ||
      location.pathname.includes("/auth/reset-password"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/shop/home" />;
    }
  }

  // Handle email verification check
  if (isAuthenticated && !user?.isVerified && !location.pathname.includes("/auth/verify-email")) {
    return <Navigate to="/auth/verify-email" />;
  }

  // Handle unauthorized admin access
  if (isAuthenticated && user?.role !== "admin" && location.pathname.includes("/admin")) {
    return <Navigate to="/unauth-page" />;
  }

  // Handle access to shopping pages for authenticated users
  if (isAuthenticated && user?.role === "admin" && location.pathname.includes("/shop")) {
    return <Navigate to="/admin/dashboard" />;
  }

  return <>{children}</>;
}

export default CheckAuth;





// 
// import { useEffect } from "react";
// import { Navigate, useLocation } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { setUser } from "../../store/auth-slice/index"; // Assuming you have a Redux slice for user data

// function CheckAuth({ children }) {
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const { isAuthenticated, user } = useSelector((state) => state.auth);

//   useEffect(() => {
//     // On page load, check if a token exists in the cookie and decode it
//     const token = document.cookie.replace(
//       /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
//       "$1"
//     );
    
//     if (token) {
//       try {
//         const decoded = jwt.decode(token); // You can also verify the token here
//         if (decoded) {
//           // Dispatch the user data to the Redux store
//           dispatch(setUser(decoded));
//         }
//       } catch (error) {
//         console.error("Failed to decode token", error);
//       }
//     }
//   }, [dispatch]);

//   console.log(location.pathname, isAuthenticated);

//   if (location.pathname === "/") {
//     if (!isAuthenticated) {
//       return <Navigate to="/auth/login" />;
//     } else {
//       if (user?.role === "admin") {
//         return <Navigate to="/admin/dashboard" />;
//       } else {
//         return <Navigate to="/shop/home" />;
//       }
//     }
//   }

//   if (
//     !isAuthenticated &&
//     !(
//       location.pathname.includes("/login") ||
//       location.pathname.includes("/register") ||
//       location.pathname.includes("/verify-email")
//     )
//   ) {
//     return <Navigate to="/auth/login" />;
//   }

//   if (
//     isAuthenticated &&
//     (location.pathname.includes("/login") ||
//       location.pathname.includes("/register"))
//   ) {
//     if (user?.role === "admin") {
//       return <Navigate to="/admin/dashboard" />;
//     } else {
//       return <Navigate to="/shop/home" />;
//     }
//   }

//   if (
//     isAuthenticated &&
//     user?.role !== "admin" &&
//     location.pathname.includes("admin")
//   ) {
//     return <Navigate to="/unauth-page" />;
//   }

//   if (
//     isAuthenticated &&
//     user?.role === "admin" &&
//     location.pathname.includes("shop")
//   ) {
//     return <Navigate to="/admin/dashboard" />;
//   }

//   return <>{children}</>;
// }

// export default CheckAuth;
