'use client'

import { products } from '@/contants'
import React, { useEffect, useState } from 'react'
import ItemCard from './ItemCard'
import Link from 'next/link'
import { NextFont } from 'next/dist/compiled/@next/font'

const Products = ({poppinsBold}: {poppinsBold: NextFont}) => {
    const [showProducts, setShowProducts] = useState<ProductItem[]>(products.filter(product => product.color !== null).slice(0, 3))

    useEffect(() => {
        const fetchBlurDataURLs = async () => {
            const productsWithBlurDataURLs = await Promise.all(showProducts.map(async (product) => {
            const response = await fetch(`/api/getBase64?url=${product.image}`, {cache: 'force-cache'});
            const blurDataURL = await response.json();
            return { ...product, blurDataURL };
            }));
            setShowProducts(productsWithBlurDataURLs);
        };
    
        fetchBlurDataURLs();      
      
        return () => {}
      }, [])
    

  return (
    <section className="mt-16 md:mt-20 w-full px-4 md:p-0">
        <header className='flex flex-col items-center w-full mb-5'>
          <h1 className={`${poppinsBold.className} text-6xl text-secondary`}>Our Products</h1>
        </header>
        <article className="flex flex-col items-center">
          <div className="flex flex-row justify-start md:justify-around w-full md:w-5/6 overflow-scroll">
            {
              showProducts.map((product, index) => (
                <ItemCard
                  product={product}
                  boldPoppins={poppinsBold.className}
                  page="component"
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
  )
}

export default Products