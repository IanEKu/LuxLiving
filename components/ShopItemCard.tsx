import Image from 'next/image'
import LazyImage from './LazyImage'

type Props = {
    product: {
        title: string
        category: string
        color: string | null
        price?: number
        image: string
    },
    boldPoppins: string
}

const ShopItemCard = ({product, boldPoppins}: Props) => {

  return (
    <div className='rounded-3xl w-full h-80 p-3 bg-white relative'>
      <Image
        src={product.image}
        alt={product.title}
        className='w-full h-full rounded-2xl object-cover'
        height={500}
        width={500}
        placeholder='blur'
      />
      <div className="absolute top-0 left-0 w-full h-full p-3">
        <div className="flex flex-col justify-end items-start bg-black/30 w-full h-full p-4 rounded-2xl">
          <p className={`${boldPoppins} text-xl mb-2 w-1/2`}>{product.title}</p>
          <p className={`w-1/2`}>${product.price}</p>
        </div>
      </div>
    </div>
  )
}

export default ShopItemCard