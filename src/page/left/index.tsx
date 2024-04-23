import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Avatar,
  Button,
  Input,
  ScrollShadow,
} from '@nextui-org/react'
import { ImgLogo, UploadLogo } from './logo'

import { useState, useEffect, KeyboardEvent } from 'react'
import ImageItem from './ImageItem'
export default function LeftBoard() {
  const [imageList, setImageList] = useState<ImageItem[]>([])
  const [searchValue, setSearchValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // 获取图片
  async function getImage(searchText: string = '') {
    try {
      setIsLoading(true)
      const accessKey = 'cPSLU8ro2LKkaLQ71-RKKFFwb2g-_DIx9NCf27YnCHs'
      const endpoint =
        searchText.length > 0
          ? `https://api.unsplash.com/search/photos`
          : `https://api.unsplash.com/photos`
      const queryParam = searchText
        ? `&query=${encodeURIComponent(searchText)}`
        : ''
      const res = await fetch(
        `${endpoint}?per_page=30${queryParam}&client_id=${accessKey}`
      )
      const data = await res.json()
      if (data && data.results) {
        // 如果是使用搜索API，结果会在data.results中
        setImageList(data.results)
      } else {
        setImageList(data) // 直接访问 Unsplash collections/photos 数据在顶层
      }
      console.log(data);
      
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getImage()
  }, [])

  // 按下回车事件
  function onSearchKeyDown(e: KeyboardEvent<HTMLInputElement> | KeyboardEvent) {
    if (e.key === 'Enter') {
      getImage(searchValue)
    }
  }

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

      <ScrollShadow>
        <div className='flex-grow overflow-y-scroll overflow-x-hidden justify-center flex flex-wrap scrollbar-thin scrollbar-color-auto '>
          {imageList.length == 0 ? (
            <div className='flex items-center justify-center  transition-transform duration-200 transform hover:scale-105 rounded m-2 cursor-pointer w-5/12 object-cover h-screen'>
              没有找到图片
            </div>
          ) : (
            imageList.map((item) => {
              return (
                <img
                  key={item?.id}
                  src={item?.urls.small}
                  alt={item?.alt_description}
                  className='transition-transform duration-200 transform hover:scale-105 rounded m-2 cursor-pointer w-5/12 object-cover h-24'
                />
              )
            })
          )}
        </div>
      </ScrollShadow>

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
            value={searchValue}
            onValueChange={setSearchValue}
            onKeyDown={(e) => onSearchKeyDown(e)}
          />

          <NavbarContent justify='end'>
            <NavbarItem>
              <Button
                isLoading={isLoading}
                isIconOnly
                onClick={() => getImage(searchValue)}>
                搜索
              </Button>
            </NavbarItem>
          </NavbarContent>
        </Navbar>
      </>
    </div>
  )
}
