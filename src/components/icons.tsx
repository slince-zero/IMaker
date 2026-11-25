import { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement> & { size?: number }

function Base({ size = 18, children, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={1.8}
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden='true'
      {...rest}>
      {children}
    </svg>
  )
}

export const SearchIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx='11' cy='11' r='7' />
    <path d='m20 20-3.5-3.5' />
  </Base>
)

export const UploadIcon = (p: IconProps) => (
  <Base {...p}>
    <path d='M4 15v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2M12 4v12m0-12 4 4m-4-4L8 8' />
  </Base>
)

export const SparkleIcon = (p: IconProps) => (
  <Base {...p}>
    <path d='M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z' />
    <path d='M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z' />
  </Base>
)

export const RefreshIcon = (p: IconProps) => (
  <Base {...p}>
    <path d='M20 11a8 8 0 1 0-2.3 5.7' />
    <path d='M20 4v7h-7' />
  </Base>
)

export const UndoIcon = (p: IconProps) => (
  <Base {...p}>
    <path d='M9 14 4 9l5-5' />
    <path d='M4 9h10.5a5.5 5.5 0 0 1 0 11H11' />
  </Base>
)

export const TrashIcon = (p: IconProps) => (
  <Base {...p}>
    <path d='M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3' />
  </Base>
)

export const DownloadIcon = (p: IconProps) => (
  <Base {...p}>
    <path d='M12 4v11m0 0 4-4m-4 4-4-4M4 17v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1' />
  </Base>
)

export const ImageIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x='3' y='4' width='18' height='16' rx='2' />
    <circle cx='9' cy='10' r='2' />
    <path d='m21 16-5-5-9 9' />
  </Base>
)

export const LayoutIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x='3' y='3' width='18' height='18' rx='2' />
    <path d='M3 9h18M9 21V9' />
  </Base>
)

export const TypeIcon = (p: IconProps) => (
  <Base {...p}>
    <path d='M4 7V5h16v2M9 19h6M12 5v14' />
  </Base>
)

export const BrushIcon = (p: IconProps) => (
  <Base {...p}>
    <path d='M18.4 2.6a2 2 0 0 1 2.9 2.9L12 14.8 9.2 12z' />
    <path d='M9 12.2c-2.2 0-4 1.8-4 4 0 1.6-1 2.6-2 3 1 .5 2.3.8 3.5.8 2.8 0 5-2.2 5-5z' />
  </Base>
)

export const HandIcon = (p: IconProps) => (
  <Base {...p}>
    <path d='M8 13V5.5a1.5 1.5 0 0 1 3 0V12M11 11.5v-7a1.5 1.5 0 0 1 3 0V12M14 11.5V6.5a1.5 1.5 0 0 1 3 0V15a6 6 0 0 1-6 6h-1a6 6 0 0 1-4.9-2.6L3.4 15a1.6 1.6 0 0 1 2.5-2l2.1 2' />
  </Base>
)

export const AlignLeftIcon = (p: IconProps) => (
  <Base {...p}>
    <path d='M4 6h16M4 10h10M4 14h16M4 18h10' />
  </Base>
)

export const AlignCenterIcon = (p: IconProps) => (
  <Base {...p}>
    <path d='M4 6h16M7 10h10M4 14h16M7 18h10' />
  </Base>
)

export const AlignRightIcon = (p: IconProps) => (
  <Base {...p}>
    <path d='M4 6h16M10 10h10M4 14h16M10 18h10' />
  </Base>
)

export const AlignTopIcon = (p: IconProps) => (
  <Base {...p}>
    <path d='M4 4h16' />
    <rect x='8' y='7' width='8' height='6' rx='1' />
  </Base>
)

export const AlignMiddleIcon = (p: IconProps) => (
  <Base {...p}>
    <path d='M4 12h3M17 12h3' />
    <rect x='8' y='9' width='8' height='6' rx='1' />
  </Base>
)

export const AlignBottomIcon = (p: IconProps) => (
  <Base {...p}>
    <path d='M4 20h16' />
    <rect x='8' y='11' width='8' height='6' rx='1' />
  </Base>
)

export const GithubIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='currentColor'
    aria-hidden='true'>
    <path d='M12 .5a11.5 11.5 0 0 0-3.6 22.4c.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A11.5 11.5 0 0 0 12 .5z' />
  </svg>
)
