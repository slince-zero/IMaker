import {
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Skeleton,
  Textarea,
  useDisclosure,
} from '@nextui-org/react'
import { ChangeEvent, useContext } from 'react'
import { ImgContext } from '@/context'
import {
  RefreshIcon,
  SearchIcon,
  SparkleIcon,
  UploadIcon,
} from '@/components/icons'

export default function LeftBoard({ columns = 2 }: { columns?: 2 | 3 }) {
  const {
    imageList,
    searchValue,
    setSearchValue,
    isLoading,
    getImage,
    onSearchKeyDown,
    imgInfo,
    setImgInfo,
    uploadImage,
    isUpload,
    setIsUpload,
    aiValue,
    setAiValue,
    aiResult,
    aiError,
    loadingAIImage,
    handleGenerateAIImage,
    handleSubmitAIImage,
  } = useContext(ImgContext)

  // AI 生成图片的弹窗
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  function handleUploadImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (file) {
      uploadImage(file)
      // 清空 value，保证再次选择同一张图片也能触发 onChange
      event.target.value = ''
    }
  }

  const gridCols = columns === 3 ? 'grid-cols-3' : 'grid-cols-2'

  return (
    <div className='flex h-full min-h-0 flex-col'>
      {/* 搜索 & 操作 */}
      <div className='space-y-2 border-b border-white/5 p-3'>
        <div className='flex gap-2'>
          <Input
            size='sm'
            type='search'
            aria-label='搜索图片'
            placeholder='搜索图片，如 mountain'
            value={searchValue}
            onValueChange={setSearchValue}
            onKeyDown={onSearchKeyDown}
            startContent={<SearchIcon className='text-zinc-400' size={16} />}
            classNames={{ inputWrapper: 'bg-white/5 data-[hover=true]:bg-white/10' }}
          />
          <Button
            size='sm'
            color='primary'
            className='h-8 shrink-0'
            isLoading={isLoading}
            onPress={() => getImage(searchValue)}>
            搜索
          </Button>
        </div>
        <div className='grid grid-cols-2 gap-2'>
          {/* 用 label 包裹 input，点击按钮即可选择文件 */}
          <label className='block cursor-pointer'>
            <input
              type='file'
              accept='image/*'
              onChange={handleUploadImage}
              className='hidden'
            />
            <Button
              as='span'
              size='sm'
              variant='flat'
              className='w-full'
              startContent={<UploadIcon size={16} />}>
              上传图片
            </Button>
          </label>
          <Button
            size='sm'
            onPress={onOpen}
            className='bg-gradient-to-r from-fuchsia-500 to-amber-500 font-medium text-white'
            startContent={<SparkleIcon size={16} />}>
            AI 生成
          </Button>
        </div>
      </div>

      {/* 图片列表 */}
      <div className='thin-scrollbar min-h-0 flex-1 overflow-y-auto p-3'>
        {isLoading && imageList.length === 0 ? (
          <div className={`grid ${gridCols} gap-2`}>
            {Array.from({ length: 12 }).map((_, i) => (
              <Skeleton
                key={i}
                className='aspect-[4/3] rounded-lg'
              />
            ))}
          </div>
        ) : imageList.length === 0 ? (
          <div className='flex h-full min-h-40 flex-col items-center justify-center gap-3 px-4 text-center text-sm text-zinc-400'>
            <p>没有找到图片</p>
            <p className='text-xs text-zinc-500'>
              Unsplash 接口每小时限 50 次请求，可以稍后再试，或直接上传本地图片
            </p>
            <Button
              size='sm'
              variant='flat'
              onPress={() => getImage('')}>
              重新加载
            </Button>
          </div>
        ) : (
          <div
            className={`grid ${gridCols} gap-2 transition-opacity ${
              isLoading ? 'opacity-50' : ''
            }`}>
            {imageList.map((item) => {
              const active = !isUpload && imgInfo?.id === item.id
              return (
                <button
                  key={item.id}
                  type='button'
                  title={item.alt_description ?? ''}
                  onClick={() => {
                    setImgInfo(item)
                    setIsUpload(false)
                  }}
                  style={{ backgroundColor: item.color }}
                  className={`group relative aspect-[4/3] overflow-hidden rounded-lg outline-none ring-offset-2 ring-offset-zinc-900 transition focus-visible:ring-2 focus-visible:ring-primary ${
                    active ? 'ring-2 ring-primary' : ''
                  }`}>
                  <img
                    src={item.urls.small}
                    alt={item.alt_description ?? ''}
                    loading='lazy'
                    className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
                  />
                  {item.user?.name && (
                    <span className='pointer-events-none absolute inset-x-0 bottom-0 truncate bg-gradient-to-t from-black/70 to-transparent px-2 pb-1 pt-4 text-left text-[10px] text-white/80 opacity-0 transition-opacity group-hover:opacity-100'>
                      {item.user.name}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        )}
      </div>

      <div className='flex items-center justify-between border-t border-white/5 px-3 py-2 text-xs text-zinc-500'>
        <span>图片来自 Unsplash</span>
        <Button
          size='sm'
          variant='light'
          className='h-7 min-w-0 px-2 text-xs text-zinc-300'
          isDisabled={isLoading}
          startContent={<RefreshIcon size={14} />}
          onPress={() => getImage('')}>
          换一批
        </Button>
      </div>

      <Modal
        backdrop='blur'
        placement='auto'
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior='inside'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex items-center gap-2'>
                <SparkleIcon className='text-amber-400' />
                AI 生成图片
              </ModalHeader>
              <ModalBody>
                <Textarea
                  minRows={2}
                  label='图片描述（建议用英文）'
                  placeholder='e.g. a cozy cabin in snowy mountains, sunset, cinematic'
                  value={aiValue}
                  onValueChange={setAiValue}
                />
                <Button
                  color='success'
                  isLoading={loadingAIImage}
                  onPress={handleGenerateAIImage}>
                  {aiResult ? '重新生成' : '生成'}
                </Button>
                {aiError && <p className='text-sm text-danger'>{aiError}</p>}
                <div className='flex aspect-square w-full items-center justify-center overflow-hidden rounded-lg bg-white/5'>
                  {loadingAIImage ? (
                    <Skeleton className='h-full w-full' />
                  ) : aiResult ? (
                    <img
                      src={aiResult}
                      alt='ai-img'
                      className='h-full w-full object-cover'
                    />
                  ) : (
                    <span className='text-sm text-zinc-500'>生成结果会显示在这里</span>
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  variant='light'
                  onPress={onClose}>
                  取消
                </Button>
                <Button
                  isDisabled={!aiResult || loadingAIImage}
                  onPress={() => {
                    handleSubmitAIImage()
                    onClose()
                  }}
                  className='bg-gradient-to-tr from-pink-500 to-yellow-500 text-white'>
                  使用这张
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}
