import Navbar from "../components/navbar";
import { Outlet } from "react-router";

function MainLayout() {
  return (
    <div className="grid grid-rows-[auto_1fr] min-h-full w-full">
      <Navbar />
      <main className="overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
