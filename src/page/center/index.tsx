import { useContext } from 'react'
import { ImgContext } from '@/context'
export default function CenterBoard() {
  const { imgInfo } = useContext(ImgContext)
  console.log(imgInfo);
  
  return <div className='max-h-screen  flex  rounded-3xl'>
    <img src={imgInfo?.urls?.regular} alt="" />
  </div>
}
