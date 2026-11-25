// 画布比例、字体、颜色等可选项

export interface AspectOption {
  label: string
  value: string
  ratio: number
}

// 横屏
export const ASPECT_LANDSCAPE: AspectOption[] = [
  { label: '16:9', value: 'aspect-[16/9]', ratio: 16 / 9 },
  { label: '4:3', value: 'aspect-[4/3]', ratio: 4 / 3 },
  { label: '3:2', value: 'aspect-[3/2]', ratio: 3 / 2 },
  { label: '2:1', value: 'aspect-[2/1]', ratio: 2 },
  { label: '1:1', value: 'aspect-square', ratio: 1 },
]

// 竖屏
export const ASPECT_PORTRAIT: AspectOption[] = [
  { label: '3:4', value: 'aspect-[3/4]', ratio: 3 / 4 },
  { label: '2:3', value: 'aspect-[2/3]', ratio: 2 / 3 },
  { label: '9:16', value: 'aspect-[9/16]', ratio: 9 / 16 },
  { label: '1:2', value: 'aspect-[1/2]', ratio: 1 / 2 },
]

export function getAspectRatio(value: string): number {
  const item = [...ASPECT_LANDSCAPE, ...ASPECT_PORTRAIT].find(
    (a) => a.value === value
  )
  return item ? item.ratio : 16 / 9
}

export const FONT_LIST = [
  { label: '钉钉进步体', value: 'font-dingtalk' },
  { label: '阿里巴巴普惠体', value: 'font-alibaba' },
  { label: '金山云技术体', value: 'font-kingsoft' },
  { label: '欣意冠黑体', value: 'font-xinyiguanhei' },
]

export const MASK_COLORS = [
  '#000000',
  '#1F2937',
  '#E91E63',
  '#9C27B0',
  '#673AB7',
  '#3F51B5',
  '#2196F3',
  '#00BCD4',
  '#009688',
  '#4CAF50',
  '#CDDC39',
  '#FF9800',
]

export const PEN_COLORS = [
  '#FFFFFF',
  '#1F2937',
  '#E23922',
  '#FF9800',
  '#FFEB3B',
  '#4CAF50',
  '#00BCD4',
  '#2196F3',
  '#673AB7',
  '#E91E63',
]

export const PEN_SIZES = [1, 2, 3, 5, 8, 12]

export const isValidHex = (v: string) => /^#[0-9a-fA-F]{6}$/.test(v)
