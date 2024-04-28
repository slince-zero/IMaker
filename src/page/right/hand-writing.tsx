import { useState, useRef, useContext } from 'react'
import { Stage, Layer, Line } from 'react-konva'
import { ImgContext } from '@/context'

interface LineInfo {
  boardTool: string
  points: number[]
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
    setLines([...lines, { boardTool, points: [pos.x, pos.y] }])
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
              stroke={board_pen_color}
              strokeWidth={Number(penSize)}
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
