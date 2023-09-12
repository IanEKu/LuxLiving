'use client'

import Hero from '@/components/Hero'
import ShopItemCard from '@/components/ShopItemCard'
import { collectionShowcase, products } from '@/contants'
import { Poppins, Montserrat } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { ReactElement, useState } from 'react'

export const revalidate = 0

const poppinsBold = Poppins({weight: "500", subsets: ['latin'] })
const poppinsBlack = Poppins({weight: "700", subsets: ['latin'] })

export default async function Home() {
  const [localProducts, setLocalProducts] = useState(products.slice(0, 5))

  const parentShowcase = collectionShowcase.find(data => data.category === 'parent')!
  const childShowcase = collectionShowcase.filter(data => data.category === 'child')

  const miniCollectionCards: ReactElement[] = childShowcase
  .map((children, index) => (
    <div className='relative p-4 bg-white w-full h-full rounded-3xl' key={index}>
      <Image
        src={children.image.url}
        alt={children.image.alt}
        height={500}
        width={500}
        className='w-full h-full object-cover rounded-2xl'
        placeholder='blur'
      />
      <div className='w-full h-full absolute z-10 bottom-0 left-0 flex flex-col justify-end p-4 pb-8 pl-8'>
        <p className={`text-3xl font-bold capitalize ${children.title.split(' ').length === 2 ? 'w-10' : 'w-1/2'} ${poppinsBold.className}`}>{children.title}</p>
        <p className={`${children.special !== null ? 'absolute top-0 right-0 uppercase mt-6 mr-6 px-4' : 'capitalize w-1/2 mt-2'} text-secondary block border-1 border-secondary font-bold text-center rounded-full`}>{ children.special === null ? 'view our collection': children.special}</p>
        {
          children.special === null && children.discount !== 0 && (
            <div className={`absolute flex flex-col justify-center top-0 right-0 text-black bg-white py-4 px-4 rounded-tr-2xl rounded-bl-3xl uppercase leading-3 ${poppinsBlack.className}`}>
              <p className='text-5xl tracking-tighter'>{children.discount}%</p>
              <p className={`text-lg -mt-2`}>discount</p>
            </div>
          )
        }
      </div>
    </div>
  ))
  
  return (
    <main className="flex flex-col justify-start items-start w-full min-h-screen md:px-16">

      <section className="relative w-full h-screen bg-hero bg-cover bg-center md:bg-none after:content-['*'] after:text-black/0 after:bg-fading after:bg-center after:bg-cover after:top-1 after:text-opacity-0 after:w-screen after:h-screen after:absolute">
        <div className='flex md:grid grid-cols-2 h-screen w-full items-center absolute top-0 z-10 px-4 md:px-0 md:mt-10'>
          <Hero />
          <div className="p-2 border-white border-1 h-5/6 w-5/6 ml-4 mt-4 hidden md:block">
            <Image
              src="/products/modern-livingroom1.jpg"
              alt='hero'
              width={500}
              height={500}
              className='h-full w-full object-cover'
              placeholder='blur'
            />
          </div>
          <div className="p-2 border-white border-1 h-96 w-1/3 ml-4 mt-4 absolute rounded-3xl right-0 -bottom-14 hidden md:block">
            <Image
              src="/products/bohemian-livingroom.jpg"
              alt='hero'
              width={500}
              height={500}
              className='h-full w-full object-cover rounded-3xl'
              placeholder='blur'
            />
          </div>
        </div>
      </section>

      <section className="mt-20 h-screen grid grid-cols-5 grid-rows-2 w-full gap-8">
        <div className="row-start-1 row-end-3 col-start-1 col-end-3 grid grid-rows-2 grid-cols-1 gap-y-8">
          {
            miniCollectionCards.map(miniCollectionCard => miniCollectionCard)
          }
        </div>
        <div className="col-start-3 col-end-6 row-start-1 row-end-3 grid grid-rows-6 gap-8 w-full h-full">
          <h1 className={`${poppinsBold.className} font-bold row-start-1 row-end-2 capitalize text-secondary text-6xl self-end`}>our collection</h1>
          <div className="relative bg-white row-start-2 row-end-7 p-4 w-full h-full rounded-3xl">
            <Image
              src={parentShowcase.image.url}
              alt={parentShowcase.image.alt}
              width={1500}
              height={1500}
              className='w-full h-full rounded-2xl object-cover'
              placeholder='blur'
              blurDataURL=''
            />
            <div className="absolute top-0 left-0 w-full h-full p-8 z-10 grid grid-cols-1 grid-rows-2">
              <p className='row-start-1 row-end-2 px-4 place-self-start uppercase text-secondary block border-1 border-secondary font-bold text-center rounded-full'>{ parentShowcase.special }</p>
              <p className={`${poppinsBold.className} row-start-2 row-end-3 w-1/2 capitalize font-bold text-5xl leading-tight text-right place-self-end`}>{ parentShowcase.title }</p>
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

      <section className="h-screen mt-20 w-full">
        <header className='flex flex-row items-end w-full mb-5'>
          <h1 className={`${poppinsBold.className} text-6xl text-secondary`}>Shop</h1>
          <Link
            href='/shop'
            className='text-white/75 font-bold ml-auto'
          >
            See more
          </Link>
        </header>
        <article className="grid grid-cols-4 grid-rows-2 gap-4">
          {
            products.filter(product => product.color !== null).map((product, index) => (
              <ShopItemCard
                product={product}
                boldPoppins={poppinsBold.className}
                key={index}
              />
            ))
          }
        </article>
      </section>

    </main>
  )
}
