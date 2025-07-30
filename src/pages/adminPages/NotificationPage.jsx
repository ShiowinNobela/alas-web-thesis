import { IoIosNotifications } from 'react-icons/io';

function NotificationPage() {
  return (
    <div className="flex h-full flex-col items-center justify-center overflow-x-auto bg-white p-6">
      <div className="mr-5 ml-5 flex w-7/8 flex-row justify-between rounded-t-2xl bg-gray-300 p-5">
        <div className="flex h-full flex-row items-center justify-center">
          <IoIosNotifications className="text-secondary text-4xl" />
          <h1 className="text-secondary text-2xl font-bold">Notifications</h1>
        </div>

        <div>
          <input
            type="text"
            className="shadow-admin ml-2 rounded bg-white px-4 py-2 text-black shadow-md"
          />
          <button className="bg-primary ml-2 rounded px-4 py-2 text-white">
            Search
          </button>
        </div>
      </div>

      <div className="shadow-admin flex h-7/8 w-7/8 flex-col items-center justify-center rounded-b-2xl bg-gray-50 p-5 shadow-xs">
        {/* Placeholder for notifications */}
      </div>
    </div>
  );
}

export default NotificationPage;
