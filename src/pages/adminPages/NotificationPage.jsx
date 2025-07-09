import NewSideBar from '../../components/newSideBar'
import { IoIosNotifications } from "react-icons/io";

function NotificationPage() {
  return (
    <div className="h-screen max-h-full w-screen overflow-x-clip overflow-y-auto bg-white grid grid-cols-[0.20fr_0.80fr]">
      <NewSideBar />
      <div className="flex flex-col h-full overflow-x-auto bg-white p-6 justify-center items-center">
        
        <div className='flex flex-row justify-between ml-5 mr-5 p-5 bg-gray-300 rounded-t-2xl w-7/8'>
          <div className='flex flex-row items-center justify-center h-full'>
            <IoIosNotifications className="text-4xl text-secondary " />
            <h1 className="text-2xl font-bold text-secondary">Notifications</h1>
          </div>

          <div>
            <input type="text" className='ml-2 px-4 py-2 bg-white text-black rounded shadow-admin shadow-md' />
            <button className="ml-2 px-4 py-2 bg-primary text-white rounded">Search</button>
          </div>
        </div>
        
        <div className='flex flex-col items-center justify-center h-7/8 w-7/8 bg-gray-50 rounded-b-2xl p-5 shadow-admin shadow-xs'>
          // Placeholder for notifications
        </div>
      </div>
    </div>
  )
}

export default NotificationPage