// main page
import { useState } from 'react'
import { Button, Link, Tab, Tabs } from '@nextui-org/react'
import LeftBoard from '@/page/left'
import CenterBoard from '@/page/center'
import RightBoard, {
  CanvasSection,
  DownloadActions,
  DownloadMenu,
  DrawSection,
  TextSection,
} from '@/page/right'
import { ImageDownloadProvider } from '@/context/imageDownload'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import {
  BrushIcon,
  GithubIcon,
  ImageIcon,
  LayoutIcon,
  TypeIcon,
} from '@/components/icons'

const GITHUB_URL = 'https://github.com/slince-zero/img-maker'

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className='flex items-center gap-2'>
      <img
        src='/favicon-left.png'
        alt=''
        className={compact ? 'h-6 w-6' : 'h-7 w-7'}
      />
      <span className='font-bold tracking-wide text-white'>IMaker</span>
    </div>
  )
}

function GithubButton() {
  return (
    <Button
      as={Link}
      href={GITHUB_URL}
      target='_blank'
      isIconOnly
      size='sm'
      variant='light'
      aria-label='GitHub'
      className='text-zinc-300'>
      <GithubIcon />
    </Button>
  )
}

function DesktopLayout() {
  return (
    <div className='flex h-[100dvh] w-full overflow-hidden bg-zinc-950 text-zinc-100'>
      {/* 左侧：图库 */}
      <aside className='flex w-[300px] shrink-0 flex-col border-r border-white/5 bg-zinc-900/80 xl:w-80'>
        <div className='flex h-14 shrink-0 items-center border-b border-white/5 px-4'>
          <Brand />
        </div>
        <div className='min-h-0 flex-1'>
          <LeftBoard />
        </div>
      </aside>

      {/* 中间：画布 */}
      <main className='canvas-bg relative min-w-0 flex-1'>
        <CenterBoard />
      </main>

      {/* 右侧：编辑 */}
      <aside className='flex w-[320px] shrink-0 flex-col border-l border-white/5 bg-zinc-900/80 xl:w-[340px]'>
        <div className='flex h-14 shrink-0 items-center justify-between border-b border-white/5 px-4'>
          <span className='text-sm font-semibold text-zinc-200'>编辑</span>
          <GithubButton />
        </div>
        <div className='thin-scrollbar min-h-0 flex-1 overflow-y-auto p-3'>
          <RightBoard />
        </div>
        <div className='shrink-0 border-t border-white/5 p-3'>
          <DownloadActions />
        </div>
      </aside>
    </div>
  )
}

type MobileTab = 'gallery' | 'canvas' | 'text' | 'draw'

const MOBILE_TABS: { key: MobileTab; label: string; icon: JSX.Element }[] = [
  { key: 'gallery', label: '图库', icon: <ImageIcon size={16} /> },
  { key: 'canvas', label: '画布', icon: <LayoutIcon size={16} /> },
  { key: 'text', label: '文字', icon: <TypeIcon size={16} /> },
  { key: 'draw', label: '画板', icon: <BrushIcon size={16} /> },
]

function MobileLayout() {
  const [tab, setTab] = useState<MobileTab>('gallery')

  return (
    <div className='flex h-[100dvh] w-full flex-col overflow-hidden bg-zinc-950 text-zinc-100'>
      <header className='flex shrink-0 items-center justify-between border-b border-white/5 bg-zinc-900/80 px-3 pb-2 pt-[max(0.5rem,env(safe-area-inset-top))]'>
        <Brand compact />
        <div className='flex items-center gap-1'>
          <GithubButton />
          <DownloadMenu />
        </div>
      </header>

      {/* 画布固定在上方，编辑时随时能看到效果 */}
      <main className='canvas-bg relative h-[42dvh] min-h-[220px] shrink-0'>
        <CenterBoard />
      </main>

      <nav className='shrink-0 border-t border-white/5 bg-zinc-900/80 px-3 pt-2'>
        <Tabs
          fullWidth
          size='md'
          aria-label='编辑面板'
          selectedKey={tab}
          onSelectionChange={(k) => setTab(k as MobileTab)}>
          {MOBILE_TABS.map((t) => (
            <Tab
              key={t.key}
              title={
                <span className='flex items-center gap-1.5'>
                  {t.icon}
                  {t.label}
                </span>
              }
            />
          ))}
        </Tabs>
      </nav>

      <section className='flex min-h-0 flex-1 flex-col bg-zinc-900/80 pb-[env(safe-area-inset-bottom)]'>
        {tab === 'gallery' ? (
          <LeftBoard columns={3} />
        ) : (
          <div className='thin-scrollbar min-h-0 flex-1 space-y-3 overflow-y-auto p-3'>
            {tab === 'canvas' && <CanvasSection />}
            {tab === 'text' && <TextSection />}
            {tab === 'draw' && <DrawSection />}
          </div>
        )}
      </section>
    </div>
  )
}

export default function Main() {
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  return (
    <ImageDownloadProvider>
      {isDesktop ? <DesktopLayout /> : <MobileLayout />}
    </ImageDownloadProvider>
  )
}
