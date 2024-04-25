import {
  createContext,
  useEffect,
  useState,
  KeyboardEvent,
  ReactNode,
} from 'react'
import ImageItem from '@/page/left/ImageItem'

export const ImgContext = createContext({
  imgList: [],
  setImgList: () => {},
} as any)

export default function ImgContextProvider({
  children,
}: {
  children: ReactNode
}) {
  const [imageList, setImageList] = useState<ImageItem[]>([])
  const [searchValue, setSearchValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  // setImgInfo在left组件中存储图片数据，imgInfo给center组件传递图片数据
  const [imgInfo, setImgInfo] = useState<any>({})
  // 用户上传图片的state
  const [uploadCurrentImage, setUploadCurrentImage] = useState<any>(null)
  // 用于判断是否是上传图片，还是默认通过API获取的图片
  const [isUpload, setIsUpload] = useState(false)
  // 作者标签值
  const [authorValue, setAuthorValue] = useState('@IMker')

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
      // console.log(imageList,'33')
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
      setSearchValue('')
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

  // 上传图片
  function uploadImage(file: any) {
    try {
      if (file) {
        const newImageUrl = URL.createObjectURL(file) // 简易本地示例
        setUploadCurrentImage({ urls: { regular: newImageUrl } }) // 设置为能够展示格式
        setIsUpload(true)
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <ImgContext.Provider
      value={{
        imageList,
        setImageList,
        searchValue,
        setSearchValue,
        isLoading,
        setIsLoading,
        getImage,
        onSearchKeyDown,
        setImgInfo,
        imgInfo,
        uploadImage,
        uploadCurrentImage,
        isUpload,
        setIsUpload,
        authorValue,
        setAuthorValue,
      }}>
      {children}
    </ImgContext.Provider>
  )
}
