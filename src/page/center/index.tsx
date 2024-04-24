import { useContext, useState, useEffect } from 'react'
import { ImgContext } from '@/context'
import { Spinner } from '@nextui-org/react'
export default function CenterBoard() {
  const { imgInfo, uploadCurrentImage, isUpload } = useContext(ImgContext)
  const [isLoading, setIsLoading] = useState(false)
  // console.log(uploadCurrentImage)

  useEffect(() => {
    if (imgInfo?.urls != null) {
      setIsLoading(true)
    }
  }, [imgInfo])

  return (
    <div className='relative'>
      {isUpload === true ? (
        <>
          {uploadCurrentImage?.urls?.regular && (
            <img
              src={uploadCurrentImage?.urls?.regular}
              onLoad={() => setIsLoading(false)}
              className='rounded-3xl h-[600px] w-[800px] object-cover'
            />
          )}
        </>
      ) : (
        <>
          {imgInfo?.urls?.regular && (
            <img
              src={imgInfo?.urls?.regular}
              alt={imgInfo?.alt_description}
              onLoad={() => setIsLoading(false)}
              className='rounded-3xl h-[600px] w-[800px] object-cover'
            />
          )}
        </>
      )}

      {/*object-cover 是object-fit: cover; 用来确保图片在适应各种尺寸的屏幕和设备时都能保持其原始的纵横比，同时避免空白区域或图像失真。 */}
      {isLoading && (
        <Spinner
          label='Loading...'
          color='warning'
          className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pt-4'
        />
      )}
    </div>
  )
}
