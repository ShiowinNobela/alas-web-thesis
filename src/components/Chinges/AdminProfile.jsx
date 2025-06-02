import { CgProfile } from "react-icons/cg";
import { useEffect, useState } from "react";
import axios from "axios";

function AdminProfile(){

    const [values, setValues] = useState("")
    
    useEffect(() => {
        const user = JSON.parse(window.localStorage.getItem("user"));
        axios
        .get("/api/users", {
            headers: {
            Authorization: `Bearer ${user.token}`,
            },
        })
        .then((response) => {
            setValues(response.data);
            console.log(response.data);
        })
        .catch((error) => {
            console.error("Error fetching user data:", error);
        });
    }, []);

return(
     <div className='min-w-25 flex gap-1 justify-center items-center'>
        <CgProfile className=" mx-3 h-10 w-10" />

        <div>
            <p>{values.username}</p> 
            <p>{values.email}</p>
        </div>
        </div>
)
}

export default AdminProfile