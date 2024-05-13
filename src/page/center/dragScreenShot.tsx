// 用来实现拖拽截图功能
// import { useRef } from 'react'
// import domtoimage from 'dom-to-image'

import { Button } from '@nextui-org/button'
import { SnipScreenShotLogo } from '@/page/right/write-logo'

const ScreenCapture = () => {
  return (
    <>
      <Button isIconOnly
        onClick={() => {
          console.log('ddddddd')
        }}>
        <SnipScreenShotLogo />
      </Button>
    </>
  )
}

export default ScreenCapture
