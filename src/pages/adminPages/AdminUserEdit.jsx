import NewSideBar from "../../components/newSideBar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";

function AdminUserEdit() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const getRoleId = (roleName) => {
    if (roleName === "admin") return "1";
    if (roleName === "customer") return "2";
    if (roleName === "staff") return "3";
    return "";
  };

  useEffect(() => {
    axios
      .get(`/api/adminUser/${id}`)
      .then((response) => {
        setData(response.data.data);
        console.log("User Data:", response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedData = {
      ...data,
      role_id: getRoleId(data.role_name),
    };

    axios
      .put(`/api/adminUser/${id}`, updatedData)
      .then((response) => {
        console.log("User updated successfully:", response.data);
        toast.success("Edit Successful");
        setTimeout(() => {
          navigate("/Admin/AccountManagement");
        }, 1000);
      })
      .catch((err) => {
        if (err.response && err.response.status === 500) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Unexpected Error Occurred");
        }
      });
  };

  return (
    <div className="h-screen w-screen">
      <Toaster richColors />
      <NewSideBar />
      <div className="h-screen w-screen bg-[#E2E0E1] pl-[256px] flex flex-col items-center">
        <h1 className="py-5 text-3xl font-semibold">Edit User</h1>
        <div className="w-4xl bg-white p-5 rounded-lg shadow-md border-1">
          <form className="flex flex-col" onSubmit={handleUpdate}>
            {[
              { label: "Username", key: "username" },
              { label: "Email", key: "email" },
              { label: "Address", key: "address" },
              { label: "Contact Number", key: "contact_number" },
            ].map(({ label, key }) => (
              <div className="flex flex-row" key={key}>
                <div className="flex flex-col justify-center w-1/4">
                  <p>{label} :</p>
                </div>
                <input
                  type="text"
                  placeholder={label}
                  className="p-3 m-2 border border-black rounded-2xl w-full"
                  value={data[key] || ""}
                  onChange={(e) => setData({ ...data, [key]: e.target.value })}
                  required
                />
              </div>
            ))}

            <div className="flex flex-row mb-5">
              <div className="flex flex-col justify-center w-1/4">
                <p>User Role :</p>
              </div>
              <select
                className="p-3 m-2 border border-black rounded-2xl w-full"
                value={data.role_name || ""}
                onChange={(e) =>
                  setData({ ...data, role_name: e.target.value })
                }
                required
              >
                <option value="admin">admin</option>
                <option value="staff">staff</option>
                <option value="customer">customer</option>
              </select>
            </div>

            <hr className="my-6" />
            <h1 className="text-2xl font-semibold mb-5 text-center">
              Admin Password Update
            </h1>

            {["Current Password", "New Password", "Confirm New Password"].map(
              (label, idx) => (
                <div className="flex flex-row" key={idx}>
                  <div className="flex flex-col justify-center w-1/4">
                    <p>{label} :</p>
                  </div>
                  <input
                    type="password"
                    placeholder={label}
                    className="p-3 m-2 border border-black rounded-2xl w-full"
                    disabled
                  />
                </div>
              )
            )}

            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="px-6 py-3 bg-orange-400 hover:bg-orange-500 text-white font-medium rounded-lg transition"
              >
                Update User
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminUserEdit;
