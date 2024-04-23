// main page
import LeftBoard from '@/page/left'
import CenterBoard from '@/page/center'
import RightBoard from '@/page/right'
export default function Main() {
  return (
    <div className='conatainer flex h-screen overflow-x-hidden'>
      <div className='left min-w-80 max-w-80'>
        <LeftBoard />
      </div>
      <div className='center flex-grow overflow-x-auto '>
        <CenterBoard />
      </div>
      <div className='right w-[20%] min-w-80 max-w-80'>
        <RightBoard />
      </div>
    </div>
  )
}
