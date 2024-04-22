import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Avatar,
} from '@nextui-org/react'
import { ImgLogo } from './logo'
import { useState } from 'react'
export default function LeftBoard() {
  const [imageList, setImageList] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className='flex flex-col bg-slate-500 h-screen'>
      <>
        <Navbar>
          <NavbarBrand>
            <ImgLogo />
            <p className='font-bold text-inherit'>Img-Marker</p>
          </NavbarBrand>

          <NavbarContent justify='end'>
            <NavbarItem>
              <Avatar
                isBordered
                src='https://avatars.githubusercontent.com/u/40690276?v=4'
              />
            </NavbarItem>
          </NavbarContent>
        </Navbar>
      </>

      <></>
    </div>
  )
}
