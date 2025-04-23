import { FaRegStar } from "react-icons/fa";

function GiveReview() {
  return (
    <>
    <section className='max-h-screen h-screen w-full bg-[url("./src/components/images/customer_bg2.png")] bg-cover bg-no-repeat flex items-center justify-center'>   
        <div className="md:mt-0 mt-20 flex flex-col justify-center items-center bg-[#FFD700] md:h-[500px] h-[700px] md:w-[800px] w-[360px] rounded-3xl shadow-lg shadow-black/50 border-black border-2">
            <div className="md:w-[600px] w-[300px] flex flex-col items-center justify-center">
                <h1 className="text-2xl font-semibold mb-5">Leave a review for us!</h1>
                <div className="flex md:flex-row flex-col mb-5">
                    <div className="flex flex-col items-center justify-center mr-10">
                        <h1>Purchase Items:</h1>
                        <div className=" grid grid-cols-2 border-1 border-black rounded-lg p-2 mb-5 h-[100px] w-[250px] overflow-auto bg-[#FFFFFF] ">
                            <p>WAWAWAWA</p>
                            <p>WAWAWAWA</p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                        <h1 className="text-2xl">Rate Us using Stars!</h1>
                        <div className="flex flex-row gap-x-3 p-3">
                        <FaRegStar className=" h-[50px] w-[50px] "/>
                        <FaRegStar className=" h-[50px] w-[50px] "/>
                        <FaRegStar className=" h-[50px] w-[50px] "/>
                        <FaRegStar className=" h-[50px] w-[50px] "/>
                        <FaRegStar className=" h-[50px] w-[50px] "/>
                        </div>
                    </div>

                </div>
                <textarea name="review" id="review" placeholder="Leave your comment here!" className=" md:w-[600px] w-[330px] h-[150px]  bg-[#FFFFFF] border-1 border-black rounded-lg p-5 mb-5"></textarea>

                <div className="flex justify-between items-center md:w-[600px] gap-x-5 ">
                    <button className=" bg-[#EA1A20] md:p-5 p-2 m-2 text-white text-xl rounded-2xl border-2 border-black ">Cancel</button>
                    <button className=" bg-[#EA1A20] md:p-5 p-2 m-2 text-white text-xl rounded-2xl border-2 border-black ">Submit Review</button>
                </div>
            </div>
        </div>
    </section>
    </>
  )
}

export default GiveReview