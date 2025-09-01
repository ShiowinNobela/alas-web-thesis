import './App.css';

// React & Router
import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';

// Layouts
import MainLayout from './pages/layouts/MainLayout.jsx';
import AdminLayout from './pages/layouts/AdminLayout.jsx';
import ProductListLayout from './pages/layouts/ProductListLayout';

// Utilities
import ScrollToTop from './utils/ScrollToTop';
import PrivateRoute from './components/layout/PrivateRoute';

// User Pages
import LandPage from './pages/home/LandingPage.jsx';
const ContactUs = lazy(() => import('./pages/userPages/ContactUs.jsx'));
import LoginPage from './pages/userPages/LoginPage.jsx';
import RegPage from './pages/userPages/RegistrationPage.jsx';
const ProductPage = lazy(() => import('./pages/userPages/ProductListPage.jsx'));
const ProductDetailsPage = lazy(
  () => import('./pages/userPages/ProductDetailsPage.jsx')
);
const UserSettings = lazy(() => import('./pages/userPages/UserSettings.jsx'));
const GiveReview = lazy(() => import('./pages/userPages/GiveReview.jsx'));
const Faqs = lazy(() => import('./pages/userPages/Faqs.jsx'));
const UserOrderPage = lazy(() => import('./pages/userPages/UserOrderPage.jsx'));
const UserOrderPage2 = lazy(
  () => import('./pages/userPages/UserOrderPage2.jsx')
);
const UserViewOrderDetails = lazy(
  () => import('./pages/userPages/UserViewOrderDetails.jsx')
);
import AboutUs from './pages/userPages/AboutUs.jsx';
const NotFoundPage = lazy(() => import('./pages/userPages/NotFoundPage.jsx'));
const CheckOutPage = lazy(() => import('./pages/userPages/CheckOutPage.jsx'));

// Admin Pages
const AdminDashboard = lazy(
  () => import('./pages/adminPages/adminDashboard.jsx')
);
const AddProd = lazy(() => import('./pages/adminPages/AddProduct.jsx'));
const EditProd = lazy(() => import('./pages/adminPages/EditProduct.jsx'));
const ProdManagement = lazy(
  () => import('./pages/adminPages/ProductManagement.jsx')
);
const AccManagement = lazy(
  () => import('./pages/adminPages/AccountManagement.jsx')
);
const Orders = lazy(() => import('./pages/adminPages/Orders.jsx'));
const PopUpInfoPage = lazy(
  () => import('./pages/adminPages/PopUpInfoPage.jsx')
);
const AdminAddUser = lazy(() => import('./pages/adminPages/AdminAddUser.jsx'));
const ViewOrder = lazy(() => import('./pages/adminPages/ViewOrder.jsx'));
const AdminUserEdit = lazy(
  () => import('./pages/adminPages/AdminUserEdit.jsx')
);
const InventoryManagement = lazy(
  () => import('./pages/adminPages/InventoryManagement.jsx')
);
const WalkInOrdering = lazy(
  () => import('./pages/adminPages/WalkInOrdering.jsx')
);
const SalesPage = lazy(() => import('./pages/adminPages/SalesPage.jsx'));
const WalkInOrderTable = lazy(
  () => import('./pages/adminPages/WalkInOrdersTable.jsx')
);
const AdminOrderDetails = lazy(
  () => import('./pages/adminPages/AdminOrderDetails.jsx')
);
const NotificationPage = lazy(
  () => import('./pages/adminPages/NotificationPage.jsx')
);
const Notifs = lazy(() => import('./pages/adminPages/Notifs.jsx'));

function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense
        fallback={<div className="p-4 text-center">Loading...</div>}
      ></Suspense>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/LoginPage" element={<LoginPage />}></Route>
          <Route path="/RegPage" element={<RegPage />}></Route>
          <Route path="/" element={<LandPage />}></Route>
          <Route
            path="/ProductDetailsPage/:id"
            element={<ProductDetailsPage />}
          ></Route>
          <Route path="/ContactUs" element={<ContactUs />}></Route>
          <Route path="/Faqs" element={<Faqs />}></Route>
          <Route path="/AboutUs" element={<AboutUs />}></Route>

          {/* Protected user routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/GiveReview/:id" element={<GiveReview />}></Route>
            <Route path="/CheckOutPage" element={<CheckOutPage />}></Route>
            <Route path="/UserOrderPage" element={<UserOrderPage />} />
            <Route path="/UserOrderPage2" element={<UserOrderPage2 />} />
            <Route path="/UserSettings" element={<UserSettings />} />
            <Route
              path="/UserViewOrderDetails/:id"
              element={<UserViewOrderDetails />}
            />
          </Route>
        </Route>

        <Route element={<ProductListLayout />}>
          <Route path="/ProductListPage" element={<ProductPage />}></Route>
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/Admin" element={<AdminLayout />}>
            <Route path="DashBoard" element={<AdminDashboard />} />
            <Route path="AddProduct" element={<AddProd />} />
            <Route path="EditProduct/:id" element={<EditProd />} />
            <Route path="ProductManagement" element={<ProdManagement />} />
            <Route path="AccountManagement" element={<AccManagement />} />
            <Route path="Orders" element={<Orders />} />
            <Route
              path="AdminOrderDetails/:id"
              element={<AdminOrderDetails />}
            />
            <Route path="PopUpInfoPage" element={<PopUpInfoPage />} />
            <Route path="AdminAddUser" element={<AdminAddUser />} />
            <Route path="ViewOrder/:id" element={<ViewOrder />} />
            <Route path="AdminUserEdit/:id" element={<AdminUserEdit />} />
            <Route
              path="InventoryManagement"
              element={<InventoryManagement />}
            ></Route>
            <Route path="WalkInOrdersTable" element={<WalkInOrderTable />} />
            <Route path="WalkInOrdering" element={<WalkInOrdering />} />
            <Route path="SalesPage" element={<SalesPage />} />
            <Route path="NotificationPage" element={<NotificationPage />} />
            <Route path="Notifs" element={<Notifs />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
