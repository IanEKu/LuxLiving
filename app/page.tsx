import { Poppins, Montserrat } from 'next/font/google'
import Image from 'next/image'

export const revalidate = 0

const poppinsBlack = Poppins({weight: "600", subsets: ['latin'] })

export default function Home() {
  return (
    <main className="flex flex-col justify-start items-start w-full min-h-screen px-4 md:px-16 bg-hero bg-cover bg-center md:bg-none">

      <section className="flex md:grid grid-cols-2 h-screen items-center relative md:mt-10">
        <div className="flex flex-col">
          <p className={`${poppinsBlack.className} text-4xl md:text-6xl md:leading-tight`}>Elevate your home with exquisite furniture that combine style and comfort</p>
          <button type="button" className='bg-transparent border-1 border-secondary text-secondary uppercase rounded-full py-2 px-2 text-2xl font-bold w-3/4 md:w-2/6 mt-4'>discover more</button>
        </div>
        <div className="p-2 border-white border-1 h-5/6 w-5/6 ml-4 mt-4 hidden md:block">
          <Image
            src="/products/modern-livingroom1.jpg"
            alt='hero'
            width={500}
            height={500}
            quality={100}
            placeholder='blur'
            blurDataURL='LWIhW@009vkB?wRPV?NGWEWqs,WA'
            loading='lazy'
            className='h-full w-full object-cover'
          />
        </div>
        <div className="p-2 border-white border-1 h-96 w-96 ml-4 mt-4 absolute rounded-3xl right-0 -bottom-14 hidden md:block">
          <Image
            src="/products/bohemian-livingroom.jpg"
            alt='hero'
            width={500}
            height={500}
            quality={100}
            placeholder='blur'
            blurDataURL='LJLza4yDNawv_Ns:V@R*-Q%2n$W='
            loading='lazy'
            className='h-full w-full object-cover rounded-3xl'
          />
        </div>
      </section>

    </main>
  )
}
