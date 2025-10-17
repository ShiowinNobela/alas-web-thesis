// React & Router
import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';

// Layouts
import MainLayout from './pages/layouts/MainLayout.jsx';
const AdminLayout = lazy(() => import('./pages/layouts/AdminLayout.jsx'));
const ProductListLayout = lazy(() => import('./pages/layouts/ProductListLayout.jsx'));
import LoadingFallback from './pages/layouts/LoadingFallback';

// Utilities
import ScrollToTop from './utils/ScrollToTop';
import RoleBasedRoute from './components/layout/RoleBasedRoute';
import { Toaster } from 'sonner';

// User Pages
import LandPage from './pages/home/LandingPage.jsx';
import ProductPage from './pages/userPages/ProductListPage.jsx';
import AdminPermissionsProvider from './provider/StaffPermissionProvider.jsx';
import PermissionRoute from './pages/layouts/PermissionRoute.jsx';
import UnauthorizedPage from './pages/userPages/UnauthorizedPage.jsx';
const LoginPage = lazy(() => import('./pages/userPages/LoginPage.jsx'));
const UserDashboard = lazy(() => import('./pages/userPages/UserDashboard.jsx'));
const ContactUs = lazy(() => import('./pages/userPages/ContactUs.jsx'));
const AboutUs = lazy(() => import('./pages/userPages/AboutUs.jsx'));
const RegPage = lazy(() => import('./pages/userPages/RegistrationPage.jsx'));
const ProductDetailsPage = lazy(() => import('./pages/userPages/ProductDetailsPage.jsx'));
const UserSettings = lazy(() => import('./pages/userPages/UserSettings.jsx'));
const GiveReview = lazy(() => import('./pages/userPages/GiveReview.jsx'));
const Faqs = lazy(() => import('./pages/userPages/Faqs.jsx'));
const UserOrderPage = lazy(() => import('./pages/userPages/UserOrderPage.jsx'));
const AfterCheckOutPage = lazy(() => import('./pages/userPages/AfterCheckOutPage.jsx'));
const UserViewOrderDetails = lazy(() => import('./pages/userPages/UserViewOrderDetails.jsx'));
const NotFoundPage = lazy(() => import('./pages/userPages/NotFoundPage.jsx'));
const CheckOutPage = lazy(() => import('./pages/userPages/CheckOutPage.jsx'));
const VerifyEmailPage = lazy(() => import('./pages/userPages/VerifyEmailPage.jsx'));
const ReviewPage = lazy(() => import('./pages/userPages/ReviewPage.jsx'));
const ForgotPasswordPage = lazy(() => import('./pages/userPages/ForgotPasswordPage.jsx'));
const TermsAndConditions = lazy(() => import('./pages/userPages/TermsAndConditions.jsx'));
const PrivacyPolicy = lazy(() => import('./pages/userPages/PrivacyPolicy.jsx'));

// Admin Pages
const AdminDashboard = lazy(() => import('./pages/adminPages/AdminDashboard.jsx'));
const AddProd = lazy(() => import('./pages/adminPages/AddProduct.jsx'));
const EditProd = lazy(() => import('./pages/adminPages/EditProduct.jsx'));
const ProdManagement = lazy(() => import('./pages/adminPages/ProductManagement.jsx'));
const AccManagement = lazy(() => import('./pages/adminPages/AccountManagement.jsx'));
const AdminOrderList = lazy(() => import('./pages/adminPages/AdminOrderList.jsx'));
const InventoryManagement = lazy(() => import('./pages/adminPages/InventoryManagement.jsx'));
const WalkInOrdering = lazy(() => import('./pages/adminPages/WalkInOrdering.jsx'));
const SalesPage = lazy(() => import('./pages/adminPages/SalesPage.jsx'));
const WalkInOrderTable = lazy(() => import('./pages/adminPages/WalkInOrdersTable.jsx'));
const AdminOrderDetails = lazy(() => import('./pages/adminPages/AdminOrderDetails.jsx'));
const NotificationPage = lazy(() => import('./pages/adminPages/NotificationPage.jsx'));
const Notifs = lazy(() => import('./pages/adminPages/Notifs.jsx'));
const PromotionManagement = lazy(() => import('./pages/adminPages/PromotionManagement.jsx'));
const ModerationPage = lazy(() => import('./pages/adminPages/ModerationPage.jsx'));

function App() {
  return (
    <>
      <ScrollToTop />
      <Toaster
        toastOptions={{
          classNames: { toast: '!rounded-2xl', title: '!text-gray-800' },
        }}
        richColors
        visibleToasts={1}
        closeButton
      />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<LandPage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/register" element={<RegPage />}></Route>
            <Route path="/product/:id" element={<ProductDetailsPage />}></Route>
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/faq" element={<Faqs />}></Route>
            <Route path="/users/verify-email" element={<VerifyEmailPage />}></Route>
            <Route path="/forgot-password" element={<ForgotPasswordPage />}></Route>
            <Route path="/terms-and-conditions" element={<TermsAndConditions />}></Route>
            <Route path="/privacy-policy" element={<PrivacyPolicy />}></Route>

            {/* Protected user routes */}
            <Route element={<RoleBasedRoute allowedRoles={['customer']} />}>
              <Route path="/user/dashboard" element={<UserDashboard />} />
              <Route path="/user/review/:id" element={<GiveReview />}></Route>
              <Route path="/user/checkout" element={<CheckOutPage />}></Route>
              <Route path="/user/after-checkout/:id" element={<AfterCheckOutPage />} />
              <Route path="/user/orders" element={<UserOrderPage />} />
              <Route path="/user/profile" element={<UserSettings />} />
              <Route path="/users/orders/:id" element={<UserViewOrderDetails />} />
              <Route path="/users/reviews" element={<ReviewPage />} />
            </Route>
          </Route>

          <Route element={<ProductListLayout />}>
            <Route path="/menu" element={<ProductPage />}></Route>
          </Route>

          <Route element={<RoleBasedRoute allowedRoles={['admin', 'staff']} />}>
            <Route
              path="/admin"
              element={
                <AdminPermissionsProvider>
                  <AdminLayout />
                </AdminPermissionsProvider>
              }
            >
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route element={<PermissionRoute adminOnly />}>
                <Route path="add-product" element={<AddProd />} />
                <Route path="edit-product/:id" element={<EditProd />} />
                <Route path="products" element={<ProdManagement />} />
                <Route path="account-management" element={<AccManagement />} />
                <Route path="logs" element={<NotificationPage />} />
                <Route path="Notifs" element={<Notifs />} />
                <Route path="sales" element={<SalesPage />} />
              </Route>

              <Route element={<PermissionRoute permission="manage_orders" />}>
                <Route path="order" element={<AdminOrderList />} />
                <Route path="order/:id" element={<AdminOrderDetails />} />
              </Route>

              <Route element={<PermissionRoute permission="view_inventory" />}>
                <Route path="inventory" element={<InventoryManagement />}></Route>
              </Route>

              <Route element={<PermissionRoute permission="view_walkin" />}>
                <Route path="walk-in-orders" element={<WalkInOrderTable />} />
              </Route>

              <Route element={<PermissionRoute permission="create_walkin" />}>
                <Route path="create-walk-in" element={<WalkInOrdering />} />
              </Route>

              <Route element={<PermissionRoute permission="manage_promotions" />}>
                <Route path="promotion/management" element={<PromotionManagement />} />
              </Route>

              <Route path="moderation" element={<ModerationPage />} />
            </Route>
          </Route>

          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
