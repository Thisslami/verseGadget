import { Routes, Route } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AdminLayout from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminOrders from "./pages/admin-view/orders";
import AdminFeatures from "./pages/admin-view/features";
import AdminProducts from "./pages/admin-view/products";
import ShoppingLayout from "./components/shopping-view/layout";
import NotFound from "./pages/not-found";
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import ShoppingAccount from "./pages/shopping-view/account";
import CheckAuth from "./components/common/check-auth";
import UnauthPage from "./pages/unauth-page";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "@/components/ui/skeleton";
import ShoppingListing from "./pages/shopping-view/listing";
import PaystackReturnPage from "./pages/shopping-view/paystack-return";
import PaymentSuccessPage from "./pages/shopping-view/payment-success";
import SearchProducts from "./pages/shopping-view/search";
import EmailVerificationPage from "./pages/auth/email-verification";
import ForgotPasswordPage from "./pages/auth/forgot-password";
import ResetPasswordPage from "./pages/auth/reset-password";

function App() {
  const { user, isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);


  if (isLoading) return <Skeleton className="w-[800px] bg-black h-[800px]" />;

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        {/* Auth Routes */}
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
          <Route path="verify-email" element={<EmailVerificationPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="reset-password/:token" element={<ResetPasswordPage />} />

        </Route>

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>

        {/* Shopping Routes */}
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="paystack-return" element={<PaystackReturnPage />} />
          <Route path="payment-success" element={<PaymentSuccessPage />} />
          <Route path="search" element={<SearchProducts />} />
        </Route>

        {/* Unauthenticated and Not Found Pages */}
        <Route path="/unauth-page" element={<UnauthPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;


// import { Routes, Route } from "react-router-dom";
// import AuthLayout from "./components/auth/layout";
// import AuthLogin from "./pages/auth/login";
// import AuthRegister from "./pages/auth/register";
// import AdminLayout from "./components/admin-view/layout";
// import AdminDashboard from "./pages/admin-view/dashboard";
// import AdminOrders from "./pages/admin-view/orders";
// import AdminFeatures from "./pages/admin-view/features";
// import AdminProducts from "./pages/admin-view/products";
// import ShoppingLayout from "./components/shopping-view/layout";
// import NotFound from "./pages/not-found";
// import ShoppingHome from "./pages/shopping-view/home";
// import ShoppingCheckout from "./pages/shopping-view/checkout";
// import ShoppingAccount from "./pages/shopping-view/account";
// import CheckAuth from "./components/common/check-auth";
// import UnauthPage from "./pages/unauth-page";
// import { useSelector, useDispatch } from "react-redux";
// import { useEffect } from "react";
// import { checkAuth } from "./store/auth-slice";
// import { Skeleton } from "@/components/ui/skeleton";
// import ShoppingListing from "./pages/shopping-view/listing";
// import PaystackReturnPage from "./pages/shopping-view/paystack-return";
// import PaymentSuccessPage from "./pages/shopping-view/payment-success";
// import SearchProducts from "./pages/shopping-view/search";
// import FloatingShape from "./components/common/floating-shape";

// function App() {
//   const { user, isAuthenticated, isLoading } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(checkAuth());
//   }, [dispatch]);

//   if (isLoading) return <Skeleton className="w-[800px] bg-black h-[800px]" />;

//   return (
//     <div
//       className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center relative overflow-hidden"
//     >
//       {/* Floating Shapes */}
//       <FloatingShape color="bg-green-600/30" size="w-64 h-64" top="-5%" left="10%" delay={0} />
//       <FloatingShape color="bg-emerald-600/30" size="w-48 h-48" top="70%" left="80%" delay={5} />
//       <FloatingShape color="bg-lime-600/30" size="w-32 h-32" top="40%" left="-10%" delay={2} />

//       <div className="flex flex-col w-full overflow-hidden bg-gray-900 text-white shadow-lg rounded-lg p-8">
//         <Routes>
//           {/* Auth Routes */}
//           <Route
//             path="/"
//             element={
//               <CheckAuth isAuthenticated={isAuthenticated} user={user}></CheckAuth>
//             }
//           />
//           <Route path="/auth" element={<AuthLayout />}>
//             <Route path="login" element={<AuthLogin />} />
//             <Route path="register" element={<AuthRegister />} />
//           </Route>
//           <Route path="/admin" element={<AdminLayout />}>
//             <Route path="dashboard" element={<AdminDashboard />} />
//             <Route path="products" element={<AdminProducts />} />
//             <Route path="orders" element={<AdminOrders />} />
//             <Route path="features" element={<AdminFeatures />} />
//           </Route>

//           {/* Shopping Routes */}
//           <Route path="/shop" element={<ShoppingLayout />}>
//             <Route path="home" element={<ShoppingHome />} />
//             <Route path="listing" element={<ShoppingListing />} />
//             <Route path="checkout" element={<ShoppingCheckout />} />
//             <Route path="account" element={<ShoppingAccount />} />
//             <Route path="paystack-return" element={<PaystackReturnPage />} />
//             <Route path="payment-success" element={<PaymentSuccessPage />} />
//             <Route path="search" element={<SearchProducts />} />
//           </Route>

//           {/* Unauthenticated and Not Found Pages */}
//           <Route path="/unauth-page" element={<UnauthPage />} />
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </div>
//     </div>
//   );
// }

// export default App;
