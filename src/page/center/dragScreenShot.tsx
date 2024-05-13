import { useState, useContext } from 'react'
import { ImgContext } from '@/context'

const ScreenCapture = () => {
  const { isOpenSelectArea } = useContext(ImgContext)
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [position, setPosition] = useState({
    left: 0,
    top: 0,
    width: 200,
    height: 200,
    x: 0,
    y: 0,
  })

  const onMouseDown = (e: any) => {
    setIsDragging(true)
    setPosition({
      ...position,
      x: e.clientX,
      y: e.clientY,
    })
  }

  const onMouseMove = (e: any) => {
    if (isDragging) {
      const dx = e.clientX - position.x
      const dy = e.clientY - position.y
      setPosition({
        ...position,
        left: position.left + dx,
        top: position.top + dy,
        x: e.clientX,
        y: e.clientY,
      })
    } else if (isResizing) {
      const newWidth = e.clientX - position.left
      const newHeight = e.clientY - position.top
      if (newWidth > 0 && newHeight > 0) {
        setPosition({
          ...position,
          width: newWidth,
          height: newHeight,
        })
      }
    }
  }

  const onMouseUp = () => {
    setIsDragging(false)
    setIsResizing(false)
  }

  const onResizeMouseDown = (e: any) => {
    e.stopPropagation() // 阻止mousedown事件冒泡到父元素
    setIsResizing(true)
    setPosition({
      ...position,
      x: e.clientX,
      y: e.clientY,
    })
  }

  return (
    <div
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}>
      {isOpenSelectArea && (
        <div
          style={{
            height: `${position.height}px`,
            width: `${position.width}px`,
            backgroundColor: 'blue',
            position: 'absolute',
            left: `${position.left}px`,
            top: `${position.top}px`,
            cursor: isDragging ? 'grabbing' : 'grab',
          }}
          onMouseDown={onMouseDown}>
          拖拽截图
          <div
            style={{
              position: 'absolute',
              bottom: '0',
              right: '0',
              width: '10px',
              height: '10px',
              backgroundColor: 'red',
              cursor: 'nwse-resize',
            }}
            onMouseDown={onResizeMouseDown}
          />
        </div>
      )}
    </div>
  )
}

export default ScreenCapture
