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
import { ImgContext } from '@/context'
import { Key, useContext } from 'react'

export default function LeftBoard() {
  const {
    imageList,
    searchValue,
    setSearchValue,
    isLoading,
    getImage,
    onSearchKeyDown,
    setImgInfo,
    uploadImage,
    setIsUpload,
  } = useContext(ImgContext)

  function handleUploadImage(event: any) {
    const file = event.target.files[0]
    if (file) {
      uploadImage(file)
      // 浏览器对于文件重新选择，不会执行上次的操作，所以这里清空值，让上传相同图片可以执行
      event.target.value = ''
    }
  }

  return (
    <div className='flex flex-col bg-slate-500 h-screen'>
      <>
        <Navbar>
          <NavbarBrand>
            {/* <ImgLogo /> */}
            <img src="public/favicon.png" alt="" />
            <p className='font-bold text-inherit'>IMker</p>
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
          {imageList && imageList?.length == 0 ? (
            <div className='flex items-center justify-center  transition-transform duration-200 transform hover:scale-105 rounded m-2 cursor-pointer w-5/12 object-cover h-screen'>
              没有找到图片
            </div>
          ) : (
            imageList &&
            imageList.map(
              (item: {
                id: Key | null | undefined
                urls: { small: string | undefined }
                alt_description: string | undefined
              }) => {
                return (
                  <img
                    key={item.id}
                    src={item.urls.small}
                    alt={item.alt_description}
                    className='transition-transform duration-200 transform hover:scale-105 rounded m-2 cursor-pointer w-5/12 object-cover h-24'
                    onClick={() => {
                      setImgInfo(item)
                      setIsUpload(false)
                    }}
                  />
                )
              }
            )
          )}
        </div>
      </ScrollShadow>

      <>
        <Navbar>
          {/* 上传图片 */}
          <label>
            <input
              type='file'
              onChange={handleUploadImage}
              className='hidden'
            />
            <Button
              variant='flat'
              isIconOnly
              as='span'>
              <UploadLogo />
            </Button>
          </label>

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
