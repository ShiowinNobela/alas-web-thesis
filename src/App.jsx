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
import AfterCheckOutPage from './pages/userPages/AfterCheckOutPage.jsx';
const LoginPage = lazy(() => import('./pages/userPages/LoginPage.jsx'));
const UserDashboard = lazy(() => import('./pages/userPages/UserDashboard.jsx'));
const ProductPage = lazy(() => import('./pages/userPages/ProductListPage.jsx'));
const ContactUs = lazy(() => import('./pages/userPages/ContactUs.jsx'));
const AboutUs = lazy(() => import('./pages/userPages/AboutUs.jsx'));
const RegPage = lazy(() => import('./pages/userPages/RegistrationPage.jsx'));
const ProductDetailsPage = lazy(() => import('./pages/userPages/ProductDetailsPage.jsx'));
const UserSettings = lazy(() => import('./pages/userPages/UserSettings.jsx'));
const GiveReview = lazy(() => import('./pages/userPages/GiveReview.jsx'));
const Faqs = lazy(() => import('./pages/userPages/Faqs.jsx'));
const UserOrderPage = lazy(() => import('./pages/userPages/UserOrderPage.jsx'));
const UserViewOrderDetails = lazy(() => import('./pages/userPages/UserViewOrderDetails.jsx'));
const NotFoundPage = lazy(() => import('./pages/userPages/NotFoundPage.jsx'));
const CheckOutPage = lazy(() => import('./pages/userPages/CheckOutPage.jsx'));
const VerifyEmailPage = lazy(() => import('./pages/userPages/VerifyEmailPage.jsx'));
const ReviewPage = lazy(() => import('./pages/userPages/ReviewPage.jsx'));

// Admin Pages
const AdminDashboard = lazy(() => import('./pages/adminPages/AdminDashboard.jsx'));
const AddProd = lazy(() => import('./pages/adminPages/AddProduct.jsx'));
const EditProd = lazy(() => import('./pages/adminPages/EditProduct.jsx'));
const ProdManagement = lazy(() => import('./pages/adminPages/ProductManagement.jsx'));
const AccManagement = lazy(() => import('./pages/adminPages/AccountManagement.jsx'));
const AdminOrderList = lazy(() => import('./pages/adminPages/AdminOrderList.jsx'));
const PopUpInfoPage = lazy(() => import('./pages/adminPages/PopUpInfoPage.jsx'));
const ViewOrder = lazy(() => import('./pages/adminPages/ViewOrder.jsx'));
const InventoryManagement = lazy(() => import('./pages/adminPages/InventoryManagement.jsx'));
const WalkInOrdering = lazy(() => import('./pages/adminPages/WalkInOrdering.jsx'));
const SalesPage = lazy(() => import('./pages/adminPages/SalesPage.jsx'));
const WalkInOrderTable = lazy(() => import('./pages/adminPages/WalkInOrdersTable.jsx'));
const AdminOrderDetails = lazy(() => import('./pages/adminPages/AdminOrderDetails.jsx'));
const NotificationPage = lazy(() => import('./pages/adminPages/NotificationPage.jsx'));
const Notifs = lazy(() => import('./pages/adminPages/Notifs.jsx'));

function App() {
  return (
    <>
      <ScrollToTop />
      <Toaster
        toastOptions={{
          classNames: { toast: '!rounded-lg', title: '!text-gray-800' },
        }}
        richColors
        visibleToasts={1}
        closeButton
      />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<LandPage />}></Route>
            <Route path="/LoginPage" element={<LoginPage />}></Route>
            <Route path="/RegPage" element={<RegPage />}></Route>
            <Route path="/ProductDetailsPage/:id" element={<ProductDetailsPage />}></Route>
            <Route path="/ContactUs" element={<ContactUs />} />
            <Route path="/Faqs" element={<Faqs />}></Route>
            <Route
              path="/AboutUs"
              element={
                <Suspense fallback={<LoadingFallback />} key="about">
                  <AboutUs />
                </Suspense> // Specific fallback for AboutUs for testing if this is better
              }
            />

            <Route path="/users/verify-email" element={<VerifyEmailPage />}></Route>

            {/* Protected user routes */}
            <Route element={<RoleBasedRoute allowedRoles={['customer']} />}>
              <Route path="/user/dashboard" element={<UserDashboard />} />
              <Route path="/GiveReview/:id" element={<GiveReview />}></Route>
              <Route path="/CheckOutPage" element={<CheckOutPage />}></Route>
              <Route path="/user/after-checkout/:id" element={<AfterCheckOutPage />} />
              <Route path="/UserOrderPage" element={<UserOrderPage />} />
              <Route path="/UserSettings" element={<UserSettings />} />
              <Route path="/users/orders/:id" element={<UserViewOrderDetails />} />
              <Route path="/users/reviews" element={<ReviewPage />} />
            </Route>
          </Route>

          <Route element={<ProductListLayout />}>
            <Route path="/ProductListPage" element={<ProductPage />}></Route>
          </Route>

          <Route element={<RoleBasedRoute allowedRoles={['admin', 'staff']} />}>
            <Route path="/Admin" element={<AdminLayout />}>
              <Route path="DashBoard" element={<AdminDashboard />} />
              <Route path="AddProduct" element={<AddProd />} />
              <Route path="EditProduct/:id" element={<EditProd />} />
              <Route path="ProductManagement" element={<ProdManagement />} />
              <Route path="AccountManagement" element={<AccManagement />} />
              <Route path="Orders" element={<AdminOrderList />} />
              <Route path="AdminOrderDetails/:id" element={<AdminOrderDetails />} />
              <Route path="PopUpInfoPage" element={<PopUpInfoPage />} />
              <Route path="ViewOrder/:id" element={<ViewOrder />} />
              <Route path="InventoryManagement" element={<InventoryManagement />}></Route>
              <Route path="WalkInOrdersTable" element={<WalkInOrderTable />} />
              <Route path="WalkInOrdering" element={<WalkInOrdering />} />
              <Route path="SalesPage" element={<SalesPage />} />
              <Route path="NotificationPage" element={<NotificationPage />} />
              <Route path="Notifs" element={<Notifs />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
