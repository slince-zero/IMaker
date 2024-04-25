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
import { useState } from 'react'
import { CirclePicker } from 'react-color'
import {
  BottomLeftIcon,
  BottomRightIcon,
  MiddleIcon,
  TopLeftIcon,
  ToprightIcon,
} from './posotion-logo'

export default function RightBoard() {
  const [hexColor, setHexColor] = useState('')
  const animals = ['cat', 'dog', '22', '22', '22', '22', '22', '22', '22', '22']
  const [proportionValue, setProportionValue] = useState('aspect-[16/9]')

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

  // 选择颜色
  function handleChangeCompleteColor(color: any) {
    setHexColor(color.hex.toUpperCase())
  }

  // 选择图片比例
  function handleProportionValue(e: React.ChangeEvent<HTMLSelectElement>) {
    setProportionValue(e.target.value)
  }

  console.log(proportionValue, '2222')

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
              <Input label='遮罩' />
            </div>

            <div className='mx-2'>
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    isIconOnly
                    size='lg'
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

        <Select
          label='字体'
          className='my-2'>
          {animals.map((animal) => (
            <SelectItem
              key={animal}
              value={animal}>
              {animal}
            </SelectItem>
          ))}
        </Select>

        <Select
          label='水印'
          className='my-2'>
          {animals.map((animal) => (
            <SelectItem
              key={animal}
              value={animal}>
              {animal}
            </SelectItem>
          ))}
        </Select>

        <Tabs
          className='w-full my-2'
          classNames={{
            tabList: 'w-full',
          }}
          aria-label='Options'>
          <Tab title={<BottomLeftIcon />} />
          <Tab title={<BottomRightIcon />} />
          <Tab title={<MiddleIcon />} />
          <Tab title={<TopLeftIcon />} />
          <Tab title={<ToprightIcon />} />
        </Tabs>
        <Divider />

        <Textarea
          label='标题'
          placeholder='输入标题'
          className='py-2'
        />

        <Input
          label='作者'
          type='search'
          className='py-2'
          placeholder='输入作者'
        />
      </div>
      {/* <Divider /> */}
      <div className='w-full mt-4 px-4 bg-[#181f27]'>
        <div className='text-gray-100 text-sm py-2'>下载图像</div>
        <div className='flex justify-between my-3'>
          <Button variant='flat'>JPG</Button>
          <Button variant='flat'>PNG</Button>
          <Button variant='flat'>SVG</Button>
        </div>
      </div>
    </div>
  )
}
