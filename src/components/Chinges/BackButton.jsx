import { IoArrowBackCircleOutline } from "react-icons/io5";

function BackButton() {
    return(
        <div className="flex justify-between rounded-md hover:bg-[#a5a3a3] px-3 pb-0.5">
                <IoArrowBackCircleOutline className=" h-8 w-8 pt-0.5"/>{" "}
            <p className="text-2xl font-semibold uppercase">back</p>
        </div>
    )
}

export default BackButton