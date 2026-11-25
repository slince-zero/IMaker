import {
  createContext,
  useEffect,
  useState,
  KeyboardEvent,
  ReactNode,
  ReactElement,
  Dispatch,
  SetStateAction,
} from 'react'
import ImageItem from '@/page/left/ImageItem'

import {
  BottomLeftIcon,
  BottomRightIcon,
  MiddleIcon,
  TopLeftIcon,
  ToprightIcon,
} from '@/page/right/posotion-logo'

export type BoardTool = 'none' | 'pen' | 'rubber'

export interface LineInfo {
  boardTool: BoardTool
  points: number[]
  color: string
  strokeWidth: number
}

export interface SelectArea {
  left: number
  top: number
  width: number
  height: number
}

export interface CanvasImage {
  id?: string
  urls?: { regular?: string; small?: string }
  alt_description?: string | null
  // 用于下载文件名：搜索关键词 / 上传的文件名 / AI 描述
  keyword?: string
}

// 标题位置（#4）
export type TitleVertical = 'top' | 'middle' | 'bottom'
export type TitleAlign = 'left' | 'center' | 'right'

// 背景图显示位置，百分比，对应 object-position（#2）
export interface ImagePosition {
  x: number
  y: number
}

export const DEFAULT_IMAGE_POSITION: ImagePosition = { x: 50, y: 50 }

export interface AuthorPositionStyle {
  position?: 'absolute'
  top?: string
  bottom?: string
  left?: string
  right?: string
}

export interface AuthorPositionItem {
  id: string
  label: string
  position: ReactElement
  value: AuthorPositionStyle
}

type Setter<T> = Dispatch<SetStateAction<T>>

export interface ImgContextValue {
  // 图库
  imageList: ImageItem[]
  searchValue: string
  setSearchValue: Setter<string>
  // 当前图库列表对应的搜索关键词
  listKeyword: string
  isLoading: boolean
  getImage: (searchText?: string) => Promise<void>
  onSearchKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void
  imgInfo: CanvasImage
  setImgInfo: Setter<CanvasImage>
  uploadImage: (file: File) => void
  uploadCurrentImage: CanvasImage | null
  isUpload: boolean
  setIsUpload: Setter<boolean>
  // AI
  aiValue: string
  setAiValue: Setter<string>
  aiResult: string | null
  aiError: string
  loadingAIImage: boolean
  handleGenerateAIImage: () => Promise<void>
  handleSubmitAIImage: () => void
  // 画布
  proportionValue: string
  setProportionValue: Setter<string>
  handleProportionValue: (value: string) => void
  isCircle: boolean
  setIsCircle: Setter<boolean>
  handleIsCircle: () => void
  hexColor: string
  setHexColor: Setter<string>
  handleChangeCompleteColor: (color: { hex: string }) => void
  opacityValue: number
  setOpacityValue: Setter<number>
  imagePosition: ImagePosition
  setImagePosition: Setter<ImagePosition>
  resetImagePosition: () => void
  // 文字
  titleValue: string
  setTitleValue: Setter<string>
  titleVertical: TitleVertical
  setTitleVertical: Setter<TitleVertical>
  titleAlign: TitleAlign
  setTitleAlign: Setter<TitleAlign>
  fontValue: string
  setFontValue: Setter<string>
  handleChangeFont: (value: string) => void
  fontSizeValue: number
  setFontSizeValue: Setter<number>
  handleChangeFontSize: (value: number) => void
  authorValue: string
  setAuthorValue: Setter<string>
  authorPositionId: string
  authorPosition: AuthorPositionStyle
  authorPositionList: AuthorPositionItem[]
  handleAuthorPosition: (id: string) => void
  // 画板
  boardTool: BoardTool
  setBoardTool: Setter<BoardTool>
  penSize: number
  setPenSize: Setter<number>
  handlePenSize: (size: number) => void
  board_pen_color: string
  setBoardPenColor: Setter<string>
  handleChangeBoardPenColor: (color: { hex: string }) => void
  lines: LineInfo[]
  setLines: Setter<LineInfo[]>
  undoLine: () => void
  clearLines: () => void
  // 导出选区
  isOpenSelectArea: boolean
  setIsOpenSelectArea: Setter<boolean>
  selectArea: SelectArea
  setSelectArea: Setter<SelectArea>
}

export const ImgContext = createContext<ImgContextValue>({} as ImgContextValue)

// 作者水印位置：左下、右下、居中（跟随标题）、左上、右上
const authorPositionList: AuthorPositionItem[] = [
  {
    id: 'bottom-left',
    label: '左下',
    position: <BottomLeftIcon />,
    value: { position: 'absolute', bottom: '0', left: '0' },
  },
  {
    id: 'bottom-right',
    label: '右下',
    position: <BottomRightIcon />,
    value: { position: 'absolute', bottom: '0', right: '0' },
  },
  {
    id: 'middle',
    label: '居中',
    position: <MiddleIcon />,
    value: {},
  },
  {
    id: 'top-left',
    label: '左上',
    position: <TopLeftIcon />,
    value: { position: 'absolute', top: '0', left: '0' },
  },
  {
    id: 'top-right',
    label: '右上',
    position: <ToprightIcon />,
    value: { position: 'absolute', top: '0', right: '0' },
  },
]

export default function ImgContextProvider({
  children,
}: {
  children: ReactNode
}) {
  const [imageList, setImageList] = useState<ImageItem[]>([])
  const [searchValue, setSearchValue] = useState('')
  const [listKeyword, setListKeyword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  // 当前选中的图库图片
  const [imgInfo, setImgInfo] = useState<CanvasImage>({})
  // 用户上传的图片
  const [uploadCurrentImage, setUploadCurrentImage] =
    useState<CanvasImage | null>(null)
  // 当前画布使用的是上传图片还是图库图片
  const [isUpload, setIsUpload] = useState(false)

  // AI 生成
  const [aiValue, setAiValue] = useState('')
  const [aiResult, setAiResult] = useState<string | null>(null)
  const [aiError, setAiError] = useState('')
  const [loadingAIImage, setLoadingAIImage] = useState(false)

  // 画布
  const [proportionValue, setProportionValue] = useState('aspect-[16/9]')
  const [isCircle, setIsCircle] = useState(true)
  const [hexColor, setHexColor] = useState('#3F51B5')
  const [opacityValue, setOpacityValue] = useState(0.15)
  const [imagePosition, setImagePosition] = useState<ImagePosition>(
    DEFAULT_IMAGE_POSITION
  )

  // 文字
  const [titleValue, setTitleValue] = useState('花开花落，你陪了我多少年')
  const [titleVertical, setTitleVertical] = useState<TitleVertical>('middle')
  const [titleAlign, setTitleAlign] = useState<TitleAlign>('center')
  const [fontValue, setFontValue] = useState('font-dingtalk')
  const [fontSizeValue, setFontSizeValue] = useState(32)
  const [authorValue, setAuthorValue] = useState('@IMaker')
  const [authorPositionId, setAuthorPositionId] = useState('bottom-right')

  // 画板：默认关闭，避免误触（尤其是移动端）
  const [boardTool, setBoardTool] = useState<BoardTool>('none')
  const [penSize, setPenSize] = useState<number>(3)
  const [board_pen_color, setBoardPenColor] = useState('#E23922')
  const [lines, setLines] = useState<LineInfo[]>([])

  // 导出选区
  const [isOpenSelectArea, setIsOpenSelectArea] = useState(false)
  const [selectArea, setSelectArea] = useState<SelectArea>({
    left: 24,
    top: 24,
    width: 200,
    height: 120,
  })

  // 获取图片
  async function getImage(searchText: string = '') {
    setIsLoading(true)
    try {
      const accessKey = import.meta.env.VITE_PUBLIC_UNSPLASH_API_KEY
      const keyword = searchText.trim()
      const endpoint = keyword
        ? 'https://api.unsplash.com/search/photos'
        : 'https://api.unsplash.com/photos'
      // 搜索时从第一页开始，避免随机页码导致没有结果
      const page = keyword ? 1 : Math.floor(Math.random() * 100) + 1
      const queryParam = keyword ? `&query=${encodeURIComponent(keyword)}` : ''
      const res = await fetch(
        `${endpoint}?per_page=30&page=${page}${queryParam}&client_id=${accessKey}`
      )
      const data = await res.json()
      const list: ImageItem[] = Array.isArray(data)
        ? data
        : Array.isArray(data?.results)
        ? data.results
        : []
      setImageList(list)
      setListKeyword(keyword)
      // 首次进入时自动选中第一张，画布不再是空的
      if (list.length > 0) {
        setImgInfo((prev) =>
          prev?.urls?.regular ? prev : { ...list[0], keyword }
        )
      }
    } catch (e) {
      console.error(e)
      setImageList([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getImage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 撤销：Ctrl/⌘ + Z，在输入框里时不拦截
  useEffect(() => {
    const onKeyDown = (e: globalThis.KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return
      }
      if ((e.metaKey || e.ctrlKey) && !e.shiftKey && e.key.toLowerCase() === 'z') {
        e.preventDefault()
        setLines((prev) => prev.slice(0, -1))
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  function onSearchKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      getImage(searchValue)
    }
  }

  function uploadImage(file: File) {
    try {
      if (file) {
        if (uploadCurrentImage?.urls?.regular) {
          URL.revokeObjectURL(uploadCurrentImage.urls.regular)
        }
        const newImageUrl = URL.createObjectURL(file)
        setUploadCurrentImage({
          urls: { regular: newImageUrl },
          // 去掉扩展名，作为下载文件名的关键词
          keyword: file.name.replace(/\.[^.]+$/, ''),
        })
        setIsUpload(true)
      }
    } catch (e) {
      console.error(e)
    }
  }

  function handleProportionValue(value: string) {
    setProportionValue(value)
  }

  function handleIsCircle() {
    setIsCircle((v) => !v)
  }

  function handleChangeFont(value: string) {
    if (value) setFontValue(value)
  }

  function handleChangeFontSize(value: number) {
    setFontSizeValue(value)
  }

  function handleAuthorPosition(id: string) {
    setAuthorPositionId(id)
  }

  function handleChangeCompleteColor(color: { hex: string }) {
    setHexColor(color.hex.toUpperCase())
  }

  function handlePenSize(size: number) {
    setPenSize(Number(size))
  }

  function handleChangeBoardPenColor(color: { hex: string }) {
    setBoardPenColor(color.hex.toUpperCase())
  }

  function resetImagePosition() {
    setImagePosition(DEFAULT_IMAGE_POSITION)
  }

  function undoLine() {
    setLines((prev) => prev.slice(0, -1))
  }

  function clearLines() {
    setLines([])
  }

  // 调用 Hugging Face 生成图片
  async function query(data: { inputs: string }) {
    const accessToken = import.meta.env.VITE_PUBLIC_HUGGINGFACE_API_KEY
    const response = await fetch(
      'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0',
      {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
        method: 'POST',
        body: JSON.stringify(data),
      }
    )
    if (!response.ok) {
      throw new Error(await response.text())
    }
    return response.blob()
  }

  async function handleGenerateAIImage() {
    if (!aiValue.trim()) {
      setAiError('请先输入图片描述')
      return
    }
    setAiError('')
    setLoadingAIImage(true)
    try {
      const blob = await query({ inputs: aiValue.trim() })
      if (!blob.type.startsWith('image/')) {
        throw new Error('返回的不是图片')
      }
      setAiResult(URL.createObjectURL(blob))
    } catch (e) {
      console.error(e)
      setAiError('生成失败，模型可能正在加载，请稍后再试')
    } finally {
      setLoadingAIImage(false)
    }
  }

  // 把 AI 图片放到画布上
  function handleSubmitAIImage() {
    if (!aiResult) return
    setImgInfo({
      urls: { regular: aiResult, small: aiResult },
      keyword: aiValue.trim(),
    })
    setIsUpload(false)
  }

  const authorPosition =
    authorPositionList.find((item) => item.id === authorPositionId)?.value ?? {}

  return (
    <ImgContext.Provider
      value={{
        imageList,
        searchValue,
        setSearchValue,
        listKeyword,
        isLoading,
        getImage,
        onSearchKeyDown,
        imgInfo,
        setImgInfo,
        uploadImage,
        uploadCurrentImage,
        isUpload,
        setIsUpload,
        aiValue,
        setAiValue,
        aiResult,
        aiError,
        loadingAIImage,
        handleGenerateAIImage,
        handleSubmitAIImage,
        proportionValue,
        setProportionValue,
        handleProportionValue,
        isCircle,
        setIsCircle,
        handleIsCircle,
        hexColor,
        setHexColor,
        handleChangeCompleteColor,
        opacityValue,
        setOpacityValue,
        imagePosition,
        setImagePosition,
        resetImagePosition,
        titleValue,
        setTitleValue,
        titleVertical,
        setTitleVertical,
        titleAlign,
        setTitleAlign,
        fontValue,
        setFontValue,
        handleChangeFont,
        fontSizeValue,
        setFontSizeValue,
        handleChangeFontSize,
        authorValue,
        setAuthorValue,
        authorPositionId,
        authorPosition,
        authorPositionList,
        handleAuthorPosition,
        boardTool,
        setBoardTool,
        penSize,
        setPenSize,
        handlePenSize,
        board_pen_color,
        setBoardPenColor,
        handleChangeBoardPenColor,
        lines,
        setLines,
        undoLine,
        clearLines,
        isOpenSelectArea,
        setIsOpenSelectArea,
        selectArea,
        setSelectArea,
      }}>
      {children}
    </ImgContext.Provider>
  )
}
