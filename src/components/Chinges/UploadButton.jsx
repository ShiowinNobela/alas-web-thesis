import { IoArrowBackCircleOutline } from "react-icons/io5";

function UploadButton({onClick}) {
    return(
        <div className="flex justify-between rounded-md bg-[#297e9a] hover:bg-gray-700 px-3 p-1 border-2"
        onClick={onClick}>
            <p className="text-2xl font-semibold uppercase">upload</p>
        </div>
    )
}

export default UploadButton