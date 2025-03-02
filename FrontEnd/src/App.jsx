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
import { Navigate } from "react-router-dom";
import AboutPage from "./pages/shopping-view/about";
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
  {/* Redirect root to the shop home */}
  <Route path="/" element={<Navigate to="/shop/home" replace />} />

  {/* Auth Routes */}
  <Route path="/auth" element={<AuthLayout />}>
    <Route path="login" element={<AuthLogin />} />
    <Route path="register" element={<AuthRegister />} />
    <Route path="verify-email" element={<EmailVerificationPage />} />
    <Route path="forgot-password" element={<ForgotPasswordPage />} />
    <Route path="reset-password/:token" element={<ResetPasswordPage />} />
  </Route>

  {/* Admin Routes */}
  <Route path="/admin" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><AdminLayout /></CheckAuth>}>
    <Route path="dashboard" element={<AdminDashboard />} />
    <Route path="products" element={<AdminProducts />} />
    <Route path="orders" element={<AdminOrders />} />
    <Route path="features" element={<AdminFeatures />} />
  </Route>

  {/* Shopping Routes (Public) */}
  <Route path="/shop" element={<ShoppingLayout />}>
    <Route path="home" element={<ShoppingHome />} />
    <Route path="listing" element={<ShoppingListing />} />
    <Route path="account" element={<ShoppingAccount />} />
    <Route path="paystack-return" element={<PaystackReturnPage />} />
    <Route path="payment-success" element={<PaymentSuccessPage />} />
    <Route path="search" element={<SearchProducts />} />
    <Route path="about" element={<AboutPage/>} />

  </Route>

  {/* Checkout requires authentication */}
  <Route
    path="/shop/checkout"
    element={
      <CheckAuth isAuthenticated={isAuthenticated} user={user}>
        <ShoppingCheckout />
      </CheckAuth>
    }
  />

  {/* Unauthenticated and Not Found Pages */}
  <Route path="/unauth-page" element={<UnauthPage />} />
  <Route path="*" element={<NotFound />} />
</Routes>

    </div>
  );
}

export default App;

