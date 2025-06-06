import NewSideBar from "../../components/newSideBar";

function SalesPage() {
  return (
    <div className="h-screen max-h-full w-screen overflow-x-clip overflow-y-auto bg-[#E2E0E1] grid grid-cols-[0.20fr_0.80fr]">
      <NewSideBar />
      <div className="flex flex-row relative overflow-x-auto bg-[#ffffff] rounded-xl shadow p-6 space-x-6">
        {/* Table */}
        <div className="relative overflow-x-auto border-1 border-[#d3cccc] shadow-md sm:rounded-lg w-full p-5">
          <div className="flex flex-col-2 sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
            <div>
              {/* Filter (Fast-moving, slow-moving items)*/}
              <button
                id="dropdownRadioButton"
                data-dropdown-toggle="dropdownRadio"
                className="inline-flex items-center mr-3 text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600"
                type="button"
              >
                <svg
                  className="w-3 h-3 text-gray-500 dark:text-gray-400 me-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
                </svg>
                Filter
                <svg
                  className="w-2.5 h-2.5 ms-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              {/* Last 30 days */}
              <button
                id="dropdownRadioButton"
                data-dropdown-toggle="dropdownRadio"
                className="inline-flex items-center text-gray-800 border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600"
                type="button"
              >
                <svg
                  className="w-3 h-3 text-gray-500 dark:text-gray-400 me-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
                </svg>
                Last 30 days
                <svg
                  className="w-2.5 h-2.5 ms-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
            </div>

            {/* Search button */}
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>
            <div className="relative border-1 border-gray-100 sm:rounded-lg">
              <div className="absolute inset-y-0 left-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              <input
                type="text"
                id="table-search"
                className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for items"
              />
            </div>
          </div>

          {/* TABLE LIST */}
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs round text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-[#ffffff]">
              <tr>
                <th scope="col" className="px-8 py-3">
                  Product ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Item ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Stock Level
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  ALAS001
                </th>
                <td className="px-6 py-4">Catch 23</td>
                <td className="px-6 py-4">400.00</td>
                <td className="px-6 py-4">50x</td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-[#6d99e6] hover:underline"
                  >
                    Good
                  </a>
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  ALAS002
                </th>
                <td className="px-6 py-4">The Ballad Q</td>
                <td className="px-6 py-4">400.00</td>
                <td className="px-6 py-4">50x</td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-[#6d99e6] hover:underline"
                  >
                    Good
                  </a>
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  ALAS003
                </th>
                <td className="px-6 py-4">Le Blanc</td>
                <td className="px-6 py-4">400.00</td>
                <td className="px-6 py-4">50x</td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-[#6f6d6d] hover:underline"
                  >
                    Out of stock
                  </a>
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  ALAS004
                </th>
                <td className="px-6 py-4">Zero Blitz</td>
                <td className="px-6 py-4">400.00</td>
                <td className="px-6 py-4">50x</td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-[#d86262] hover:underline"
                  >
                    Low
                  </a>
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  ALAS004
                </th>
                <td className="px-6 py-4">Zero Blitz</td>
                <td className="px-6 py-4">400.00</td>
                <td className="px-6 py-4">50x</td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-[#d86262] hover:underline"
                  >
                    Low
                  </a>
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  ALAS004
                </th>
                <td className="px-6 py-4">Zero Blitz</td>
                <td className="px-6 py-4">400.00</td>
                <td className="px-6 py-4">50x</td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-[#d86262] hover:underline"
                  >
                    Low
                  </a>
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  ALAS004
                </th>
                <td className="px-6 py-4">Zero Blitz</td>
                <td className="px-6 py-4">400.00</td>
                <td className="px-6 py-4">50x</td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-[#d86262] hover:underline"
                  >
                    Low
                  </a>
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  ALAS004
                </th>
                <td className="px-6 py-4">Zero Blitz</td>
                <td className="px-6 py-4">400.00</td>
                <td className="px-6 py-4">50x</td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-[#d86262] hover:underline"
                  >
                    Low
                  </a>
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  ALAS004
                </th>
                <td className="px-6 py-4">Zero Blitz</td>
                <td className="px-6 py-4">400.00</td>
                <td className="px-6 py-4">50x</td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-[#d86262] hover:underline"
                  >
                    Low
                  </a>
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  ALAS004
                </th>
                <td className="px-6 py-4">Zero Blitz</td>
                <td className="px-6 py-4">400.00</td>
                <td className="px-6 py-4">50x</td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-[#d86262] hover:underline"
                  >
                    Low
                  </a>
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  ALAS004
                </th>
                <td className="px-6 py-4">Zero Blitz</td>
                <td className="px-6 py-4">400.00</td>
                <td className="px-6 py-4">50x</td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-[#d86262] hover:underline"
                  >
                    Low
                  </a>
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  ALAS004
                </th>
                <td className="px-6 py-4">Zero Blitz</td>
                <td className="px-6 py-4">400.00</td>
                <td className="px-6 py-4">50x</td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-[#d86262] hover:underline"
                  >
                    Low
                  </a>
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  ALAS004
                </th>
                <td className="px-6 py-4">Zero Blitz</td>
                <td className="px-6 py-4">400.00</td>
                <td className="px-6 py-4">50x</td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-[#d86262] hover:underline"
                  >
                    Low
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SalesPage;
