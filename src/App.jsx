import React  from 'react'
import './App.css'
import NavBar from './components/navbar.jsx'
import ContactUs from './pages/ContactUs.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegPage from './pages/RegistrationPage.jsx'
import LandPage from './pages/LandingPage.jsx'
import ProductPage from './pages/ProductListPage.jsx'
import ProductDetailsPage from './pages/ProductDetailsPage.jsx'
import { Route, Routes } from 'react-router-dom'
import UserSettings from './pages/UserSettings.jsx'
import GiveReview from './pages/GiveReview.jsx'
import Faqs from './pages/Faqs.jsx'
import AdminDashboard from './pages/adminPages/adminDashboard.jsx'
import AddProd from './pages/adminPages/AddProduct.jsx'
import Login from './pages/adminPages/LoginAdmin.jsx'
import EditProd from './pages/adminPages/EditProduct.jsx'
import ProdManagement from './pages/adminPages/ProductManagement.jsx'
import AccManagement from './pages/adminPages/AccountManagement.jsx'
import Orders from './pages/adminPages/Orders.jsx'
import PopUpInfoPage from './pages/adminPages/PopUpInfoPage.jsx'
import BazaarOrdering from './pages/adminPages/BazaarOrdering.jsx'
import EditOrder from './pages/adminPages/editOrder.jsx'
import MainLayout from './pages/MainLayout.jsx'
import AdminAddUser from './pages/adminPages/AdminAddUser.jsx'
import CheckOutPage from './pages/CheckOutPage.jsx'
import ViewOrder from './pages/adminPages/ViewOrder.jsx'
import AdminUserEdit from './pages/adminPages/AdminUserEdit.jsx'
import UserOrderPage from './pages/UserOrderPage.jsx'
import UserViewOrderDetails from './pages/UserViewOrderDetails.jsx'
import AboutUs from './pages/AbousUs.jsx'
function App() {

  return (
    <>
    
    <Routes>
      <Route element={<MainLayout/>}>
      <Route path='/LoginPage' element={ <LoginPage/> }></Route>
      <Route path='/RegPage' element={ <RegPage/> }></Route>
      <Route path='/' element={<LandPage/>}></Route>
      <Route path='/ProductListPage' element={<ProductPage/>}></Route> 
      <Route path='/ProductDetailsPage/:id' element={<ProductDetailsPage/>} ></Route>
      <Route path ='/ContactUs' element={<ContactUs/>}></Route>
      <Route path='/UserSettings' element={<UserSettings/>}></Route>
      <Route path='/GiveReview' element={<GiveReview/>}></Route>
      <Route path='*' element={<h1>404 Not Found</h1>}></Route>
      <Route path='/Faqs' element={<Faqs/>}></Route>
      <Route path='/CheckOutPage' element={<CheckOutPage/>}></Route>
      <Route path='/UserOrderPage' element={<UserOrderPage/>}></Route>
      <Route path='/UserViewOrderDetails/:id' element={<UserViewOrderDetails/>}></Route>
      <Route path='/AboutUs' element={<AboutUs/>}></Route>
      
      </Route>

      <Route path='/Admin'>
      <Route index element={<Login/>}></Route>
      <Route path='DashBoard' element={ <AdminDashboard/> }></Route>
      <Route path='AddProduct' element={<AddProd/>} ></Route>
      <Route path='EditProduct/:id' element={<EditProd/>} ></Route>
      <Route path='ProductManagement' element={<ProdManagement/>} ></Route>
      <Route path='AccountManagement' element={<AccManagement/>} ></Route>
      <Route path='Orders' element={<Orders/>} ></Route>
      <Route path='PopUpInfoPage' element={<PopUpInfoPage/>} ></Route>
      <Route path='BazaarOrdering' element={<BazaarOrdering/>} ></Route>
      <Route path='EditOrder' element={<EditOrder/>} ></Route>
      <Route path='AdminAddUser' element={<AdminAddUser/>} ></Route>
      <Route path='ViewOrder/:id' element={<ViewOrder/>}></Route>
      <Route path='AdminUserEdit/:id' element={<AdminUserEdit/>} ></Route>
      </Route>
    </Routes>
     
    </>
  )
}

export default App
