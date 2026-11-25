import { useState, useRef, useContext, useEffect } from 'react'
import { Stage, Layer, Line } from 'react-konva'
import { ImgContext } from '@/context'

interface LineInfo {
  boardTool: string
  points: number[]
  color: string
  strokeWidth: number
}

interface ContextProp {
  boardTool: string
  penSize: number
  board_pen_color: string
}

function HandWriting() {
  const { boardTool, penSize, board_pen_color } =
    useContext<ContextProp>(ImgContext)
  const [lines, setLines] = useState<LineInfo[]>([])
  const isDrawing = useRef<boolean>(false)

  const handleMouseDown = (e: any) => {
    isDrawing.current = true
    const pos = e.target.getStage().getPointerPosition()
    setLines([
      ...lines,
      {
        boardTool,
        points: [pos.x, pos.y],
        color: board_pen_color,
        strokeWidth: penSize,
      },
    ])
  }

  const handleMouseMove = (e: any) => {
    if (!isDrawing.current) {
      return
    }
    const stage = e.target.getStage()
    const point = stage.getPointerPosition()
    let lastLine = lines[lines.length - 1]
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y])

    // replace last
    lines.splice(lines.length - 1, 1, lastLine)
    setLines([...lines])
  }

  const handleMouseUp = () => {
    isDrawing.current = false
  }

  // 撤销逻辑
  useEffect(() => {
    // 监听键盘事件
    const handleKeyDown = (e: KeyboardEvent) => {
      // 判断一下电脑系统
      const userAgent = navigator.userAgent.toLowerCase()

      if (userAgent.indexOf('windows') > -1) {
        // Windows系统
        if (e.ctrlKey && e.key === 'z') {
          // 移除最后一条线并更新状态
          setLines(lines.slice(0, lines.length - 1))
        }
      } else if (userAgent.indexOf('mac') > -1) {
        // Mac系统
        if (e.metaKey && e.key === 'z') {
          // 如果'command'键和'z'键同时被按下，移除最后一条线并更新状态
          setLines(lines.slice(0, lines.length - 1))
        }
      }
    }
    // 绑定键盘事件监听器
    window.addEventListener('keydown', handleKeyDown)

    // 清楚监听器
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [lines])

  return (
    <div>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}>
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
