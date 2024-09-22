import { Route, Routes } from "react-router-dom";

// ------------------------------components------------------------------------
import AuthLayout from "./components/auth/AuthLayout";
import AuthLogin from "./pages/auth/AuthLogin";
import AuthRegister from "./pages/auth/AuthRegister";
import AdminLayout from "./components/admin_view/AdminLayout";
import AdminDashboard from "./pages/admin_view/AdminDashboard";
import AdminFeatures from "./pages/admin_view/AdminFeatures";
import AdminOrders from "./pages/admin_view/AdminOrders";
import AdminProducts from "./pages/admin_view/AdminProducts";
import PageNotFound from "./pages/not_found/PageNotFound";
import ShoppingLayout from "./components/shopping_view/ShoppingLayout";
import ShoppingAccount from "./pages/shopping_view/ShoppingAccount";
import ShoppingCheckout from "./pages/shopping_view/ShoppingCheckout";
import ShoppingListing from "./pages/shopping_view/ShoppingListing";
import ShoppingHome from "./pages/shopping_view/ShoppingHome";
import Check_Auth from "./components/common/Check_Auth";
import UnAuthPage from "./pages/unauth-page/UnAuthPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuthAction } from "./store/actions/authAction";
import { PageLoader } from "./components/common/Loading";
import PaypalReturn from "./pages/shopping_view/PaypalReturn";
import SendLink from "./pages/auth/SendLink";
import PasswordRecover from "./pages/auth/PasswordRecover";
import TrackRoutes from "./pages/admin_view/TrackRoutes";
import PaypalSuccess from "./pages/shopping_view/PaypalSuccess";

function App() {
  const { isAuthenticated, user, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  
  
  useEffect(() => {
    dispatch(checkAuthAction());
  }, [dispatch, isAuthenticated]);

  if(isLoading) return <PageLoader/>;
  console.log(isLoading, user);

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
      {/* <Route
          path="/"
          element={
            <Check_Auth
              isAuthenticated={isAuthenticated}
              user={user}
            ></Check_Auth>
          }
        /> */}
        <Route
          path="/"
          element={
            <Check_Auth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </Check_Auth>
          }
        >
          <Route path="auth/login" element={<AuthLogin />} />
          <Route path="auth/register" element={<AuthRegister />} />
          <Route path="auth/get-recovery-link" element={<SendLink/>} />
          <Route path="auth/reset-password/:id" element={<PasswordRecover />} />
        </Route>

        <Route
          path="/admin"
          element={
            <Check_Auth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </Check_Auth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="features" element={<AdminFeatures />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="track-performance" element={<TrackRoutes />} />
        </Route>

        <Route
          path="/shop"
          element={
            <Check_Auth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </Check_Auth>
          }
        >
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="/shop/paypal-return" element={<PaypalReturn />} />
          <Route path="/shop/payment-success" element={<PaypalSuccess />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
        <Route path="/unauth-page" element={<UnAuthPage />} />
      </Routes>
    </div>
  );
}

export default App;
