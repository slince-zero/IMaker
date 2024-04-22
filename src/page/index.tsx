// main page
import LeftBoard from '@/page/left'
export default function Main() {
  return (
    <div className='conatainer flex h-screen'>
      <div className='left w-[20%] '>
        <LeftBoard />
      </div>
      <div className='center w-[60%] '>center</div>
      <div className='right w-[20%] '>right</div>
    </div>
  )
}
