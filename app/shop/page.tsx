'use client'

import { productCategories, products } from "@/contants"
import { Poppins } from "next/font/google"
import { Menu, Transition } from "@headlessui/react"
import { Fragment, useEffect, useState } from "react"
import ItemCard from "@/components/ItemCard"

const poppinsBold = Poppins({weight: "500", subsets: ['latin'] })

const Shop = () => {
    const [showCategory, setShowCategory] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState("")
    const [firstCall, setFirstCall] = useState(true)

    const [filteredProducts, setFilteredProducts] = useState(products.filter(product => product.color !== null))

    useEffect(() => {
        const fetchBlurDataURLs = async () => {
            const productsWithBlurDataURLs = await Promise.all(filteredProducts.map(async (product) => {
            const response = await fetch(`/api/getBase64?url=${product.image}`, {cache: 'force-cache'});
            const blurDataURL = await response.json();
            return { ...product, blurDataURL };
            }));
            setFilteredProducts(productsWithBlurDataURLs);
            setFirstCall(false);
        };
    
        fetchBlurDataURLs();      
      
        return () => {}
      }, [])
      
    
      useEffect(() => {
            if (selectedCategory !== "" && !firstCall) {        
                const newFilteredProducts = products.filter(product => product.color !== null).filter(product => product.category == selectedCategory)
                setFilteredProducts(newFilteredProducts)
                const fetchBlurDataURLs = async () => {
                    const productsWithBlurDataURLs = await Promise.all(newFilteredProducts.map(async (product) => {
                    const response = await fetch(`/api/getBase64?url=${product.image}`, {cache: 'force-cache'});
                    const blurDataURL = await response.json();
                    return { ...product, blurDataURL };
                }));
                setFilteredProducts(productsWithBlurDataURLs);
            };
        
            fetchBlurDataURLs();
          }
      
        return () => {}
      }, [selectedCategory])

    return (
        <main className="w-full px-4 md:px-16 mt-14">
            <section className="w-full flex flex-col">
                <header className="flex flex-row items-center md:justify-start justify-between mb-4">
                    <h1 className={`text-3xl md:text-6xl text-secondary mr-6 ${poppinsBold.className}`}>Shop</h1>
                    <Menu as="div" className="relative">
                        <Menu.Button onMouseLeave={() => setShowCategory(false)} onMouseEnter={() => setShowCategory(true)} >
                            <p
                                className='text-secondary font-bold text-xs md:text-base mx-auto mt-4 px-8 py-1 border-1 border-secondary rounded-full capitalize'
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
                <article className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full ">
                    {   
                        filteredProducts.length
                        ? filteredProducts.map((product, index) => (
                            <ItemCard
                                product={product}
                                boldPoppins={poppinsBold.className}
                                page={true}
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

export default Shop