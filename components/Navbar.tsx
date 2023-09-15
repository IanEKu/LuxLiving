'use client'

import { navigationsLink } from "@/contants"
import { Menu, Transition } from "@headlessui/react"
import Image from "next/image"
import Link from "next/link"
import { Fragment, useEffect, useState } from "react"
import { usePathname, useRouter } from 'next/navigation'

const Navbar = () => {
    const currentPath = usePathname()
    const router = useRouter()

    const [showMenu, setShowMenu] = useState(false)

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

    const handleClick = () => {
        setShowMenu(prev => !prev)
    }

    return (
        <nav className="w-full flex justify-center z-20">
            <p
                onClick={() => {
                    if (currentPath == '/') {
                        document.getElementById("home")?.scrollIntoView({behavior: "smooth"})
                    } else {
                        router.push('/')
                    }
                }}
                className={`text-3xl fixed top-2 left-16 hidden md:block ${!scrolled && 'opacity-0'} transition-all cursor-pointer`}>
                Lux<span className="font-extrabold">Living.</span>
            </p>

            <div className={`w-full md:w-1/2 py-4 md:p-0 px-4 ${scrolled ? 'bg-primary/75': 'bg-primary/0'} backdrop-blur md:bg-transparent md:backdrop-blur-none fixed transition-opacity cursor-pointer`}>
                <div className='md:hidden flex flex-row justify-between'>
                    <p
                        onClick={() => {
                            if (currentPath == '/') {
                                document.getElementById("home")?.scrollIntoView({behavior: "smooth"})
                            } else {
                                router.push('/')
                            }
                        }}
                        className={`text-2xl ${(currentPath == '/' && !scrolled) && 'opacity-0'} transition-opacity`}
                    >
                        Lux<span className="font-extrabold">Living.</span>
                    </p>
                    
                    <Menu as="div">
                        <Menu.Button onClick={() => setShowMenu(prev => !prev)} >
                            <Image
                                src='/menu.svg'
                                alt="menu"
                                width={6}
                                height={6}
                                className="invert transition-all "
                            />
                        </Menu.Button>

                        <Transition
                            show={showMenu}
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items
                                static
                                className="absolute right-8 bg-white/90 backdrop-blur rounded-3xl text-black w-44 p-4 flex flex-col items-end"
                                onMouseLeave={() => setShowMenu(false)}
                                onClick={() => setShowMenu(prev => !prev)}
                            >
                                <LinkItems isMobile={true} onClick={handleClick} />
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>

                <div className="hidden md:flex bg-white px-12 py-2 flex-row justify-between items-center rounded-b-full">
                    <LinkItems isMobile={false} onClick={handleClick} />
                </div>

            </div>
        </nav>
    )
}

export default Navbar

export const LinkItems = ({isMobile, onClick}: {isMobile: boolean, onClick: () => void}) => {
    const currentPath = usePathname()
    const router = useRouter()
    return (
        <>
            {navigationsLink.map(link => (
                link.route.startsWith('#') || link.route == '/'
                ?   <p
                        key={link.title}
                        className={`text-black ${isMobile ? 'text-lg' : 'text-xl'} uppercase font-semibold ${isMobile && 'mb-2'} cursor-pointer`}
                        onClick={() => {
                            if (currentPath == '/') {
                                if (link.route == '/') {
                                    document.getElementById("home")?.scrollIntoView({behavior: "smooth"})
                                } else {
                                    document.querySelector(link.route)?.scrollIntoView({behavior: "smooth"})
                                }
                            } else {
                                router.push('/')
                                if (link.route !== '/') {
                                    setTimeout(() => {
                                        document.querySelector(link.route)?.scrollIntoView({behavior: "smooth"})
                                    }, 3000)
                                }
                            }
                            onClick
                        }}
                    >
                        {link.title}
                    </p>
                : <Link
                    key={link.title}
                    href={link.route}
                    className={`text-black ${isMobile ? 'text-lg' : 'text-xl'} uppercase font-semibold ${isMobile && 'mb-2'}`}
                    onClick={() => onClick}
                >
                    {link.title}
                </Link>
            ))}
            {
                isMobile && (
                    <span className="w-full h-px bg-primary/50 mb-2"></span>
                )
            }
            {isMobile ? (
                    <div className={`flex flex-row ${isMobile && 'my-2'}`}> 
                        <button 
                            type="button"
                            className={`${isMobile && "mr-4"}`}
                            onClick={() => {
                                onClick
                            }}
                        >
                            <Image
                                src='/cart-shopping.svg'
                                alt="cart"
                                width={isMobile ? 24 : 18}
                                height={isMobile ? 24 : 18}
                            />
                        </button>
                        <Link
                            href='/profile'
                            onClick={() => {
                                onClick
                            }}
                        >
                            <Image
                                src='/user-profile.svg'
                                alt="user"
                                width={isMobile ? 20 : 14}
                                height={isMobile ? 20 : 14}
                            />
                        </Link>
                    </div>
                ) : (
                    <>
                        <button
                            type="button"
                            className={`${isMobile && "mr-4"}`}
                            onClick={() => {
                                onClick
                            }}
                        >
                            <Image
                                src='/cart-shopping.svg'
                                alt="cart"
                                width={isMobile ? 24 : 18}
                                height={isMobile ? 24 : 18}
                            />
                        </button>
                        <Link
                            href='/profile'
                            onClick={() => {
                                onClick
                            }}
                        >
                            <Image
                                src='/user-profile.svg'
                                alt="user"
                                width={isMobile ? 20 : 14}
                                height={isMobile ? 20 : 14}
                            />
                        </Link>
                    </>
                )
            }
        </>
    )
}