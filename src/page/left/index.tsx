import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Avatar,
  Button,
  Input,
  ScrollShadow,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/react'
import { UploadLogo } from './logo'
import { ImgContext } from '@/context'
import { Key, useContext, useState } from 'react'

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

  // 用于AI生成图片的弹出窗
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [aiValue, setAiValue] = useState('')
  const [aiResult, setAiResult] = useState<any>(null)

  function handleUploadImage(event: any) {
    const file = event.target.files[0]
    if (file) {
      uploadImage(file)
      // 浏览器对于文件重新选择，不会执行上次的操作，所以这里清空值，让上传相同图片可以执行
      event.target.value = ''
    }
  }

  // 打开弹出窗
  function handleOpen() {
    onOpen()
  }

  async function query(data: any) {
    const response = await fetch(
      'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0',
      {
        headers: {
          Authorization: 'Bearer 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',
        },
        method: 'POST',
        body: JSON.stringify(data),
      }
    )
    const result = await response.blob()
    return result
  }

  function handleGenerateAIImage() {
    const data = {
      inputs: aiValue,
    }
    query(data).then((res) => {
      const url = URL.createObjectURL(res)
      setAiResult(url)
    })
  }

  return (
    <div className='flex flex-col bg-slate-500 h-screen'>
      <>
        <Navbar>
          <NavbarBrand>
            <img
              src='/favicon-left.png'
              alt=''
            />
            <p className='font-bold text-inherit'>IMker</p>
          </NavbarBrand>

          <NavbarContent justify='end'>
            <NavbarItem>
              <Avatar
                isBordered
                src='/user.png'
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
        <Navbar className='relative'>
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

          <div className='flex absolute top-[-40px] left-2 w-24 h-7 bg-black bg-opacity-65 rounded-[8px] items-center justify-center '>
            <Button
              onPress={handleOpen}
              className='text-white cursor-pointer'>
              🌟AI生成🔥
            </Button>
          </div>
        </Navbar>
      </>

      <>
        <Modal
          backdrop='blur'
          isOpen={isOpen}
          onClose={onClose}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className='flex flex-col gap-1'>
                  AI生成（test）
                </ModalHeader>
                <ModalBody>
                  <div>
                    <div className='flex'>
                      <Input
                        type='text'
                        placeholder='请输入内容'
                        onChange={(e) => setAiValue(e.target.value)}
                      />
                      <Button
                        color='success'
                        className='ml-2'
                        onClick={handleGenerateAIImage}>
                        生成
                      </Button>
                    </div>
                    <div>
                      <img
                        src={aiResult}
                        alt='ai'
                        className='w-[400px] h-[400px]'
                      />
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color='danger'
                    variant='light'
                    onPress={onClose}>
                    取消
                  </Button>
                  <Button
                    onPress={onClose}
                    className='bg-gradient-to-tr from-pink-500 to-yellow-500'>
                    使用
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    </div>
  )
}
