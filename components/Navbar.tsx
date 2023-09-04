'use client'

import { navigationsLink } from "@/contants"
import { Menu, Transition } from "@headlessui/react"
import Image from "next/image"
import Link from "next/link"
import { Fragment, useState } from "react"

const Navbar = () => {
    const [showMenu, setShowMenu] = useState(false)

    return (
        <nav className="w-full flex justify-center z-10">
            <p className="text-3xl absolute top-8 left-16 hidden md:block">
                Lux<span className="font-extrabold">Living.</span>
            </p>

            <div className="w-full md:w-1/2 py-4 md:p-0 px-8 bg-primary/75 md:bg-transparent backdrop-blur md:backdrop-blur-none fixed">
                <div className="md:hidden flex flex-row justify-between">
                    <Link
                        href='/'
                        className="text-2xl"
                    >
                        Lux<span className="font-extrabold">Living.</span>
                    </Link>
                    <Menu as="div">
                        <Menu.Button onClick={() => setShowMenu(prev => !prev)} >
                            <Image
                                src={showMenu ? '/close.svg' : '/menu.svg'}
                                alt="menu"
                                width={showMenu ? 14 : 6}
                                height={showMenu ? 14 : 6}
                                className="invert transition-all"
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
                            >
                                <LinkItems isMobile={true} />
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>

                <div className="hidden md:flex bg-white px-12 py-2 flex-row justify-between items-center rounded-b-full">
                    <LinkItems isMobile={false} />
                </div>

            </div>
        </nav>
    )
}

export default Navbar

export const LinkItems = ({isMobile}: {isMobile: boolean}) => {
    return (
        <>
            {navigationsLink.map(link => (
                <Link
                    href={link.route}
                    className={`text-black ${isMobile ? 'text-lg' : 'text-xl'} uppercase font-semibold ${isMobile && 'mb-2'}`}
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
                        <button type="button" className={`${isMobile && "mr-4"}`}>
                            <Image
                                src='/cart-shopping.svg'
                                alt="cart"
                                width={isMobile ? 24 : 18}
                                height={isMobile ? 24 : 18}
                            />
                        </button>
                        <Link href='/profile'>
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
                        <button type="button" className={`${isMobile && "mr-4"}`}>
                            <Image
                                src='/cart-shopping.svg'
                                alt="cart"
                                width={isMobile ? 24 : 18}
                                height={isMobile ? 24 : 18}
                            />
                        </button>
                        <Link href='/profile'>
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