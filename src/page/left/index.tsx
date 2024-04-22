import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Avatar,
  Button,
  Input,
} from '@nextui-org/react'
import { ImgLogo, UploadLogo } from './logo'

import { useState, useEffect } from 'react'
import ImageItem from './ImageItem'
export default function LeftBoard() {
  const [imageList, setImageList] = useState<ImageItem[]>([])
  const [searchValue, setSearchValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // let key="cPSLU8ro2LKkaLQ71-RKKFFwb2g-_DIx9NCf27YnCHs"

  // https://api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY

  async function getImage() {
    const res = await fetch(
      'https://api.unsplash.com/photos?per_page=30&client_id=cPSLU8ro2LKkaLQ71-RKKFFwb2g-_DIx9NCf27YnCHs'
    )
    const data = await res.json()
    setImageList(data)
  }
  useEffect(() => {
    getImage()
  }, [])

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

      <div className='flex-grow overflow-y-scroll overflow-x-hidden justify-center flex flex-wrap scrollbar-thin scrollbar-color-auto '>
        {imageList.map((item) => {
          return (
            <img
              key={item?.id}
              src={item?.urls.small}
              alt={item?.alt_description}
              className='transition-transform duration-200 transform hover:scale-105 rounded m-2 cursor-pointer w-5/12 object-cover h-24'
            />
          )
        })}
      </div>

      <>
        <Navbar>
          <Button
            variant='flat'
            isIconOnly>
            <UploadLogo />
          </Button>

          <Input
            type='search'
            color='default'
            placeholder='请输入内容搜索图片'
          />

          <NavbarContent justify='end'>
            <NavbarItem>
              <Button>搜索</Button>
            </NavbarItem>
          </NavbarContent>
        </Navbar>
      </>
    </div>
  )
}
