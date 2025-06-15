import { IoArrowBack } from "react-icons/io5";

function BackButton({ onClick }) {
  return (
    <>
      <button
        className="fixed top-21 left-5 shadow-2xl drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]"
        onClick={onClick}
      >
        <div className="flex items-center justify-between px-5 py-1 cursor-pointer text-[#000000] bg-[#FFD700] mx-auto rounded-xl font-semibold text-lg w-25 h-15 ">
          {" "}
          <IoArrowBack /> Back
        </div>
      </button>
    </>
  );
}

export default BackButton;
