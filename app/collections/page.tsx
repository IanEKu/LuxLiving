'use client'

import { productCategories, products } from "@/contants"
import { Menu, Transition } from "@headlessui/react"
import { Fragment, ReactElement, useEffect, useState } from "react"
import { Poppins } from 'next/font/google'
import ItemCard from "@/components/ItemCard"
import LoadingItemCard from "@/components/LoadingItemCard"

const poppinsBold = Poppins({weight: "500", subsets: ['latin'] })

const Collections = () => {
  const [showCategory, setShowCategory] = useState(false)
  const [firstCall, setFirstCall] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("")

  const [filteredCollections, setFilteredCollections] = useState(products.filter(product => product.color === null))

  useEffect(() => {
    const fetchBlurDataURLs = async () => {
        const productsWithBlurDataURLs = await Promise.all(filteredCollections.map(async (product) => {
        const response = await fetch(`/api/getBase64?url=${product.image}`, {cache: 'force-cache'});
        const blurDataURL = await response.json();
        return { ...product, blurDataURL };
        }));
        setFilteredCollections(productsWithBlurDataURLs);
        setFirstCall(false);
    };

    fetchBlurDataURLs();      
  
    return () => {}
  }, [])
  

  useEffect(() => {
        if (selectedCategory !== "" && !firstCall) {        
            const newFilteredProducts = products.filter(product => product.color === null).filter(product => product.category == selectedCategory)
            setFilteredCollections(newFilteredProducts)
            const fetchBlurDataURLs = async () => {
                const productsWithBlurDataURLs = await Promise.all(newFilteredProducts.map(async (product) => {
                const response = await fetch(`/api/getBase64?url=${product.image}`, {cache: 'force-cache'});
                const blurDataURL = await response.json();
                return { ...product, blurDataURL };
            }));
            setFilteredCollections(productsWithBlurDataURLs);
        };
    
        fetchBlurDataURLs();
      }
  
    return () => {}
  }, [selectedCategory])

  return (
    <main className="w-full md:px-16 px-4 mt-16">
            <section className="w-full flex flex-col">
                  <header className="flex flex-row items-end md:justify-start justify-between mb-4">
                    <h1 className={`text-3xl md:text-6xl text-secondary mr-6 ${poppinsBold.className}`}>Collections</h1>
                    <Menu as="div" className="relative">
                        <Menu.Button onMouseEnter={() => setShowCategory(true)} onMouseLeave={() => setShowCategory(false)} >
                            <p
                                className='text-secondary font-bold mx-auto px-8 py-1 border-1 border-secondary rounded-full text-xs md:text-base capitalize'
                            >
                                {selectedCategory !== "" ? selectedCategory : "All category"}
                            </p>
                        </Menu.Button>

                        <Transition
                            show={showCategory}
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
                                className={`absolute z-10 left-0 bg-primary rounded-lg w-44 h-44 p-4 flex flex-col justify-center items-start transition-all`}
                                onMouseLeave={() => setShowCategory(false)}
                                onMouseEnter={() => setShowCategory(true)}
                            >
                                {
                                    productCategories.map((category, index) => (
                                        <p 
                                            key={index}
                                            className={`border-b-1 border-white mb-2 pr-2 text-white capitalize hover:text-lg hover:pr-4 hover:font-bold cursor-pointer`}
                                            onClick={() => {
                                                setSelectedCategory(category)
                                                setShowCategory(false)
                                            }}
                                        >
                                            {category}
                                        </p>
                                    ))
                                }
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </ header>
                <article className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full md:p-0">
                  { 
                    filteredCollections.length  
                    ? filteredCollections.map((product, index) => (
                        <ItemCard
                            product={product}
                            boldPoppins={poppinsBold.className}
                            page="collections"
                            key={index}
                        />
                    ))
                    : <p className='h-48 p-2 md:h-80 text-3xl text-center col-start-1 col-end-3 md:col-end-5'>Unfortunately, products with current category aren't available yet!</p>
                  }
              </article>
            </section>
    </main>
  )
}

export default Collections