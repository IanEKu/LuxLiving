import { getBase64 } from "@/lib/getBase64Images"
import Image from "next/image"

type Props = {
    src: string
    alt: string
    width: number
    height: number
    className: string
    local: boolean
}

const LazyImage = async ({src, alt, width, height, className, local}: Props) => {
    const source = `${local ? process.env.PUBLIC_URL : ''}${src}`
    const bluredImg = await getBase64(source)
    
  return (
    <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        placeholder='blur'
        blurDataURL={bluredImg}
    />
  )
}

export default LazyImage