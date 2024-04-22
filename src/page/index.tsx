// main page
import LeftBoard from '@/page/left'
import CenterBoard from '@/page/center'
export default function Main() {
  return (
    <div className='conatainer flex h-screen'>
      <div className='left w-[20%] '>
        <LeftBoard />
      </div>
      <div className='center w-[60%] '>
        <CenterBoard />
      </div>
      <div className='right w-[20%] '>right</div>
    </div>
  )
}
