import Image from 'next/image'
import LazyImage from './LazyImage'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

type Props = {
    product: ProductItem,
    boldPoppins: string
    page: boolean | "collections" | "component"
}

const ItemCard = ({product, boldPoppins, page}: Props) => {
  return (
    <div className={`rounded-3xl ${page === "component" ? 'md:w-80 min-w-full md:min-w-0 h-80 p-3' : 'w-full h-48 p-2 md:h-80 md:p-3'} mr-4 md:m-0 bg-white relative`}>
      {
        <>
          {
            page 
              ? product.blurDataURL !== undefined 
                ? <Image
                  src={product.image}
                  alt={product.title}
                  className='w-full h-full rounded-2xl object-cover'
                  height={500}
                  width={500}
                  placeholder='blur'
                  blurDataURL={product.blurDataURL}
                />
                : <Skeleton
                    borderRadius="1rem"
                    baseColor='var(--mainSkeletonBg)'
                    highlightColor='var(--mainSkeletonHlt)'
                    height="100%"
                    style={{marginTop: '-20px'}}
                  />
            : <LazyImage
                  src={product.image}
                  alt={product.title}
                  className='w-full h-full rounded-2xl object-cover'
                  height={500}
                  width={500}
                  local={true}
                />
          }
          <div className="absolute top-0 left-0 w-full h-full p-2 md:p-3">
            <div className={`flex flex-col justify-end items-start w-full h-full p-2 md:p-4 rounded-2xl`}>
              {
                page && product.blurDataURL === undefined
                ? <Skeleton
                    count={2}
                    containerClassName='w-1/2'
                    baseColor='var(--secondarySkeletonBg)'
                    highlightColor='var(--secondarySkeletonHlt)'
                    className={`${boldPoppins} mb-2`}
                  />
                : <p className={`${boldPoppins} text-lg md:text-xl mb-2 md:w-1/2`}>{product.title}</p>
              }
              {
                product.price !== undefined && (
                  page && product.blurDataURL === undefined
                    ? <Skeleton
                      containerClassName='w-10'
                      baseColor='var(--secondarySkeletonBg)'
                      highlightColor='var(--secondarySkeletonHlt)'
                      className={`${boldPoppins} text-xs md:text-xl mb-2`}
                    />
                    : <p className={`w-1/2`}>${product.price}</p>
                  )
              }
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default ItemCard