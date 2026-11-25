import { useContext, useEffect, useRef } from 'react'
import { Stage, Layer, Line } from 'react-konva'
import { ImgContext } from '@/context'

// 手写板：支持鼠标和触屏
function HandWriting({ width, height }: { width: number; height: number }) {
  const { boardTool, penSize, board_pen_color, lines, setLines } =
    useContext(ImgContext)
  const isDrawing = useRef(false)
  const enabled = boardTool !== 'none'

  useEffect(() => {
    const stop = () => {
      isDrawing.current = false
    }
    window.addEventListener('mouseup', stop)
    window.addEventListener('touchend', stop)
    return () => {
      window.removeEventListener('mouseup', stop)
      window.removeEventListener('touchend', stop)
    }
  }, [])

  const handleDown = (e: any) => {
    if (!enabled) return
    const pos = e.target.getStage()?.getPointerPosition()
    if (!pos) return
    isDrawing.current = true
    setLines((prev) => [
      ...prev,
      {
        boardTool,
        points: [pos.x, pos.y],
        color: board_pen_color,
        // 橡皮擦粗一点更好用
        strokeWidth: boardTool === 'rubber' ? penSize * 4 : penSize,
      },
    ])
  }

  const handleMove = (e: any) => {
    if (!isDrawing.current) return
    e.evt?.preventDefault?.()
    const pos = e.target.getStage()?.getPointerPosition()
    if (!pos) return
    setLines((prev) => {
      if (prev.length === 0) return prev
      const last = prev[prev.length - 1]
      return [
        ...prev.slice(0, -1),
        { ...last, points: [...last.points, pos.x, pos.y] },
      ]
    })
  }

  const handleUp = () => {
    isDrawing.current = false
  }

  if (width <= 0 || height <= 0) return null

  return (
    <div
      className='absolute inset-0'
      style={{
        pointerEvents: enabled ? 'auto' : 'none',
        touchAction: enabled ? 'none' : 'auto',
        cursor: enabled ? 'crosshair' : 'default',
      }}>
      <Stage
        width={width}
        height={height}
        onMouseDown={handleDown}
        onMouseMove={handleMove}
        onMouseUp={handleUp}
        onTouchStart={handleDown}
        onTouchMove={handleMove}
        onTouchEnd={handleUp}>
        <Layer>
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke={line.color}
              strokeWidth={Number(line.strokeWidth)}
              tension={0.5}
              lineCap='round'
              lineJoin='round'
              globalCompositeOperation={
                line.boardTool === 'rubber' ? 'destination-out' : 'source-over'
              }
            />
          ))}
        </Layer>
      </Stage>
    </div>
  )
}

export default HandWriting
