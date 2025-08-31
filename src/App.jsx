import './App.css';

// React & Router
import { Route, Routes } from 'react-router-dom';

// Layouts
import MainLayout from './pages/layouts/MainLayout.jsx';
import AdminLayout from './pages/layouts/AdminLayout.jsx';

// Utilities
import ScrollToTop from './utils/ScrollToTop';

// User Pages
import LandPage from './pages/home/LandingPage.jsx';
import ContactUs from './pages/userPages/ContactUs.jsx';
import LoginPage from './pages/userPages/LoginPage.jsx';
import RegPage from './pages/userPages/RegistrationPage.jsx';
import ProductPage from './pages/userPages/ProductListPage.jsx';
import ProductDetailsPage from './pages/userPages/ProductDetailsPage.jsx';
import UserSettings from './pages/userPages/UserSettings.jsx';
import GiveReview from './pages/userPages/GiveReview.jsx';
import Faqs from './pages/userPages/Faqs.jsx';
import UserOrderPage from './pages/userPages/UserOrderPage.jsx';
import UserOrderPage2 from './pages/userPages/UserOrderPage2.jsx';
import UserViewOrderDetails from './pages/userPages/UserViewOrderDetails.jsx';
import AboutUs from './pages/userPages/AboutUs.jsx';
import NotFoundPage from './pages/userPages/NotFoundPage.jsx';
import LoadingPage from './pages/userPages/LoadingPage.jsx'; // ← Add this import

// Admin Pages
import AdminDashboard from './pages/adminPages/adminDashboard.jsx';
import AddProd from './pages/adminPages/AddProduct.jsx';
import EditProd from './pages/adminPages/EditProduct.jsx';
import ProdManagement from './pages/adminPages/ProductManagement.jsx';
import AccManagement from './pages/adminPages/AccountManagement.jsx';
import Orders from './pages/adminPages/Orders.jsx';
import PopUpInfoPage from './pages/adminPages/PopUpInfoPage.jsx';
import AdminAddUser from './pages/adminPages/AdminAddUser.jsx';
import ViewOrder from './pages/adminPages/ViewOrder.jsx';
import AdminUserEdit from './pages/adminPages/AdminUserEdit.jsx';
import InventoryManagement from './pages/adminPages/InventoryManagement.jsx';
import WalkInOrdering from './pages/adminPages/WalkInOrdering.jsx';
import SalesPage from './pages/adminPages/SalesPage.jsx';
import WalkInOrderTable from './pages/adminPages/WalkInOrdersTable.jsx';
import AdminOrderDetails from './pages/adminPages/AdminOrderDetails.jsx';
import NotificationPage from './pages/adminPages/NotificationPage.jsx';
import Notifs from './pages/adminPages/Notifs.jsx';

// Checkout
import CheckOutPage from './pages/userPages/CheckOutPage.jsx';
import PrivateRoute from './components/layout/PrivateRoute';
import ProductListLayout from './pages/layouts/ProductListLayout';

function App() {
  return (
    <>
      <ScrollToTop />
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

          <Route path="/loading" element={<LoadingPage />}></Route>

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
