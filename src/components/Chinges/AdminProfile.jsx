import { CgProfile } from "react-icons/cg";

function AdminProfile(){
return(
     <div className='min-w-25 flex gap-1 justify-center items-center'>
        <CgProfile className=" mx-3 h-10 w-10" />{" "}

        <div>
            <p>TestAdmin1</p> 
            <p>TestAdmin1@gmail.com</p>
        </div>
        </div>
)
}

export default AdminProfile