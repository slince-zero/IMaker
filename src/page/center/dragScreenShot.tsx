import { PointerEvent, useContext, useEffect, useRef } from 'react'
import { ImgContext, SelectArea } from '@/context'

const MIN_SIZE = 40

const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), Math.max(min, max))

// 导出选区：可拖动、可缩放，支持鼠标和触屏
const ScreenCapture = ({
  boundsWidth,
  boundsHeight,
}: {
  boundsWidth: number
  boundsHeight: number
}) => {
  const { selectArea, setSelectArea } = useContext(ImgContext)
  const dragRef = useRef<{
    mode: 'move' | 'resize'
    startX: number
    startY: number
    origin: SelectArea
  } | null>(null)

  // 画布尺寸变化时，保证选区仍在画布内
  useEffect(() => {
    if (boundsWidth <= 0 || boundsHeight <= 0) return
    setSelectArea((a) => {
      const width = clamp(a.width, MIN_SIZE, boundsWidth)
      const height = clamp(a.height, MIN_SIZE, boundsHeight)
      return {
        width,
        height,
        left: clamp(a.left, 0, boundsWidth - width),
        top: clamp(a.top, 0, boundsHeight - height),
      }
    })
  }, [boundsWidth, boundsHeight, setSelectArea])

  const start =
    (mode: 'move' | 'resize') => (e: PointerEvent<HTMLDivElement>) => {
      e.stopPropagation()
      e.preventDefault()
      e.currentTarget.setPointerCapture(e.pointerId)
      dragRef.current = {
        mode,
        startX: e.clientX,
        startY: e.clientY,
        origin: selectArea,
      }
    }

  const move = (e: PointerEvent<HTMLDivElement>) => {
    const d = dragRef.current
    if (!d) return
    e.stopPropagation()
    const dx = e.clientX - d.startX
    const dy = e.clientY - d.startY
    const o = d.origin
    if (d.mode === 'move') {
      setSelectArea({
        ...o,
        left: clamp(o.left + dx, 0, boundsWidth - o.width),
        top: clamp(o.top + dy, 0, boundsHeight - o.height),
      })
    } else {
      setSelectArea({
        ...o,
        width: clamp(o.width + dx, MIN_SIZE, boundsWidth - o.left),
        height: clamp(o.height + dy, MIN_SIZE, boundsHeight - o.top),
      })
    }
  }

  const end = (e: PointerEvent<HTMLDivElement>) => {
    dragRef.current = null
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId)
    }
  }

  return (
    <div
      className='pointer-events-none absolute inset-0 z-20'
      data-export-ignore='true'>
      <div
        className='pointer-events-auto absolute cursor-move touch-none select-none border-2 border-dashed border-white'
        style={{
          left: selectArea.left,
          top: selectArea.top,
          width: selectArea.width,
          height: selectArea.height,
          // 选区外变暗
          boxShadow: '0 0 0 9999px rgba(0,0,0,0.45)',
        }}
        onPointerDown={start('move')}
        onPointerMove={move}
        onPointerUp={end}
        onPointerCancel={end}>
        <span className='absolute -top-7 left-0 whitespace-nowrap rounded bg-black/70 px-1.5 py-0.5 text-[11px] text-white'>
          导出区域 {Math.round(selectArea.width * 2)}×
          {Math.round(selectArea.height * 2)}
        </span>
        <div
          className='absolute -bottom-2.5 -right-2.5 h-6 w-6 cursor-nwse-resize touch-none rounded-full border-2 border-primary bg-white shadow lg:h-4 lg:w-4 lg:-bottom-2 lg:-right-2'
          onPointerDown={start('resize')}
          onPointerMove={move}
          onPointerUp={end}
          onPointerCancel={end}
        />
      </div>
    </div>
  )
}

export default ScreenCapture
