import Navbar from '../components/navbar';
import { Outlet } from 'react-router';

function MainLayout() {
  return (
    <div className="grid min-h-screen w-full grid-rows-[auto_1fr]">
      <Navbar />
      <main className="bg overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
