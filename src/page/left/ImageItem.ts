interface ImageItem {
  id: string
  urls: {
    small: string
    regular: string
  }
  alt_description: string | null
  color?: string
  user?: {
    name: string
  }
}

export default ImageItem
