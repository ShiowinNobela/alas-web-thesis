import { FaPlus, FaMinus } from 'react-icons/fa';
import React, { useState } from 'react'

function Faqs() {
  const [show, setShow] = useState(false);

  return (
    <>
    <section className="bg-[url('./src/components/images/customer_bg2.png')] bg-cover bg-fixed bg-no-repeat h-screen ">
    <div className="max-w-xl mx-auto pt-35">    
        <h1 className='text-center uppercase tracking-wide font-semibold mb-3'>Frequently Asked Questions</h1>
        <div className='grid grid-cols-1 gap-4'>

        <div className='border-2 border-gray-500 rounded-lg bg-white shadow-md'>
            <article className='flex justify-between items-center p-4'>
                <h1>1</h1>
                <ul>
                {!show && <li><button onClick={() => setShow(true)}><FaPlus/></button></li> }
                {show && <li><button onClick={() => setShow(false)}><FaMinus/></button></li>}
                </ul>
            </article>
            <article className={`${show && "border-t-2 border-gray-500 mt-2 p-4"}`}>
            {show && <p>This is K'Sante, a champion with 4,700 HP, 329 Armor, and 201 MR, has Unstoppable, a Shield, and goes over walls. Has Airborne, and the cooldown is only 1 second too. It costs 15 Mana. The W CD is even refreshed when he transforms. He has true damage on his passive. Then, when he stacks Armor and MR, he gets Ability Haste too, Ability Haste to his Q, and his spell casting speeds up. Then, he has an AD ratio, so his W…AAAAAAAAAAAAAAA</p> }
            </article>
        </div>

        </div> 
    </div>
    </section>
    </>
  )
}

export default Faqs