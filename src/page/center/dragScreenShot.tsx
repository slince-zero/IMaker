// 用来实现拖拽截图功能
// import { useRef } from 'react'
// import domtoimage from 'dom-to-image'
import { ImgContext } from '@/context'
import { useContext } from 'react'

const ScreenCapture = () => {
  const { isOpenSelectArea } = useContext(ImgContext)
  return (
    <div>
      {isOpenSelectArea === true ? (
        <div
          style={{
            height: '200px',
            width: '200px',
            backgroundColor: 'red',
          }}>
          拖拽截图
        </div>
      ) : null}
    </div>
  )
}

export default ScreenCapture
