import {
  Button,
  Input,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Select,
  SelectItem,
  Slider,
  Textarea,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Tabs,
  Tab,
  Divider,
  SelectSection,
  Card,
  CardBody,
  CardHeader,
} from '@nextui-org/react'
import { useContext } from 'react'
import { ImgContext } from '@/context'
import { CirclePicker } from 'react-color'
import { ImageDownloadContext } from '@/context/imageDownload'

export default function RightBoard() {
  const {
    authorValue,
    setAuthorValue,
    titleValue,
    setTitleValue,
    fontValue,
    fontSizeValue,
    handleChangeFont,
    handleChangeFontSize,
    handleAuthorPosition,
    authorPositionList,
    handleChangeCompleteColor,
    hexColor,
    opacityValue,
    setOpacityValue,
    proportionValue,
    handleProportionValue,
    boardTool,
    setBoardTool,
    handlePenSize,
    board_pen_color,
    handleChangeBoardPenColor,
  } = useContext(ImgContext)
  const { handleDownloadImage } = useContext(ImageDownloadContext)

  // button 样式
  const buttonStyle = {
    fontSize: '20px',
    backgroundColor: hexColor,
    borderWidth: '2px',
    borderColor: '#586980',
  }

  // 图片比例
  const img_aspect_x_list = [
    // 横屏
    { label: '1 : 1', value: 'aspect-square', description: '900x900' },
    { label: '2 : 1', value: 'aspect-[2/1]', description: '900x450' },
    { label: '3 : 2', value: 'aspect-[3/2]', description: '900x600' },
    { label: '4 : 3', value: 'aspect-[4/3]', description: '900x675' },
    { label: '16: 9', value: 'aspect-[16/9]', description: '1600x900' },
    { label: '微信公众号', value: 'aspect-[900/383]', description: '900x383' },
  ]

  const img_aspect_y_list = [
    //  竖屏
    { label: '1:2', value: 'aspect-[1/2]', description: '900x450' },
    { label: '2:3', value: 'aspect-[2/3]', description: '900x450' },
    { label: '3:4', value: 'aspect-[3/4]', description: '900x450' },
    { label: '9:16', value: 'aspect-[9/16]', description: '900x450' },
  ]

  // 字体合集
  const font_list = [
    {
      label: 'Font-DingTalk',
      value: 'font-dingtalk',
    },
    {
      label: 'Font-Alibaba',
      value: 'font-alibaba',
    },

    {
      label: 'Font-KingSoft',
      value: 'font-kingsoft',
    },
    {
      label: 'Font-XinYiGuanHei',
      value: 'font-xinyiguanhei',
    },
  ]

  // 字体大小
  const font_size = [
    {
      label: '12',
      value: '12px',
    },
    {
      label: '16',
      value: '16px',
    },
    {
      label: '20',
      value: '20px',
    },
    {
      label: '24',
      value: '24px',
    },
    {
      label: '28',
      value: '28px',
    },
    {
      label: '32',
      value: '32px',
    },
  ]

  // 手写板画笔大小
  const board_pen_size = [
    {
      label: '1',
      value: '1',
    },
    {
      label: '2',
      value: '2',
    },
    {
      label: '3',
      value: '3',
    },
    {
      label: '4',
      value: '4',
    },
    {
      label: '5',
      value: '5',
    },
  ]

  return (
    <div className='flex flex-col bg-slate-500 h-screen'>
      <>
        <Navbar>
          <NavbarBrand>
            <span className='text-gray-350 font-bold text-inherit'>编辑</span>
          </NavbarBrand>

          <NavbarContent justify='end'>
            <NavbarItem>
              <Button
                as={Link}
                color='primary'
                variant='flat'
                target='_blank'
                href='https://github.com/slince-zero/img-maker'>
                {/* github logo */}
                {/* <i
                  className={`devicon-github-plain text-[#2F6EE7] dev-icon text-xl`}
                /> */}
                GitHub
              </Button>
            </NavbarItem>
          </NavbarContent>
        </Navbar>
      </>

      <div className='flex-grow overflow-y-scroll overflow-x-hidden justify-center flex flex-wrap p-2'>
        {/* 比例，控制图片大小 */}
        <Select
          label='比例'
          defaultSelectedKeys={[proportionValue]}
          onChange={handleProportionValue}
          className='max-w-xs py-2'>
          <SelectSection
            showDivider
            title='横屏'>
            {img_aspect_x_list.map((item) => (
              <SelectItem
                key={item.value}
                value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectSection>
          <SelectSection
            showDivider
            title='竖屏'>
            {img_aspect_y_list.map((item) => (
              <SelectItem
                key={item.value}
                value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectSection>
        </Select>
        <Divider />

        {/* 遮罩+颜色选择 */}
        <div className='w-full flex flex-col py-2'>
          <div className='flex w-full items-center justify-between '>
            <div className='w-4/5'>
              <Input
                type='url'
                label='遮罩'
                value={hexColor}
              />
            </div>

            <div className='mx-2'>
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    size='lg'
                    isIconOnly
                    style={buttonStyle}
                    variant='bordered'></Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label='Static Actions'
                  variant='flat'
                  disallowEmptySelection
                  selectionMode='single'>
                  <DropdownItem textValue='color'>
                    <div className='m-2'>
                      <CirclePicker
                        colors={[
                          '#1f2937',
                          '#e91e63',
                          '#9c27b0',
                          '#673ab7',
                          '#3f51b5',
                          '#2196f3',
                          '#03a9f4',
                          '#00bcd4',
                          '#009688',
                          '#4caf50',
                          '#8bc34a',
                          '#cddc39',
                        ]}
                        onChangeComplete={handleChangeCompleteColor}
                      />
                    </div>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
          <Slider
            color='foreground'
            label='透明度'
            step={0.01}
            maxValue={1}
            minValue={0}
            defaultValue={opacityValue}
            onChange={setOpacityValue}
            className='max-w-md mt-5'
          />
        </div>
        <Divider />

        <div className='flex w-full items-center justify-between py-2'>
          <Select
            label='字体'
            onChange={handleChangeFont}
            defaultSelectedKeys={[fontValue]}
            className='w-full my-2 mr-2'>
            {font_list.map((item) => (
              <SelectItem
                key={item.value}
                value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </Select>
          <Dropdown>
            <DropdownTrigger>
              <Button>{fontSizeValue === '' ? '大小' : fontSizeValue}</Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label='Select a fontSize'
              disallowEmptySelection
              selectionMode='single'
              onAction={handleChangeFontSize}>
              {font_size.map((item) => (
                <DropdownItem
                  value={item.value}
                  key={item.value}>
                  {item.label}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>

        <Textarea
          label='标题&文案'
          placeholder='输入内容'
          value={titleValue}
          onValueChange={setTitleValue}
          className='py-2'
        />

        <Card className='w-full mt-2'>
          <CardHeader className='flex'>
            <img
              src='/src/assets/images/whiteBoard.svg'
              alt='shouxiebi'
              className='w-6 h-6'
            />
            <p className='text-md ml-2'>写字板</p>
          </CardHeader>
          <CardBody className='py-2 flex'>
            <div className='w-full flex items-center justify-between'>
              {/* 手写笔 */}
              <Button
                isIconOnly
                style={{ marginLeft: '0.5rem' }}
                className={boardTool === 'pen' ? ' bg-gray-400' : ''}
                onClick={() => setBoardTool('pen')}>
                <img
                  src='/src/assets/images/pen.svg'
                  alt='shouxiebi'
                  className='w-6 h-6'
                />
              </Button>

              {/* 橡皮擦 */}
              <Button
                isIconOnly
                style={{ marginLeft: '0.5rem' }}
                className={boardTool === 'rubber' ? ' bg-gray-400' : ''}
                onClick={() => setBoardTool('rubber')}>
                <img
                  src='/src/assets/images/rubber.svg'
                  alt='rubber'
                  className='w-6 h-6'
                />
              </Button>

              {/* 画笔宽度 */}
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    isIconOnly
                    className='ml-2'>
                    <img
                      src='/src/assets/images/penSize.svg'
                      alt='rubber'
                      className='w-6 h-6'
                    />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label='Select a penSize'
                  variant='shadow'
                  disallowEmptySelection
                  selectionMode='single'
                  onSelectionChange={handlePenSize}>
                  {board_pen_size.map((item) => (
                    <DropdownItem
                      key={item.label}
                      value={item.value}>
                      {item.label}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>

              {/* 画笔颜色 */}
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    isIconOnly
                    className='ml-2'
                    style={{ backgroundColor: board_pen_color }}>
                    <img
                      src='/src/assets/images/penColor.svg'
                      alt='rubber'
                      className='w-6 h-6'
                    />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label='Select a color'
                  variant='flat'
                  disallowEmptySelection
                  selectionMode='single'>
                  <DropdownItem textValue='color'>
                    <div className='m-2'>
                      <CirclePicker
                        colors={[
                          '#1f2937',
                          '#e23922',
                          '#9c27b0',
                          '#673ab7',
                          '#3f51b5',
                          '#2196f3',
                          '#03a9f4',
                          '#00bcd4',
                          '#009688',
                          '#4caf50',
                          '#8bc34a',
                          '#cddc39',
                        ]}
                        onChangeComplete={handleChangeBoardPenColor}
                      />
                    </div>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </CardBody>
        </Card>

        <Divider />

        <Input
          label='作者'
          type='search'
          placeholder='输入作者'
          value={authorValue}
          onValueChange={setAuthorValue}
          className='py-2'
        />
        <Tabs
          className='w-full my-2'
          classNames={{
            tabList: 'w-full',
          }}
          onSelectionChange={handleAuthorPosition}
          aria-label='Options'>
          {authorPositionList.map((item: any) => (
            <Tab
              title={item.position}
              key={item.id}
            />
          ))}
        </Tabs>
      </div>

      <div className='w-full mt-4 px-4 bg-[#181f27]'>
        <div className='text-gray-100 text-sm py-2'>下载图像</div>
        <div className='flex justify-between my-3'>
          <Button
            variant='flat'
            onClick={() => handleDownloadImage('JPG')}>
            JPG
          </Button>
          <Button
            variant='flat'
            onClick={() => handleDownloadImage('PNG')}>
            PNG
          </Button>
          <Button
            variant='flat'
            onClick={() => handleDownloadImage('SVG')}>
            SVG
          </Button>
        </div>
      </div>
    </div>
  )
}
