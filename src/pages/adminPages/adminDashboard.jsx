import { Card } from "flowbite-react";
import { useState, useEffect } from "react";
import axios from "axios";
import NewSideBar from '../../components/newSideBar'
import AdminProfile from '../../components/Chinges/AdminProfile';

function adminDashboard() {
  const [values, setValues] = useState([]);

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem("user"));
    axios
      .get("/api/adminOrder", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        setValues(response.data.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  return (
    <>
     <div className='h-screen max-h-full w-screen overflow-x-clip overflow-y-auto bg-[#E2E0E1] grid grid-cols-[0.20fr_0.80fr]'>
    <NewSideBar/>
    <div className='min-h-full w-100% ml-5 flex flex-col gap-5 overflow-auto'>
        <div className='w-full pt-3 pr-7 flex justify-end'>
              <AdminProfile />
        </div>
        <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div class="flex flex-col items-center pb-10">
                <img class="w-24 h-24 mb-3 rounded-full shadow-lg" src="/docs/images/people/profile-picture-3.jpg" alt="Bonnie image"/>
                <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">Bonnie Green</h5>
                <span class="text-sm text-gray-500 dark:text-gray-400">Visual Designer</span>
                <div class="flex mt-4 md:mt-6">
                    <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add friend</a>
                    <a href="#" class="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Message</a>
                </div>
            </div>

            <Card className="max-w-sm">
                          
                            <h5 className="text-2xl font-bold tracking-tight text-white">
                              Total Orders
                            </h5>
                            <div>
                             
                                <div className="p-1 bg-[#d3723a] text-l font-medium mt-1 border-1 border-[#894a25] drop-shadow-sm drop-shadow-black/60 w-full h-[30px] rounded-2xl flex justify-center cursor-pointer">
                                  <p>Edit</p>
                                </div>
                   
                            </div>
                          </Card>
        </div>
    </div>
    </div>
    </>
  );
}

export default adminDashboard;
