import { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ImgContext } from '@/context'
import { ImageDownloadContext } from '@/context/imageDownload'
import { Spinner } from '@nextui-org/react'
import HandWriting from '@/page/right/hand-writing'
import ScreenCapture from './dragScreenShot'
import { getAspectRatio } from '@/config/options'
import { ImageIcon } from '@/components/icons'

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
    authorPositionId,
    hexColor,
    opacityValue,
    proportionValue,
    isCircle,
    isOpenSelectArea,
  } = useContext(ImgContext)
  const { imageContainerRef } = useContext(ImageDownloadContext)

  const areaRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })
  const ratio = getAspectRatio(proportionValue)

  // 根据可用空间和比例计算画布尺寸，保证 PC / 移动端都能完整显示
  useLayoutEffect(() => {
    const el = areaRef.current
    if (!el) return
    const update = () => {
      const style = getComputedStyle(el)
      const availW =
        el.clientWidth -
        parseFloat(style.paddingLeft) -
        parseFloat(style.paddingRight)
      const availH =
        el.clientHeight -
        parseFloat(style.paddingTop) -
        parseFloat(style.paddingBottom)
      if (availW <= 0 || availH <= 0) return
      let width = availW
      let height = availW / ratio
      if (height > availH) {
        height = availH
        width = availH * ratio
      }
      setSize({ width: Math.floor(width), height: Math.floor(height) })
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [ratio])

  const current = isUpload ? uploadCurrentImage : imgInfo
  const src = current?.urls?.regular

  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    setLoaded(false)
  }, [src])

  const radius = isCircle ? '1.5rem' : '0px'
  const isMiddleAuthor = authorPositionId === 'middle'

  return (
    <div
      ref={areaRef}
      className='flex h-full w-full items-center justify-center p-3 sm:p-6 lg:p-10'>
      <div
        className='shadow-2xl shadow-black/60'
        style={{
          width: size.width,
          height: size.height,
          borderRadius: radius,
          visibility: size.width ? 'visible' : 'hidden',
        }}>
        <div
          ref={imageContainerRef}
          className='img-area relative h-full w-full overflow-hidden bg-zinc-800 text-white'
          style={{ borderRadius: radius }}>
          {src ? (
            <img
              key={src}
              src={src}
              alt={current?.alt_description ?? ''}
              onLoad={() => setLoaded(true)}
              onError={() => setLoaded(true)}
              className='absolute inset-0 h-full w-full object-cover'
            />
          ) : (
            <div
              className='absolute inset-0 flex flex-col items-center justify-center gap-2 text-sm text-zinc-400'
              data-export-ignore='true'>
              <ImageIcon size={32} />
              从图库选择或上传一张图片
            </div>
          )}

          {/* 遮罩 */}
          <div
            className='pointer-events-none absolute inset-0'
            style={{ backgroundColor: hexColor, opacity: opacityValue }}
          />

          {/* 标题 & 文案 */}
          <div className='pointer-events-none absolute inset-0 flex flex-col items-center justify-center p-[6%] text-center'>
            <div
              className='whitespace-pre-wrap break-words leading-snug'
              style={{
                fontFamily: fontValue,
                fontSize: fontSizeValue,
                textShadow: '0 2px 12px rgba(0,0,0,0.35)',
              }}>
              {titleValue}
            </div>
            {isMiddleAuthor && authorValue && (
              <div className='mt-3 text-sm opacity-90'>{authorValue}</div>
            )}
          </div>

          {/* 作者水印 */}
          {!isMiddleAuthor && authorValue && (
            <div
              className='pointer-events-none p-3 text-sm sm:p-4'
              style={{ ...authorPosition, textShadow: '0 1px 6px rgba(0,0,0,0.4)' }}>
              {authorValue}
            </div>
          )}

          {/* 手写板 */}
          <div className='absolute inset-0 z-10'>
            <HandWriting
              width={size.width}
              height={size.height}
            />
          </div>

          {/* 导出选区 */}
          {isOpenSelectArea && (
            <ScreenCapture
              boundsWidth={size.width}
              boundsHeight={size.height}
            />
          )}

          {src && !loaded && (
            <div
              className='absolute inset-0 z-30 flex items-center justify-center bg-black/20'
              data-export-ignore='true'>
              <Spinner color='warning' />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
