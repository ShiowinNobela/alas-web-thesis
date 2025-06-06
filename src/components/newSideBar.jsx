import DBlogo from "../components/images/logo-alas1.jpg";
import { Link } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { FaBox } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { MdOutlinePointOfSale } from "react-icons/md";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { useLocation } from "react-router-dom";
import { AiOutlineUser, AiOutlineUnorderedList } from "react-icons/ai";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";

function NewSideBar() {
  const location = useLocation();
  const getNavItemClass = (path) => {
    const isActive = location.pathname === path;
    return `flex items-center p-2 pb-4 pt-4 text-base font-normal rounded-lg
    ${
      isActive ? "bg-secondary text-black" : "text-white hover:bg-secondary/50"
    } 
    group cursor-pointer`;
  };

  const getIconClass = (path) =>
    `${
      location.pathname === path ? "text-black" : "text-white"
    } mx-3 h-[30px] w-[30px]`;

  return (
    <>
      <div className="h-screen w-10% bg-[#121b2c] border-r-2 border-[#122661]">
        {/* <p className='text-white text-3xl font-sans'>Alas Delis and Spices</p> */}
        <div className="grid grid-cols-[0.3fr_0.7fr] gap-3 ml-3 m-3">
          <img src={DBlogo} alt="" />
        </div>
        <div>
          <ul>
            <Link to="/Admin/DashBoard">
              <li className={getNavItemClass("/Admin/DashBoard")}>
                <LuLayoutDashboard className="mx-3 h-[30px] w-[30px]" />
                <span className="flex-1 ml-3 text-left whitespace-nowrap">
                  Dashboard
                </span>
              </li>
            </Link>
            <Link to="/Admin/WalkInOrdering">
              <li className={getNavItemClass("/Admin/WalkInOrdering")}>
                <MdOutlineShoppingCartCheckout className={getIconClass("/Admin/WalkInOrdering")} />
                <span className="flex-1 ml-3 text-left whitespace-nowrap">
                  Walk In Ordering
                </span>
              </li>
            </Link>
            <Link to="/Admin/WalkInOrdersTable">
              <li className={getNavItemClass("/Admin/WalkInOrdersTable")}>
                <ShoppingBasketIcon className={getIconClass("/Admin/WalkInOrdersTable")} />
                <span className="flex-1 ml-3 text-left whitespace-nowrap">
                  Walk In Ordering
                </span>
              </li>
            </Link>

            <Link to="/Admin/AccountManagement">
              <li className={getNavItemClass("/Admin/AccountManagement")}>
                <AiOutlineUser
                  className={getIconClass("/Admin/AccountManagement")}
                />
                <span className="flex-1 ml-3 text-left whitespace-nowrap">
                  User Management
                </span>
              </li>
            </Link>

            <Link to="/Admin/Orders">
              <li className={getNavItemClass("/Admin/Orders")}>
                <FaBox
                  className={`${getIconClass(
                    "/Admin/Orders"
                  )} ml-4 h-[25px] w-[25px]`}
                />
                <span className="flex-1 ml-2 text-left whitespace-nowrap">
                  Orders Management
                </span>
              </li>
            </Link>

            <Link to="/Admin/ProductManagement">
              <li className={getNavItemClass("/Admin/ProductManagement")}>
                <AiOutlineUnorderedList
                  className={getIconClass("/Admin/ProductManagement")}
                />
                <span className="flex-1 ml-3 text-left whitespace-nowrap">
                  Product Management
                </span>
              </li>
            </Link>

            <Link to="/Admin/InventoryManagement">
              <li className={getNavItemClass("/Admin/InventoryManagement")}>
                <AiFillProduct
                  className={getIconClass("/Admin/InventoryManagement")}
                />
                <span className="flex-1 ml-3 text-left whitespace-nowrap">
                  Inventory Management
                </span>
              </li>
            </Link>

            <Link to="/Admin/SalesPage">
              <li className={getNavItemClass("/Admin/SalesPage")}>
                <MdOutlinePointOfSale
                  className={getIconClass("/Admin/SalesPage")}
                />
                <span className="flex-1 ml-3 text-left whitespace-nowrap">
                  Sales Summary
                </span>
              </li>
            </Link>

            <li
              className="flex items-center p-2 pb-4 pt-4 text-base font-normal rounded-lg text-white hover:bg-primary group cursor-pointer"
              onClick={() => {
                window.localStorage.removeItem("user");
                window.location.href = "/LoginPage";
              }}
            >
              <IoIosLogOut className="mx-3 h-[30px] w-[30px]" />
              <span className="flex-1 ml-3 text-left whitespace-nowrap">
                Logout
              </span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default NewSideBar;
