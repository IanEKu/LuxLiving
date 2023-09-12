'use client'

import React, { useEffect, useState } from 'react'
import { Poppins } from 'next/font/google'

const poppinsBlack = Poppins({weight: "600", subsets: ['latin'] })

const Hero = () => {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {        
        const toggleLogo = () => {
            const scrolled = document.documentElement.scrollTop;
            
            if (scrolled > 300) {
                setScrolled(true)
            }
            if (scrolled <= 300) {
                setScrolled(false)
            }   
        }

        window.addEventListener('scroll', toggleLogo)
    }, [])

    return (
        <div className="flex flex-col">
            <p className={`text-2xl md:text-3xl mb-5 ${scrolled && 'opacity-0'}`}>
                Lux<span className="font-extrabold">Living.</span>
            </p>
            <p className={`${poppinsBlack.className} text-4xl md:text-6xl md:leading-tight`}>Elevate your home with exquisite furniture that combine style and comfort</p>
            <button type="button" className='bg-transparent border-1 border-secondary text-secondary uppercase rounded-full py-2 px-2 text-2xl font-bold w-3/4 md:w-1/2 mt-4'>discover more</button>
        </div>
    )
}

export default Hero