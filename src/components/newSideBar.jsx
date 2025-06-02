import DBlogo from '../components/images/logo-alas1.jpg'
import { Link } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { FaBox } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { AiFillProduct } from "react-icons/ai";
import {
  AiOutlineMoneyCollect,
  AiOutlineUser,
  AiOutlineUnorderedList,
  AiOutlineNotification,
} from "react-icons/ai";
import { LuLayoutDashboard } from "react-icons/lu";

function NewSideBar() {
    return(
        <>
        <div className="h-screen w-10% bg-[#121b2c] border-r-2 border-[#122661]">
            {/* <p className='text-white text-3xl font-sans'>Alas Delis and Spices</p> */}
            <div className='grid grid-cols-[0.3fr_0.7fr] gap-3 ml-3 m-3'>
                <img src={DBlogo} alt="" />
            </div>
            <div>

            <ul>
            <Link to="/Admin/DashBoard">
              <li className="flex items-center p-2 pb-4 pt-4 text-base font-normal rounded-lg text-white hover:bg-blue-950/70 group cursor-pointer">
                <LuLayoutDashboard className=" mx-3 h-[30px] w-[30px]" />{" "}
                <span className="flex-1 ml-3 text-left whitespace-nowrap">
                  Dashboard
                </span>
              </li>
            </Link>
            <Link to="/Admin/AccountManagement">
              <li className="flex items-center p-2 pb-4 pt-4 text-base font-normal rounded-lg text-white hover:bg-blue-950/70 group cursor-pointer">
                <AiOutlineUser className=" mx-3 h-[30px] w-[30px]" />
                <span className="flex-1 ml-3 text-left whitespace-nowrap">
                  User Management
                </span>
              </li>
            </Link>
            <Link to="/Admin/Orders">
              <li className="flex items-center p-2 pb-4 pt-4 text-base font-normal rounded-lg text-white hover:bg-blue-950/70 group cursor-pointer">
                <FaBox className="mx-4 h-[25px] w-[25px]" />{" "}
                <span className="flex-1 ml-2 text-left whitespace-nowrap">
                  Orders
                </span>
              </li>
            </Link>
            <Link to="/Admin/ProductManagement">
              <li className="flex items-center p-2 pb-4 pt-4 text-base font-normal rounded-lg text-white hover:bg-blue-950/70 group cursor-pointer">
                <AiOutlineUnorderedList className=" mx-3 h-[30px] w-[30px]" />
                <span className="flex-1 ml-3 text-left whitespace-nowrap">
                  Product Management
                </span>
              </li>
            </Link>
            <Link to="/Admin/InventoryManagement" >
              <li className="flex items-center p-2 pb-4 pt-4 text-base font-normal rounded-lg text-white hover:bg-blue-950/70 group cursor-pointer">
                <AiFillProduct className=" mx-3 h-[30px] w-[30px]" />
                <span className="flex-1 ml-3 text-left whitespace-nowrap">
                  Inventory Management
                </span>
              </li>
            </Link>
            </ul>
            
            <div
              className="fixed bottom-0 left-0 mb-3"
              onClick={() => {
                window.localStorage.removeItem("user");
                window.location.href = "/LoginPage";
              }}
            >
              <div className="flex items-center p-2 pb-4 pt-4 pr-6 ml-15 text-base  font-normal text-white rounded-lg hover:bg-blue-950/70 group cursor-pointer">
                <IoIosLogOut className=" mx-2 h-[30px] w-[30px]" />{" "}
                <span className="flex-1 ml-1 text-left whitespace-nowrap">
                  {" "}
                  Logout
                </span>
              </div>
            </div>
            </div>
        </div>
        </>
    )

}

export default NewSideBar