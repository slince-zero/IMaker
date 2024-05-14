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
    // e.clientX, e.clientY 为鼠标相对于div左上角的坐标
    setPosition({
      ...position,
      x: e.clientX,
      y: e.clientY,
    })
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
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
      const dx = e.clientX - position.x
      const dy = e.clientY - position.y
      const newWidth = position.width + dx
      const newHeight = position.height + dy
      if (newWidth > 0 && newHeight > 0) {
        setPosition((pos) => ({
          ...pos,
          width: newWidth,
          height: newHeight,
          x: e.clientX,
          y: e.clientY,
        }))
      }
    }
  }

  const onMouseUp = () => {
    setIsDragging(false)
    setIsResizing(false)
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
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
            opacity: 0.3,
            position: 'absolute',
            left: `${position.left}px`,
            top: `${position.top}px`,
            cursor: isDragging ? 'grabbing' : 'grab',
          }}
          onMouseDown={onMouseDown}>
          下载选中区域
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
