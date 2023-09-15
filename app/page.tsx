import Hero from '@/components/Hero'
import ItemCard from '@/components/ItemCard'
import { collectionShowcase, products } from '@/contants'
import { Poppins, Montserrat } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { ReactElement } from 'react'
import hero1 from '@/public/products/modern-livingroom1.jpg'
import hero2 from '@/public/products/bohemian-livingroom.jpg'
import LazyImage from '@/components/LazyImage'

export const revalidate = 0

const poppinsBold = Poppins({weight: "500", subsets: ['latin'] })
const poppinsBlack = Poppins({weight: "700", subsets: ['latin'] })

export default function Home() {  
  const parentShowcase = collectionShowcase.find(data => data.category === 'parent')!
  
  const childShowcase = collectionShowcase.filter(data => data.category === 'child')
  const miniCollectionCards: ReactElement[] = childShowcase
  .map((children, index) => (
    <div className='relative p-2 md:p-4 bg-white w-full h-full rounded-3xl' key={index}>
      <LazyImage
        src={children.image.url}
        alt={children.image.alt}
        height={500}
        width={500}
        className='w-full h-full object-cover rounded-2xl'
        local={true}
      />
      <div className='w-full h-full absolute z-10 bottom-0 left-0 flex flex-col justify-end p-2 md:p-4 pb-4 pl-4 md:pb-8 md:pl-8'>
        <p className={`text-xl md:text-3xl font-bold capitalize ${children.title.split(' ').length === 2 ? 'w-10' : 'w-full md:w-1/2'} ${poppinsBold.className}`}>{children.title}</p>
        <p className={`${children.special !== null ? 'absolute top-0 right-0 uppercase mt-6 mr-6 px-4' : 'capitalize w-3/4 md:w-1/2 mt-2'} text-secondary block border-1 border-secondary text-xs md:text-base font-bold text-center rounded-full`}>{ children.special === null ? 'look around': children.special}</p>
        {
          children.special === null && children.discount !== 0 && (
            <div className={`absolute flex flex-col justify-center items-end top-0 right-0 text-black bg-white p-2 md:p-4 rounded-tr-3xl md:rounded-tr-2xl rounded-bl-3xl uppercase leading-3 ${poppinsBlack.className}`}>
              <p className='text-3xl md:text-5xl tracking-tighter'>{children.discount}%</p>
              <p className={`text-xs md:text-lg -mt-2`}>discount</p>
            </div>
          )
        }
      </div>
    </div>
  ))
  
  return (
    <main className="flex flex-col justify-start items-start w-full min-h-screen md:px-16 scroll-smooth">

      <section className="relative w-full h-screen bg-hero bg-cover bg-center md:bg-none after:content-['*'] after:text-black/0 after:bg-fading after:bg-center after:bg-cover after:top-1 after:text-opacity-0 after:w-screen after:h-screen after:absolute" id='home'>
        <div className='flex md:grid grid-cols-2 h-screen w-full items-center absolute top-0 z-10 px-4 md:px-0 md:mt-10'>
          <Hero />
          <div className="p-2 border-white border-1 h-5/6 w-5/6 ml-4 mt-4 hidden md:block">
            <Image
              src={hero1}
              alt='hero'
              width={500}
              height={500}
              className='h-full w-full object-cover'
              placeholder='blur'
            />
          </div>
          <div className="p-2 border-white border-1 h-96 w-1/3 ml-4 mt-4 absolute rounded-3xl right-0 -bottom-14 hidden md:block">
            <Image
              src={hero2}
              alt='hero'
              width={500}
              height={500}
              className='h-full w-full object-cover rounded-3xl'
              placeholder='blur'
            />
          </div>
        </div>
      </section>

      <section className="mt-20 h-screen flex flex-col-reverse md:grid grid-cols-5 grid-rows-2 w-full gap-8 px-4 md:px-0" id='collections'>
        <div className="row-start-1 row-end-3 col-start-1 col-end-3 grid grid-rows-1 grid-cols-2 md:grid-rows-2 md:grid-cols-1 gap-x-2 mt-4 md:m-0 md:gap-y-8 h-60 md:h-full">
          {
            miniCollectionCards.map(miniCollectionCard => miniCollectionCard)
          }
        </div>
        <div className="col-start-3 col-end-6 row-start-1 row-end-3 flex flex-col md:grid grid-rows-6 gap-8 w-full h-2/3 md:h-full">
          <h1 className={`${poppinsBold.className} font-bold row-start-1 row-end-2 capitalize text-secondary text-6xl self-end`}>our collection</h1>
          <div className="relative bg-white row-start-2 row-end-7 p-2 md:p-4 w-full h-3/4 md:h-full rounded-3xl">
            <LazyImage
              src={parentShowcase.image.url}
              alt={parentShowcase.image.alt}
              width={1500}
              height={1500}
              className='w-full h-full rounded-2xl object-cover'
              local={true}
            />
            <div className="absolute top-0 left-0 w-full h-full p-4 md:p-8 z-10 grid grid-cols-1 grid-rows-2">
              <p className='row-start-1 row-end-2 px-4 place-self-start uppercase text-secondary block border-1 border-secondary font-bold text-center rounded-full'>{ parentShowcase.special }</p>
              <p className={`${poppinsBold.className} row-start-2 row-end-3 md:w-1/2 capitalize font-bold text-3xl md:text-5xl leading-tight text-right place-self-end`}>{ parentShowcase.title }</p>
            </div>
            {
              parentShowcase.discount !== 0 && (
                <div className={`absolute flex flex-col justify-center top-0 right-0 text-black bg-white py-4 px-4 rounded-tr-2xl rounded-bl-3xl uppercase leading-3 ${poppinsBlack.className}`}>
                  <p className='text-6xl tracking-tighter'>{parentShowcase.discount}%</p>
                  <p className={`text-xl -mt-2`}>discount</p>
                </div>
              )
            }
          </div>
        </div>
      </section>

      <section className="mt-16 md:mt-20 w-full px-4 md:p-0">
        <header className='flex flex-col items-center w-full mb-5'>
          <h1 className={`${poppinsBold.className} text-6xl text-secondary`}>Our Products</h1>
        </header>
        <article className="flex flex-col items-center">
          <div className="flex flex-row justify-start md:justify-around w-full md:w-5/6 overflow-scroll">
            {
              products.filter(product => product.color !== null).slice(0, 3).map((product, index) => (
                <ItemCard
                  product={product}
                  boldPoppins={poppinsBold.className}
                  key={index}
                />
              ))
            }
          </div>
          <Link
            href='/shop'
            className='text-secondary font-bold mx-auto mt-4 px-8 py-1 border-1 border-secondary rounded-full'
          >
            See more
          </Link>
        </article>
      </section>

      <section className="mt-20 h-screen w-full bg-about bg-cover bg-center md:bg-none" id='about'>
        <article className="flex md:grid grid-cols-2 grid-rows-1 h-full gap-4">
          <div className="border-1 border-white p-4 h-full hidden md:block rounded-3xl">
            <Image
              src={hero2}
              alt='hero'
              width={500}
              height={500}
              className='h-full w-full object-cover rounded-2xl'
              placeholder='blur'
            />
          </div>
          <div className="flex flex-col h-full md:h-3/5 justify-around md:bg-transparent bg-black/70 p-4 md:p-0">
            <h1 className={`text-7xl ${poppinsBold.className} capitalize text-secondary`}>About us</h1>
            <p className='text-xl'>At LuxLiving, we're passionate about providing you with top-quality furniture that elevates your living spaces.</p>
            <p className='text-xl'><span className={poppinsBold.className}>Our mission:</span> To offer a diverse selection of timeless pieces that match your unique taste and lifestyle.</p>
            <p className='text-xl'><span className={poppinsBold.className}>What sets us apart?</span> Unparalleled craftsmanship, exceptional customer service, and sustainable practices.</p>
            <p className={`${poppinsBold.className} text-xl text-secondary`}>Experience the LuxLiving difference today!</p>
          </div>
        </article>
      </section>

    </main>
  )
}
