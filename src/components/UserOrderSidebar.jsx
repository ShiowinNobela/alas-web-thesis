import { IoIosNotificationsOutline } from "react-icons/io";
import { FaBoxArchive } from "react-icons/fa6";
import { CiBoxList } from "react-icons/ci";
import { RiUserSettingsFill } from "react-icons/ri";
import { useNavigate} from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";


function UserOrderSidebar({setActiveSwitch}) {

  const navigate = useNavigate();
  return (
    <>
    <div className="h-screen w-10% bg-rose-300/50 border-r-1">
        <ul>
            <li className="flex items-center p-2 pb-4 pt-5 text-base font-normal text-black hover:bg-rose-300 group cursor-pointer"
              onClick={() => navigate("/UserSettings") }
                >
                            <RiUserSettingsFill className=" mx-3 h-[30px] w-[30px]" />
                            <span className="flex-1 ml-3 text-left whitespace-nowrap">
                              User Settings
                            </span>
                          </li>
            <li className="flex items-center p-2 pb-4 pt-5 text-base font-normal text-black hover:bg-rose-300 group cursor-pointer"
                onClick={() => { 
                  navigate("/UserOrderPage");
                  setActiveSwitch("orderList");
                  }}>
                            <CiBoxList className=" mx-3 h-[30px] w-[30px]" />
                            <span className="flex-1 ml-3 text-left whitespace-nowrap">
                              Order List
                            </span>
                          </li>
            <li className="flex items-center p-2 pb-4 pt-5 text-base font-normal text-black hover:bg-rose-300 group cursor-pointer">
                            <FaBoxArchive className=" mx-3 h-[30px] w-[30px]" />
                            <span className="flex-1 ml-3 text-left whitespace-nowrap">
                              Order Archive
                            </span>
                          </li>
            <li className="flex items-center p-2 pb-4 pt-5 text-base font-normal text-black hover:bg-rose-300 group cursor-pointer"
               onClick={() => {
                navigate("/UserOrderPage", { state: { tab: "notif" } })
                setActiveSwitch("notif")
               }} >

                            <IoIosNotificationsOutline className=" mx-3 h-[30px] w-[30px]" />
                            <span className="flex-1 ml-3 text-left whitespace-nowrap">
                              Notifications
                            </span>
            </li>
            
            <li className="flex items-center p-2 pb-4 pt-5 text-base font-normal text-black hover:bg-rose-300 group cursor-pointer"
               onClick={() => {
                window.localStorage.removeItem("user");
                window.location.href = "/LoginPage";
              }} >

                            <IoIosLogOut className=" mx-3 h-[30px] w-[30px]" />
                            <span className="flex-1 ml-3 text-left whitespace-nowrap">
                              Logout
                            </span>
            </li>

            
            
                        
        </ul>
    </div>
    </>
  )
}

export default UserOrderSidebar