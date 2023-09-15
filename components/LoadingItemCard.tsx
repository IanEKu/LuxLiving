import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const LoadingItemCard = () => {
  return (
    <div className={`rounded-3xl w-full h-48 p-2 md:h-80 md:p-3 mr-4 md:m-0 bg-white relative`}>
        <Skeleton
            borderRadius="1rem"
            baseColor='var(--mainSkeletonBg)'
            highlightColor='var(--mainSkeletonHlt)'
            height="100%"
            style={{marginTop: '-20px'}}
        />
        <div className="absolute top-0 left-0 w-full h-full p-2 md:p-3">
            <div className={`flex flex-col justify-end items-start w-full h-full p-2 md:p-4 rounded-2xl`}>
                <Skeleton
                    count={2}
                    containerClassName='w-1/2 mb-2'
                    baseColor='var(--secondarySkeletonBg)'
                    highlightColor='var(--secondarySkeletonHlt)'
                />
                <Skeleton
                    containerClassName='w-10 mb-2'
                    baseColor='var(--secondarySkeletonBg)'
                    highlightColor='var(--secondarySkeletonHlt)'
                />
            </div>
        </div>
    </div>
  )
}

export default LoadingItemCard