import {
  ReactNode,
  RefObject,
  createContext,
  useContext,
  useRef,
  useState,
} from 'react'
import domtoimage from 'dom-to-image'
import { ImgContext, SelectArea } from '.'

export type DownloadType = 'JPG' | 'PNG' | 'SVG'

interface ImageDownloadContextProps {
  imageContainerRef: RefObject<HTMLDivElement>
  handleDownloadImage: (type: DownloadType) => Promise<void>
  isDownloading: boolean
}

export const ImageDownloadContext = createContext<ImageDownloadContextProps>({
  imageContainerRef: { current: null },
  handleDownloadImage: async () => {},
  isDownloading: false,
})

// 导出倍率，保证清晰度
const SCALE = 2

// 带 data-export-ignore 的元素（选区框、loading 等）不会出现在导出图片中
const exportFilter = (node: Node) =>
  !(node instanceof HTMLElement && node.dataset.exportIgnore === 'true')

function generateImageName(prefix: string, type: DownloadType) {
  const now = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${prefix}-${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(
    now.getDate()
  )}-${pad(now.getHours())}${pad(now.getMinutes())}${pad(
    now.getSeconds()
  )}.${type.toLowerCase()}`
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

// 把 PNG 转成目标格式，并按选区裁剪
async function convert(
  pngUrl: string,
  type: 'JPG' | 'PNG',
  area: SelectArea | null
) {
  if (!area && type === 'PNG') return pngUrl
  const img = await loadImage(pngUrl)
  const sx = area ? area.left * SCALE : 0
  const sy = area ? area.top * SCALE : 0
  const sw = area ? area.width * SCALE : img.width
  const sh = area ? area.height * SCALE : img.height
  const canvas = document.createElement('canvas')
  canvas.width = Math.round(sw)
  canvas.height = Math.round(sh)
  const ctx = canvas.getContext('2d')
  if (!ctx) return pngUrl
  if (type === 'JPG') {
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height)
  return type === 'JPG'
    ? canvas.toDataURL('image/jpeg', 0.95)
    : canvas.toDataURL('image/png')
}

export const ImageDownloadProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const { isOpenSelectArea, selectArea } = useContext(ImgContext)
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const [isDownloading, setIsDownloading] = useState(false)

  async function handleDownloadImage(type: DownloadType) {
    const node = imageContainerRef.current
    if (!node || isDownloading) return
    setIsDownloading(true)
    try {
      let dataUrl: string
      if (type === 'SVG') {
        dataUrl = await domtoimage.toSvg(node, { filter: exportFilter })
      } else {
        const png = await domtoimage.toPng(node, {
          filter: exportFilter,
          width: node.clientWidth * SCALE,
          height: node.clientHeight * SCALE,
          style: {
            transform: `scale(${SCALE})`,
            transformOrigin: 'top left',
          },
        })
        dataUrl = await convert(png, type, isOpenSelectArea ? selectArea : null)
      }

      // 转成 blob 链接再下载，大图在移动端更稳定
      const blob = await (await fetch(dataUrl)).blob()
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.download = generateImageName('IMAKER', type)
      link.href = url
      document.body.appendChild(link)
      link.click()
      link.remove()
      setTimeout(() => URL.revokeObjectURL(url), 1000)
    } catch (err) {
      console.error('Something went wrong while downloading image', err)
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <ImageDownloadContext.Provider
      value={{ imageContainerRef, handleDownloadImage, isDownloading }}>
      {children}
    </ImageDownloadContext.Provider>
  )
}
