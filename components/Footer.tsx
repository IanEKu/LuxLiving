import { footerLinks } from "@/contants"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="grid grid-cols-2 md:flex md:flex-row w-full p-4 md:p-20 justify-between">
        {footerLinks.map(link => (
            <ul className="mb-4 md:mb-0" key={link.title}>
                <li className="capitalize font-semibold text-lg mb-2">{link.title}</li>
                {link.links.map(child => (
                    <li key={child.title} className={`${link.links.indexOf(child) !== link.links.length -1 && 'mb-2'}`}>
                        <Link
                            href={child.link}
                            className='capitalize text-sm'
                        >
                            {child.title}
                        </Link>
                    </li>
                ))}
            </ul>
        ))}
        <span className="hidden md:block min-h-full w-px bg-white"></span>
        <p className="text-6xl self-center mt-4 md:mt-0">
            Lux<span className="font-extrabold">Living.</span>
        </p>
    </footer>
  )
}

export default Footer