import Navbar from '../components/navbar'
import { Outlet } from "react-router";

function MainLayout() {
  return (
    <div className="grid grid-rows-[0.1fr_9fr] h-screen w-screen">
      <Navbar/>
      <div className="min-h-4/5 w-full">
        <Outlet/>
      </div>
    </div>
  )
}

export default MainLayout