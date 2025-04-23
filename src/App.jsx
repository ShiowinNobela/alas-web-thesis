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

 

function App() {

  return (
    <>
    <NavBar/>
    <Routes>
      <Route path='/LoginPage' element={ <LoginPage/> }></Route>
      <Route path='/RegPage' element={ <RegPage/> }></Route>
      <Route path='/' element={<LandPage/>}></Route>
      <Route path='/ProductListPage' element={<ProductPage/>}></Route> 
      <Route path='/ProductDetailsPage/:id' element={<ProductDetailsPage/>} ></Route>
      <Route path ='/ContactUs' element={<ContactUs/>}></Route>
      <Route path='/UserSettings' element={<UserSettings/>}></Route>
      <Route path='/GiveReview' element={<GiveReview/>}></Route>
      </Routes>
     
    </>
  )
}

export default App
