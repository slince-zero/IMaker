// main page
import LeftBoard from '@/page/left'
import CenterBoard from '@/page/center'
import RightBoard from '@/page/right'
import { ImageDownloadProvider } from '@/context/imageDownload'
export default function Main() {
  return (
    <div className='container flex h-screen overflow-x-hidden'>
      <div className='left min-w-80 max-w-80'>
        <LeftBoard />
      </div>
      <ImageDownloadProvider>
        <div className='flex items-center justify-center w-full px-5  overflow-x-auto min-w-[800px]'>
          <CenterBoard />
        </div>
        <div className='right min-w-80 max-w-80'>
          <RightBoard />
        </div>
      </ImageDownloadProvider>
    </div>
  )
}
