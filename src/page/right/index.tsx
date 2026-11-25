import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Select,
  SelectItem,
  Slider,
  Switch,
  Tab,
  Tabs,
  Textarea,
} from '@nextui-org/react'
import { ReactNode, useContext } from 'react'
import {
  BoardTool,
  DEFAULT_IMAGE_POSITION,
  ImgContext,
  TitleAlign,
  TitleVertical,
} from '@/context'
import { DownloadType, ImageDownloadContext } from '@/context/imageDownload'
import {
  ASPECT_LANDSCAPE,
  ASPECT_PORTRAIT,
  AspectOption,
  FONT_LIST,
  MASK_COLORS,
  PEN_COLORS,
  PEN_SIZES,
  isValidHex,
} from '@/config/options'
import { PenLogo, RubberLogo } from './write-logo'
import {
  AlignBottomIcon,
  AlignCenterIcon,
  AlignLeftIcon,
  AlignMiddleIcon,
  AlignRightIcon,
  AlignTopIcon,
  DownloadIcon,
  HandIcon,
  RefreshIcon,
  TrashIcon,
  UndoIcon,
} from '@/components/icons'

type SliderValue = number | number[]

const toNumber = (v: SliderValue) => (Array.isArray(v) ? v[0] : v)

/* ---------------- 通用小组件 ---------------- */

function Section({
  title,
  extra,
  children,
}: {
  title: string
  extra?: ReactNode
  children: ReactNode
}) {
  return (
    <section className='space-y-3 rounded-xl border border-white/5 bg-white/[0.03] p-3'>
      <header className='flex items-center justify-between'>
        <h3 className='text-xs font-semibold tracking-wide text-zinc-300'>
          {title}
        </h3>
        {extra}
      </header>
      {children}
    </section>
  )
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className='space-y-1.5'>
      <div className='text-[11px] text-zinc-500'>{label}</div>
      {children}
    </div>
  )
}

function RatioButton({
  option,
  active,
  onClick,
}: {
  option: AspectOption
  active: boolean
  onClick: () => void
}) {
  const base = 20
  const box =
    option.ratio >= 1
      ? { width: base, height: base / option.ratio }
      : { width: base * option.ratio, height: base }
  return (
    <button
      type='button'
      onClick={onClick}
      aria-pressed={active}
      className={`flex flex-col items-center justify-center gap-1.5 rounded-lg border py-2 text-[11px] transition ${
        active
          ? 'border-primary bg-primary/15 text-white'
          : 'border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/25 hover:text-zinc-200'
      }`}>
      <span
        className='block rounded-[3px] border border-current'
        style={box}
      />
      {option.label}
    </button>
  )
}

function ColorSwatches({
  colors,
  value,
  onChange,
}: {
  colors: string[]
  value: string
  onChange: (color: string) => void
}) {
  return (
    <div className='flex flex-wrap gap-2'>
      {colors.map((c) => {
        const active = value.toUpperCase() === c.toUpperCase()
        return (
          <button
            key={c}
            type='button'
            aria-label={c}
            onClick={() => onChange(c)}
            className={`h-7 w-7 rounded-full border border-white/20 transition hover:scale-110 ${
              active ? 'ring-2 ring-white ring-offset-2 ring-offset-zinc-900' : ''
            }`}
            style={{ backgroundColor: c }}
          />
        )
      })}
      <label
        title='自定义颜色'
        className='relative h-7 w-7 cursor-pointer overflow-hidden rounded-full border border-white/20 transition hover:scale-110'
        style={{
          background:
            'conic-gradient(#f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)',
        }}>
        <input
          type='color'
          value={isValidHex(value) ? value : '#000000'}
          onChange={(e) => onChange(e.target.value.toUpperCase())}
          className='absolute inset-0 h-full w-full cursor-pointer opacity-0'
        />
      </label>
    </div>
  )
}

// 标题位置 & 对齐选项（#4）
const TITLE_VERTICAL: { key: TitleVertical; label: string; icon: JSX.Element }[] =
  [
    { key: 'top', label: '顶部', icon: <AlignTopIcon size={15} /> },
    { key: 'middle', label: '居中', icon: <AlignMiddleIcon size={15} /> },
    { key: 'bottom', label: '底部', icon: <AlignBottomIcon size={15} /> },
  ]

const TITLE_ALIGN: { key: TitleAlign; label: string; icon: JSX.Element }[] = [
  { key: 'left', label: '左对齐', icon: <AlignLeftIcon size={15} /> },
  { key: 'center', label: '居中', icon: <AlignCenterIcon size={15} /> },
  { key: 'right', label: '右对齐', icon: <AlignRightIcon size={15} /> },
]

/* ---------------- 各个编辑区 ---------------- */

export function CanvasSection() {
  const {
    proportionValue,
    setProportionValue,
    isCircle,
    setIsCircle,
    hexColor,
    setHexColor,
    opacityValue,
    setOpacityValue,
    imagePosition,
    setImagePosition,
    resetImagePosition,
  } = useContext(ImgContext)

  const isDefaultPosition =
    imagePosition.x === DEFAULT_IMAGE_POSITION.x &&
    imagePosition.y === DEFAULT_IMAGE_POSITION.y

  return (
    <>
      <Section title='画布'>
        <Field label='横屏'>
          <div className='grid grid-cols-5 gap-1.5'>
            {ASPECT_LANDSCAPE.map((a) => (
              <RatioButton
                key={a.value}
                option={a}
                active={proportionValue === a.value}
                onClick={() => setProportionValue(a.value)}
              />
            ))}
          </div>
        </Field>
        <Field label='竖屏'>
          <div className='grid grid-cols-5 gap-1.5'>
            {ASPECT_PORTRAIT.map((a) => (
              <RatioButton
                key={a.value}
                option={a}
                active={proportionValue === a.value}
                onClick={() => setProportionValue(a.value)}
              />
            ))}
          </div>
        </Field>
        <Field label='边角'>
          <Tabs
            size='sm'
            fullWidth
            aria-label='边角'
            selectedKey={isCircle ? 'circle' : 'square'}
            onSelectionChange={(k) => setIsCircle(k === 'circle')}>
            <Tab
              key='circle'
              title='圆角'
            />
            <Tab
              key='square'
              title='直角'
            />
          </Tabs>
        </Field>
      </Section>

      <Section
        title='背景图位置'
        extra={
          <Button
            size='sm'
            variant='light'
            className='h-6 min-w-0 px-2 text-[11px] text-zinc-300'
            isDisabled={isDefaultPosition}
            startContent={<RefreshIcon size={13} />}
            onPress={resetImagePosition}>
            复位
          </Button>
        }>
        <p className='text-[11px] text-zinc-500'>
          换比例后图片会被裁剪，可以直接在画布上拖动图片选择保留的区域，也可以用下面的滑块微调
        </p>
        <Slider
          size='sm'
          label='水平'
          step={1}
          minValue={0}
          maxValue={100}
          value={imagePosition.x}
          onChange={(v) =>
            setImagePosition((p) => ({ ...p, x: toNumber(v) }))
          }
          getValue={(v) => `${Math.round(toNumber(v))}%`}
        />
        <Slider
          size='sm'
          label='垂直'
          step={1}
          minValue={0}
          maxValue={100}
          value={imagePosition.y}
          onChange={(v) =>
            setImagePosition((p) => ({ ...p, y: toNumber(v) }))
          }
          getValue={(v) => `${Math.round(toNumber(v))}%`}
        />
      </Section>

      <Section title='遮罩'>
        <ColorSwatches
          colors={MASK_COLORS}
          value={hexColor}
          onChange={setHexColor}
        />
        <Input
          size='sm'
          aria-label='遮罩颜色'
          value={hexColor}
          onValueChange={(v) => setHexColor(v.toUpperCase())}
          startContent={
            <span
              className='h-4 w-4 shrink-0 rounded-full border border-white/20'
              style={{ backgroundColor: hexColor }}
            />
          }
        />
        <Slider
          size='sm'
          label='不透明度'
          step={0.01}
          minValue={0}
          maxValue={1}
          value={opacityValue}
          onChange={(v) => setOpacityValue(toNumber(v))}
          getValue={(v) => `${Math.round(toNumber(v) * 100)}%`}
        />
      </Section>
    </>
  )
}

export function TextSection() {
  const {
    titleValue,
    setTitleValue,
    titleVertical,
    setTitleVertical,
    titleAlign,
    setTitleAlign,
    fontValue,
    handleChangeFont,
    fontSizeValue,
    setFontSizeValue,
    authorValue,
    setAuthorValue,
    authorPositionId,
    authorPositionList,
    handleAuthorPosition,
  } = useContext(ImgContext)

  return (
    <>
      <Section title='文字'>
        <Textarea
          size='sm'
          label='标题 & 文案'
          placeholder='输入内容，支持换行'
          minRows={2}
          maxRows={5}
          value={titleValue}
          onValueChange={setTitleValue}
        />
        <div className='grid grid-cols-2 gap-2'>
          <Field label='位置'>
            <Tabs
              size='sm'
              fullWidth
              aria-label='标题位置'
              selectedKey={titleVertical}
              onSelectionChange={(k) => setTitleVertical(k as TitleVertical)}>
              {TITLE_VERTICAL.map((t) => (
                <Tab
                  key={t.key}
                  title={
                    <span
                      title={t.label}
                      aria-label={t.label}
                      className='flex items-center'>
                      {t.icon}
                    </span>
                  }
                />
              ))}
            </Tabs>
          </Field>
          <Field label='对齐'>
            <Tabs
              size='sm'
              fullWidth
              aria-label='标题对齐'
              selectedKey={titleAlign}
              onSelectionChange={(k) => setTitleAlign(k as TitleAlign)}>
              {TITLE_ALIGN.map((t) => (
                <Tab
                  key={t.key}
                  title={
                    <span
                      title={t.label}
                      aria-label={t.label}
                      className='flex items-center'>
                      {t.icon}
                    </span>
                  }
                />
              ))}
            </Tabs>
          </Field>
        </div>
        <Select
          size='sm'
          label='字体'
          disallowEmptySelection
          selectedKeys={[fontValue]}
          onChange={(e) => handleChangeFont(e.target.value)}>
          {FONT_LIST.map((f) => (
            <SelectItem
              key={f.value}
              textValue={f.label}>
              <span style={{ fontFamily: f.value }}>{f.label}</span>
            </SelectItem>
          ))}
        </Select>
        <Slider
          size='sm'
          label='字号'
          step={1}
          minValue={12}
          maxValue={96}
          value={fontSizeValue}
          onChange={(v) => setFontSizeValue(toNumber(v))}
          getValue={(v) => `${toNumber(v)}px`}
        />
      </Section>

      <Section title='作者水印'>
        <Input
          size='sm'
          aria-label='作者'
          placeholder='输入作者，留空则不显示'
          value={authorValue}
          onValueChange={setAuthorValue}
          isClearable
          onClear={() => setAuthorValue('')}
        />
        <Tabs
          size='sm'
          fullWidth
          aria-label='水印位置'
          selectedKey={authorPositionId}
          onSelectionChange={(k) => handleAuthorPosition(String(k))}>
          {authorPositionList.map((item) => (
            <Tab
              key={item.id}
              title={
                <span
                  title={item.label}
                  aria-label={item.label}
                  className='flex items-center [&>svg]:h-4 [&>svg]:w-4'>
                  {item.position}
                </span>
              }
            />
          ))}
        </Tabs>
      </Section>
    </>
  )
}

export function DrawSection() {
  const {
    boardTool,
    setBoardTool,
    penSize,
    setPenSize,
    board_pen_color,
    setBoardPenColor,
    lines,
    undoLine,
    clearLines,
    isOpenSelectArea,
    setIsOpenSelectArea,
  } = useContext(ImgContext)

  return (
    <>
      <Section
        title='画板'
        extra={
          <span className='hidden text-[11px] text-zinc-500 lg:inline'>
            ⌘ / Ctrl + Z 撤销
          </span>
        }>
        <Tabs
          size='sm'
          fullWidth
          aria-label='画板工具'
          selectedKey={boardTool}
          onSelectionChange={(k) => setBoardTool(k as BoardTool)}>
          <Tab
            key='none'
            title={
              <span className='flex items-center gap-1.5'>
                <HandIcon size={15} />
                关闭
              </span>
            }
          />
          <Tab
            key='pen'
            title={
              <span className='flex items-center gap-1.5 [&_svg]:h-[15px] [&_svg]:w-[15px]'>
                <PenLogo />
                画笔
              </span>
            }
          />
          <Tab
            key='rubber'
            title={
              <span className='flex items-center gap-1.5 [&_svg]:h-[15px] [&_svg]:w-[15px]'>
                <RubberLogo />
                橡皮
              </span>
            }
          />
        </Tabs>

        {boardTool === 'none' && (
          <p className='text-[11px] text-zinc-500'>
            选择「画笔」后，可以直接在画布上涂鸦
          </p>
        )}

        <Field label='粗细'>
          <div className='grid grid-cols-6 gap-1.5'>
            {PEN_SIZES.map((s) => (
              <button
                key={s}
                type='button'
                aria-label={`粗细 ${s}`}
                onClick={() => setPenSize(s)}
                className={`flex h-9 items-center justify-center rounded-lg border transition ${
                  penSize === s
                    ? 'border-primary bg-primary/15'
                    : 'border-white/10 bg-white/[0.03] hover:border-white/25'
                }`}>
                <span
                  className='block rounded-full bg-white'
                  style={{
                    width: Math.min(s * 1.4 + 2, 18),
                    height: Math.min(s * 1.4 + 2, 18),
                  }}
                />
              </button>
            ))}
          </div>
        </Field>

        <Field label='颜色'>
          <ColorSwatches
            colors={PEN_COLORS}
            value={board_pen_color}
            onChange={setBoardPenColor}
          />
        </Field>

        <div className='grid grid-cols-2 gap-2'>
          <Button
            size='sm'
            variant='flat'
            isDisabled={lines.length === 0}
            startContent={<UndoIcon size={15} />}
            onPress={undoLine}>
            撤销
          </Button>
          <Button
            size='sm'
            variant='flat'
            color='danger'
            isDisabled={lines.length === 0}
            startContent={<TrashIcon size={15} />}
            onPress={clearLines}>
            清空
          </Button>
        </div>
      </Section>

      <Section title='导出区域'>
        <Switch
          size='sm'
          isSelected={isOpenSelectArea}
          onValueChange={setIsOpenSelectArea}>
          <span className='text-sm'>只导出选中的区域</span>
        </Switch>
        <p className='text-[11px] text-zinc-500'>
          打开后在画布上拖动选框，拖右下角圆点调整大小
        </p>
      </Section>
    </>
  )
}

/* ---------------- 下载 ---------------- */

// 桌面端：右侧底部的下载区
export function DownloadActions() {
  const { handleDownloadImage, isDownloading } =
    useContext(ImageDownloadContext)
  const { isOpenSelectArea } = useContext(ImgContext)

  return (
    <div className='space-y-2'>
      <div className='flex items-center justify-between text-xs text-zinc-400'>
        <span>下载图片</span>
        {isOpenSelectArea && <span className='text-primary'>仅导出选区</span>}
      </div>
      <Button
        fullWidth
        color='primary'
        isLoading={isDownloading}
        startContent={isDownloading ? null : <DownloadIcon />}
        onPress={() => handleDownloadImage('PNG')}>
        下载 PNG
      </Button>
      <div className='grid grid-cols-2 gap-2'>
        <Button
          size='sm'
          variant='flat'
          isDisabled={isDownloading}
          onPress={() => handleDownloadImage('JPG')}>
          JPG
        </Button>
        <Button
          size='sm'
          variant='flat'
          isDisabled={isDownloading}
          onPress={() => handleDownloadImage('SVG')}>
          SVG
        </Button>
      </div>
    </div>
  )
}

// 移动端：顶部的导出菜单
export function DownloadMenu() {
  const { handleDownloadImage, isDownloading } =
    useContext(ImageDownloadContext)

  return (
    <Dropdown placement='bottom-end'>
      <DropdownTrigger>
        <Button
          size='sm'
          color='primary'
          isLoading={isDownloading}
          startContent={isDownloading ? null : <DownloadIcon size={16} />}>
          导出
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label='导出格式'
        onAction={(k) => handleDownloadImage(String(k) as DownloadType)}>
        <DropdownItem
          key='PNG'
          description='清晰度高，保留圆角透明'>
          PNG
        </DropdownItem>
        <DropdownItem
          key='JPG'
          description='体积更小'>
          JPG
        </DropdownItem>
        <DropdownItem
          key='SVG'
          description='矢量格式'>
          SVG
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

// 桌面端右侧面板：全部编辑项
export default function RightBoard() {
  return (
    <div className='space-y-3'>
      <CanvasSection />
      <TextSection />
      <DrawSection />
    </div>
  )
}
