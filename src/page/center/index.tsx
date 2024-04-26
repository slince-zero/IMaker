import { useContext, useState, useEffect } from 'react'
import { ImgContext } from '@/context'
import { ImageDownloadContext } from '@/context/imageDownload'
import { Spinner } from '@nextui-org/react'
export default function CenterBoard() {
  const {
    imgInfo,
    uploadCurrentImage,
    isUpload,
    authorValue,
    titleValue,
    fontValue,
    fontSizeValue,
    authorPosition,
    hexColor,
    opacityValue,
    proportionValue,
  } = useContext(ImgContext)

  const { imageContainerRef } = useContext(ImageDownloadContext)

  const [isLoading, setIsLoading] = useState(false)
  // console.log(uploadCurrentImage)

  useEffect(() => {
    if (imgInfo?.urls != null) {
      setIsLoading(true)
    }
  }, [imgInfo])

  return (
    <div
      className='relative'
      ref={imageContainerRef}>
      {isUpload === true ? (
        <div
          style={{ maxHeight: '90vh' }}
          className={proportionValue == '' ? 'aspect-[16/9]' : proportionValue}>
          {uploadCurrentImage?.urls?.regular && (
            <img
              src={uploadCurrentImage?.urls?.regular}
              onLoad={() => setIsLoading(false)}
              className='rounded-md object-cover h-full w-full'
            />
          )}
        </div>
      ) : (
        <div
          style={{ maxHeight: '90vh' }}
          className={proportionValue == '' ? 'aspect-[16/9]' : proportionValue}>
          {imgInfo?.urls?.regular && (
            <img
              src={imgInfo?.urls?.regular}
              alt={imgInfo?.alt_description}
              onLoad={() => setIsLoading(false)}
              className='rounded-md object-cover h-full w-full'
            />
          )}
        </div>
      )}

      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: '0',
          left: '0',
          borderRadius: '1.5rem',
          backgroundColor: hexColor,
          opacity: opacityValue,
        }}></div>

      {/*object-cover 是object-fit: cover; 用来确保图片在适应各种尺寸的屏幕和设备时都能保持其原始的纵横比，同时避免空白区域或图像失真。 */}
      {isLoading && (
        <Spinner
          label='Loading...'
          color='warning'
          className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pt-4'
        />
      )}
      {/* 标题&文案显示在图片上 */}
      <div
        className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pt-4'
        style={{ fontFamily: fontValue, fontSize: fontSizeValue }}>
        {titleValue}
      </div>

      {/* autor 显示在图片上 */}
      <div
        style={{
          position: authorPosition?.position,
          bottom: authorPosition?.bottom,
          top: authorPosition?.top,
          left: authorPosition?.left,
          right: authorPosition?.right,
          padding: authorPosition?.padding,
        }}>
        {authorValue}
      </div>
      {/* <div className='absolute bottom-0 right-0 p-3'>
        {authorValue}
      </div> */}
    </div>
  )
}
