import {
  PointerEvent,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { ImgContext, ImagePosition, TitleAlign, TitleVertical } from '@/context'
import { ImageDownloadContext } from '@/context/imageDownload'
import { Spinner } from '@nextui-org/react'
import HandWriting from '@/page/right/hand-writing'
import ScreenCapture from './dragScreenShot'
import { getAspectRatio } from '@/config/options'
import { ImageIcon } from '@/components/icons'

const VERTICAL_CLASS: Record<TitleVertical, string> = {
  top: 'justify-start',
  middle: 'justify-center',
  bottom: 'justify-end',
}

const ALIGN_CLASS: Record<TitleAlign, string> = {
  left: 'items-start text-left',
  center: 'items-center text-center',
  right: 'items-end text-right',
}

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
    titleVertical,
    titleAlign,
    imagePosition,
    setImagePosition,
    resetImagePosition,
    boardTool,
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
    // 换图后背景位置回到居中
    resetImagePosition()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src])

  const radius = isCircle ? '1.5rem' : '0px'
  const isMiddleAuthor = authorPositionId === 'middle'

  /* ---------- 拖动背景图，选择保留的区域（#2） ---------- */
  const [natural, setNatural] = useState({ width: 0, height: 0 })
  const panRef = useRef<{
    startX: number
    startY: number
    origin: ImagePosition
    overflowX: number
    overflowY: number
  } | null>(null)
  const [isPanning, setIsPanning] = useState(false)

  // object-cover 后图片超出画布的像素，只有超出的方向才能拖动
  const coverScale =
    natural.width && natural.height
      ? Math.max(size.width / natural.width, size.height / natural.height)
      : 0
  const overflowX = Math.max(0, natural.width * coverScale - size.width)
  const overflowY = Math.max(0, natural.height * coverScale - size.height)
  const canPan =
    !!src && loaded && boardTool === 'none' && (overflowX > 1 || overflowY > 1)

  const onPanStart = (e: PointerEvent<HTMLDivElement>) => {
    if (!canPan || e.button !== 0) return
    e.currentTarget.setPointerCapture(e.pointerId)
    panRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      origin: imagePosition,
      overflowX,
      overflowY,
    }
    setIsPanning(true)
  }

  const onPanMove = (e: PointerEvent<HTMLDivElement>) => {
    const p = panRef.current
    if (!p) return
    const clamp = (v: number) => Math.min(100, Math.max(0, v))
    // 往右拖 = 露出左边，所以百分比减小
    const x =
      p.overflowX > 1
        ? clamp(p.origin.x - ((e.clientX - p.startX) / p.overflowX) * 100)
        : p.origin.x
    const y =
      p.overflowY > 1
        ? clamp(p.origin.y - ((e.clientY - p.startY) / p.overflowY) * 100)
        : p.origin.y
    setImagePosition({ x, y })
  }

  const onPanEnd = (e: PointerEvent<HTMLDivElement>) => {
    if (!panRef.current) return
    panRef.current = null
    setIsPanning(false)
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId)
    }
  }

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
          className='img-area group relative h-full w-full overflow-hidden bg-zinc-800 text-white'
          style={{
            borderRadius: radius,
            cursor: canPan ? (isPanning ? 'grabbing' : 'grab') : undefined,
            touchAction: canPan ? 'none' : undefined,
          }}
          onPointerDown={onPanStart}
          onPointerMove={onPanMove}
          onPointerUp={onPanEnd}
          onPointerCancel={onPanEnd}
          onDoubleClick={() => canPan && resetImagePosition()}>
          {src ? (
            <img
              key={src}
              src={src}
              alt={current?.alt_description ?? ''}
              draggable={false}
              onLoad={(e) => {
                setNatural({
                  width: e.currentTarget.naturalWidth,
                  height: e.currentTarget.naturalHeight,
                })
                setLoaded(true)
              }}
              onError={() => setLoaded(true)}
              className='pointer-events-none absolute inset-0 h-full w-full select-none object-cover'
              style={{
                objectPosition: `${imagePosition.x}% ${imagePosition.y}%`,
              }}
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
          <div
            className={`pointer-events-none absolute inset-0 flex flex-col p-[6%] ${VERTICAL_CLASS[titleVertical]} ${ALIGN_CLASS[titleAlign]}`}>
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

          {/* 拖动提示，不会被导出 */}
          {canPan && !isOpenSelectArea && (
            <div
              className={`pointer-events-none absolute bottom-3 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/60 px-3 py-1 text-[11px] text-white/90 transition-opacity ${
                isPanning ? 'opacity-100' : 'opacity-0 lg:group-hover:opacity-100'
              }`}
              data-export-ignore='true'>
              拖动调整图片位置 · 双击复位
            </div>
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
