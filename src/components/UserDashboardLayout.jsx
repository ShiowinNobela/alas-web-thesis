import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import UserSideBar from "./../pages/UserSideBar";

export default function UserDashboardLayout() {
  return (
    <div className="min-h-full flex flex-col">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 shrink-0 border-r border-gray-300 bg-white overflow-y-auto">
          <UserSideBar />
        </aside>

        <div className="flex-1 flex flex-col overflow-y-auto bg-gray-100">
          <main className="flex-1 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
