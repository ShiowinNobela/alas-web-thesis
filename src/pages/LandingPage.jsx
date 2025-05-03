import Navbar from '../components/navbar.jsx'
import LandPagePic1 from '../components/images/lp1.jpg'
import LandPagePic2 from '../components/images/lp2.jpg'
import DiamondDesign from '../components/images/diamondDesign.png'
import RevIcon from '../components/images/reviewIcon.png'
import Holder from '../components/images/prod1.jpg'
import Prod1 from '../components/images/prod1.jpg'
import Prod2 from '../components/images/prod2.jpg'
import Prod3 from '../components/images/prod3.jpg'
import Prod4 from '../components/images/prod4.jpg'
import { FaStar } from "react-icons/fa";
import Journey from '../components/journey.jsx'
import Footer from '../components/footer.jsx'
import Opener from '../components/images/opener.png'


const LandingPage = () => {
  return (
    <>
    
    <section className="bg-[url('./src/components/images/bg-2.png')] bg-cover bg-center shadow-inner shadow-[#000000 - 500]">
    <Navbar/>
        <div className="max-w-7xl mx-auto pt-35 px-6 h-screen">
            <div className="flex flex-col items-center mt-6 lg:mt-20">
                <h1 className="text-6xl lg:text-8xl text-center tracking-wide text-[#FFFFFF]">
                ARTISANAL <span className="text-[#EA1A20]"> HOT </span> SAUCE AND <span className="text-[#EA1A20]"> SPICY </span> STUFF
                 </h1>
                <p className=" mt-8 text-2xl text-center text-[#FFFFFF] max-w-3xl">
                 We pride ourselves on different flavor profiles, not just heat. Anything that’s spicy as a whole, we have it.
                 From powders, to pickles, to oils, to sauces, name it. 
                </p>
                    <div className="flex justify-center my-10">
                        <a href="#" className="px-3 mx-3 rounded-2xl text-2xl bg-[#FFD700] p-5 border-black-600">
                            Order Now!
                        </a>
                    </div>
            </div>
        </div>
    </section>
    
    <section className="bg-[url('./src/components/images/landpagebg1.png')] bg-cover bg-center pt-30">
        <div className='lg:max-w-5xl max-w-7xl mx-auto h-screen pt-1 px-6'>
            <div className="flex flex-col items-center mt-6 lg:mt-20 gap-y-3">
                <h1 className='text-5xl sm:6xl lg:text-7xl justify-center font-bold tracking-wide text-center p-5'>“Tikman mo yung Alas!”</h1>
                    <p className='max-w-2xl text-center text-xl lg:pb-10 pb-3'>At Alas Deli’s and Sices, it's not just for chili enthusiasts—we've got something for everyone. Explore our most popular and featured products today!</p>
                    <div className='flex flex-col items-center border-black border-1 lg:w-[900px] lg:h-[400px] w-[400px] h-[600px] '>
                        <h1 className='text-[#EA1A20] font-bold text-4xl py-3'> Hot Sellers</h1>
                        <div className='lg:flex lg:flex-row items-center gap-x-3 grid grid-cols-2 '>

                            <div className='flex flex-col items-center justify-center lg:pb-0 pb-3'>
                                <img src={Prod1} alt="/" className='lg:w-[200px] lg:h-[200px] w-[150px] h-[150px]'/>
                                    <p className='text-2xl font-semibold pb-3'> Jinx </p>
                                    <button className=' text-[#FFFFFF] font-semibold bg-[#EA1A20] px-2 py-1 border-2 border-black rounded-md' > Order Now! </button>
                            </div>

                            <div className='flex flex-col items-center justify-center lg:pb-0 pb-3'>
                                <img src={Prod2} alt="/" className='lg:w-[200px] lg:h-[200px] w-[150px] h-[150px] '/>
                                    <p className='text-2xl font-semibold pb-3'> Kink </p>
                                    <button className=' text-[#FFFFFF] font-semibold bg-[#EA1A20] px-2 py-1 border-2 border-black rounded-md' > Order Now! </button>
                            </div>

                            <div className='flex flex-col items-center justify-center lg:pb-0 pb-3'>
                                <img src={Prod3} alt="/" className='lg:w-[200px] lg:h-[200px] w-[150px] h-[150px] '/>
                                    <p className='text-2xl font-semibold pb-3'> Big Bald Bob </p>
                                    <button className=' text-[#FFFFFF] font-semibold bg-[#EA1A20] px-2 py-1 border-2 border-black rounded-md' > Order Now! </button>
                            </div>

                            <div className='flex flex-col items-center justify-center lg:pb-0 pb-3'>
                                <img src={Prod4} alt="/" className='lg:w-[200px] lg:h-[200px] w-[150px] h-[150px] '/>
                                    <p className='text-2xl font-semibold pb-3'> Swan Song </p>
                                    <button className=' text-[#FFFFFF] font-semibold bg-[#EA1A20] px-2 py-1 border-2 border-black rounded-md' > Order Now! </button>
                            </div>

                           
                        </div>
                    </div>
            </div>
           
        </div>
    </section>

    <section className="bg-[url('./src/components/images/spicyredbg.png')] max-w-screen h-screen bg-cover bg-no-repeat" >
        <div className='max-w-5xl mx-auto px-5 lg:pt-40 pt-40 grid lg:grid-cols-3 lg:gap-x-10 grid-cols-2 gap-x-3 '>
            <img src={LandPagePic1} alt="/" className='lg:h-[550px] lg:w-[420px] lg:row-span-4 lg:pb-0 row-span-3 object-cover h-[350px] w-[250px] pb-5' />
            <img src={DiamondDesign} alt="/" className='h-[120px] w-screen lg:col-span-2 col-span-1' />
            <h3 className='lg:col-span-2 col-span-1 lg:row-span-1 row-span-2 pb-5 lg:text-[40px] text-[30px] lg:text-left text-center text-[#FFFFFF] '>The start of Alas Hot Sauce</h3>
            <img src={LandPagePic2} alt="/" className='lg:h-[350px] lg:w-[250px] h-[200px] w-[150px] row-span-2 mx-auto' />
            <Journey/>
        </div>
    </section>

    <section className="bg-[url('./src/components/images/landpagebg3.png')] flex items-center justify-center bg-[#000000] max-w-screen lg:h-[550px] h-screen bg-no-repeat bg-center bg-cover">
    <div className='max-w-7xl max-h-[450px] grid lg:grid-cols-4 grid-cols-2 gap-x-5 gap-y-5'>    
            <div className='bg-[#ffffff] lg:h-[380px] lg:w-[300px] h-[300px] w-[180px] flex flex-col items-center justify-center rounded-2xl'>
                <img src={RevIcon} alt="/" className='lg:w-[150px] lg:h-[150px] w-[100px] h-[100px] mx-auto px-3 py-3 '/>
                <div className='flex flex-row'>
                <FaStar className='lg:w-[30px] lg:h-[30px] w-[15px] h-[15px] pr-1'/>
                <p className='lg:text-xl text-base'> 5/5</p>
                </div>
                <h1 className='text-[#646464] lg:text-4xl text-2xl'>Shiori Novella</h1>
                <p className='mx-6 px-2 py-2 text-center lg:text-xl text-sm'>Super recommended product. You have to try!</p>
            </div>
            <div className='bg-[#ffffff] lg:h-[380px] lg:w-[300px] h-[300px] w-[180px] flex flex-col items-center justify-center rounded-2xl'>
                <img src={RevIcon} alt="/" className='lg:w-[150px] lg:h-[150px] w-[100px] h-[100px] mx-auto px-3 py-3 '/>
                <div className='flex flex-row'>
                <FaStar className='lg:w-[30px] lg:h-[30px] w-[15px] h-[15px] pr-1'/>
                <p className='lg:text-xl text-base'> 5/5</p>
                </div>
                <h1 className='text-[#646464] lg:text-4xl text-2xl'>Shiori Novella</h1>
                <p className='mx-6 px-2 py-2 text-center lg:text-xl text-sm'>Super recommended product. You have to try!</p>
            </div>
            <div className='bg-[#ffffff] lg:h-[380px] lg:w-[300px] h-[300px] w-[180px] flex flex-col items-center justify-center rounded-2xl'>
                <img src={RevIcon} alt="/" className='lg:w-[150px] lg:h-[150px] w-[100px] h-[100px] mx-auto px-3 py-3 '/>
                <div className='flex flex-row'>
                <FaStar className='lg:w-[30px] lg:h-[30px] w-[15px] h-[15px] pr-1'/>
                <p className='lg:text-xl text-base'> 5/5</p>
                </div>
                <h1 className='text-[#646464] lg:text-4xl text-2xl'>Shiori Novella</h1>
                <p className='mx-6 px-2 py-2 text-center lg:text-xl text-sm'>Super recommended product. You have to try!</p>
            </div>
            <div className='bg-[#ffffff] lg:h-[380px] lg:w-[300px] h-[300px] w-[180px] flex flex-col items-center justify-center rounded-2xl'>
                <img src={RevIcon} alt="/" className='lg:w-[150px] lg:h-[150px] w-[100px] h-[100px] mx-auto px-3 py-3 '/>
                <div className='flex flex-row'>
                <FaStar className='lg:w-[30px] lg:h-[30px] w-[15px] h-[15px] pr-1'/>
                <p className='lg:text-xl text-base'> 5/5</p>
                </div>
                <h1 className='text-[#646464] lg:text-4xl text-2xl'>Shiori Novella</h1>
                <p className='mx-6 px-2 py-2 text-center lg:text-xl text-sm'>Super recommended product. You have to try!</p>
            </div>
            
        </div>
    </section>

    <section className="bg-[url('./src/components/images/landpagebg4.png')] bg-cover max-w-screen lg:h-screen  flex flex-col items-center ">
        <div className='max-w-6xl max-h-screen mx-auto grid lg:grid-cols-3 grid-cols-1 pt-50 gap-x-30'>
            <div className='w-[350px] items-center justify-center '>
                <img src={Holder} alt="/" className='lg:h-[300px] lg:w-[350px] h-[100px] w-[100px] pb-5' />
                <h1 className=' text-xl font-bold pb-2'>We also take Walk-In Purchases!</h1>
                <p className='text-sm pb-2'>Prefer to shop in person? Visit us at our store. Walk-ins always welcome!</p>
                <button className='bg-[#147D14] px-2 py-2 text-[#FFFFFF] rounded-xl border-2 border-black'> Learn More!</button>
            </div>
            <div className='w-[350px] justify-center items-center'>
                <img src={Holder} alt="/" className='lg:h-[300px] lg:w-[350px] h-[100px] w-[100px] pb-5' />
                <h1 className=' text-xl font-bold pb-2'>Spicy Questions? We’ve got answers.</h1>
                <p className='text-sm pb-7'>Check out our FAQs for a flavor-packed guide!</p>
                <button className='bg-[#147D14] px-2 py-2 text-[#FFFFFF] rounded-xl border-2 border-black'> View FAQ!</button>
            </div>
            <div className='w-[350px] justify-center items-center'>
                <img src={Holder} alt="/" className='lg:h-[300px] lg:w-[350px] h-[100px] w-[100px] pb-5' />
                <h1 className=' text-xl font-bold pb-2'>Got a sauce emergency? Let’s talk.</h1>
                <p className='text-sm pb-2'>Want to reach out to Alas Deli’s and Spices? — we’re just a click away!</p>
                <button className='bg-[#147D14] px-2 py-2 text-[#FFFFFF] rounded-xl border-2 border-black'> Contact Us!</button>
            </div>
        </div>
    </section>
    <section className='bg-[#000000] max-w-screen max-h-screen mx-auto flex flex-col'>
        <Footer/>
    </section>
    </>
  )
}

export default LandingPage