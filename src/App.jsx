import './App.css';
import { ThemeConfig } from 'flowbite-react';
import ContactUs from './pages/userPages/ContactUs.jsx';
import LoginPage from './pages/userPages/LoginPage.jsx';
import RegPage from './pages/userPages/RegistrationPage.jsx';
import LandPage from './pages/LandingPage.jsx';
import ProductPage from './pages/ProductListPage.jsx';
import ProductDetailsPage from './pages/ProductDetailsPage.jsx';
import { Route, Routes } from 'react-router-dom';
import UserSettings from './pages/userPages/UserSettings';
import GiveReview from './pages/GiveReview.jsx';
import Faqs from './pages/userPages/Faqs.jsx';
import AdminDashboard from './pages/adminPages/adminDashboard.jsx';
import AddProd from './pages/adminPages/AddProduct.jsx';
import Login from './pages/adminPages/LoginAdmin.jsx';
import EditProd from './pages/adminPages/EditProduct.jsx';
import ProdManagement from './pages/adminPages/ProductManagement.jsx';
import AccManagement from './pages/adminPages/AccountManagement.jsx';
import Orders from './pages/adminPages/Orders.jsx';
import PopUpInfoPage from './pages/adminPages/PopUpInfoPage.jsx';
import BazaarOrdering from './pages/adminPages/BazaarOrdering.jsx';
import EditOrder from './pages/adminPages/editOrder.jsx';
import MainLayout from './pages/layouts/MainLayout.jsx';
import AdminAddUser from './pages/adminPages/AdminAddUser.jsx';
import CheckOutPage from './pages/CheckOutPage.jsx';
import ViewOrder from './pages/adminPages/ViewOrder.jsx';
import AdminUserEdit from './pages/adminPages/AdminUserEdit.jsx';
import UserOrderPage from './pages/userPages/UserOrderPage.jsx';
import UserOrderPage2 from './pages/userPages/UserOrderPage2';
import UserViewOrderDetails from './pages/userPages/UserViewOrderDetails.jsx';
import InventoryManagement from './pages/adminPages/InventoryManagement.jsx';
import WalkInOrdering from './pages/adminPages/WalkInOrdering.jsx';
import SalesPage from './pages/adminPages/SalesPage.jsx';
import WalkInOrderTable from './pages/adminPages/WalkInOrdersTable.jsx';
import AdminOrderDetails from './pages/adminPages/AdminOrderDetails.jsx';
import AboutUs from './pages/userPages/AboutUs.jsx';
import NotificationPage from './pages/adminPages/NotificationPage.jsx';
import AdminLayout from './pages/layouts/AdminLayout';

function App() {
  return (
    <>
      <ThemeConfig dark={false} />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/LoginPage" element={<LoginPage />}></Route>
          <Route path="/RegPage" element={<RegPage />}></Route>
          <Route path="/" element={<LandPage />}></Route>
          <Route path="/ProductListPage" element={<ProductPage />}></Route>
          <Route
            path="/ProductDetailsPage/:id"
            element={<ProductDetailsPage />}
          ></Route>
          <Route path="/ContactUs" element={<ContactUs />}></Route>
          <Route path="/GiveReview/:id" element={<GiveReview />}></Route>
          <Route path="*" element={<h1>404 Not Found</h1>}></Route>
          <Route path="/Faqs" element={<Faqs />}></Route>
          <Route path="/CheckOutPage" element={<CheckOutPage />}></Route>
          <Route path="/AboutUs" element={<AboutUs />}></Route>
          <Route path="/UserOrderPage" element={<UserOrderPage />} />
          <Route path="/UserOrderPage2" element={<UserOrderPage2 />} />
          <Route path="/UserSettings" element={<UserSettings />} />
          <Route
            path="/UserViewOrderDetails/:id"
            element={<UserViewOrderDetails />}
          ></Route>
        </Route>

        <Route path="/Admin" element={<AdminLayout />}>
          <Route index element={<Login />} />
          <Route path="DashBoard" element={<AdminDashboard />} />
          <Route path="AddProduct" element={<AddProd />} />
          <Route path="EditProduct/:id" element={<EditProd />} />
          <Route path="ProductManagement" element={<ProdManagement />} />
          <Route path="AccountManagement" element={<AccManagement />} />
          <Route path="Orders" element={<Orders />} />
          <Route path="AdminOrderDetails/:id" element={<AdminOrderDetails />} />
          <Route path="PopUpInfoPage" element={<PopUpInfoPage />} />
          <Route path="BazaarOrdering" element={<BazaarOrdering />} />
          <Route path="EditOrder" element={<EditOrder />} />
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
        </Route>
      </Routes>
    </>
  );
}

export default App;
