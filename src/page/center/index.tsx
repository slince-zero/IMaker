import { useContext, useState, useEffect } from 'react'
import { ImgContext } from '@/context'
import { Spinner } from '@nextui-org/react'
export default function CenterBoard() {
  const { imgInfo } = useContext(ImgContext)
  const [isLoading, setIsLoading] = useState(false)
  // console.log(imgInfo)

  useEffect(() => {
    if (imgInfo?.urls != null) {
      setIsLoading(true)
    }
  })

  return (
    <div className='relative'>
      <img
        src={imgInfo?.urls?.regular}
        alt={imgInfo?.alt_description}
        className='rounded-3xl h-[600px] w-[800px] object-cover'
      />
      {/*object-cover 是object-fit: cover; 用来确保图片在适应各种尺寸的屏幕和设备时都能保持其原始的纵横比，同时避免空白区域或图像失真。 */}
      <Spinner label="Loading..." color="warning" />
    </div>
  )
}
