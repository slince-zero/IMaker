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
} from '@nextui-org/react'
import { useState, useContext } from 'react'
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
  } = useContext(ImgContext)
  const { handleDownloadImage } = useContext(ImageDownloadContext)

  const [hexColor, setHexColor] = useState('#3F51B5')
  const [proportionValue, setProportionValue] = useState('aspect-[16/9]')

  // button 样式
  const buttonStyle = {
    fontSize: '20px',
    backgroundColor: hexColor,
    borderWidth: '2px',
    borderColor: '#586980',
  }

  const img_aspect_x_list = [
    // 横屏
    { label: '1 : 1', value: 'aspect-square', description: '900x450' },
    { label: '2 : 1', value: 'aspect-[2/1]', description: '900x450' },
    { label: '3 : 2', value: 'aspect-[3/2]', description: '900x450' },
    { label: '4 : 3', value: 'aspect-[4/3]', description: '900x450' },
    { label: '16: 9', value: 'aspect-[16/9]', description: '900x450' },
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

  // 选择颜色
  function handleChangeCompleteColor(color: any) {
    setHexColor(color.hex.toUpperCase())
  }

  // 选择图片比例
  function handleProportionValue(e: React.ChangeEvent<HTMLSelectElement>) {
    setProportionValue(e.target.value)
  }

  // 下载图片

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
            step={1}
            maxValue={100}
            minValue={0}
            defaultValue={40}
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
