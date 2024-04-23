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
  const animals = ['cat', 'dog', '22']

  function handleChangeCompleteColor(color: any) {
    setHexColor(color.hex.toUpperCase())
  }

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
        <Select
          label='比例'
          className=''>
          {animals.map((animal) => (
            <SelectItem
              key={animal}
              value={animal}>
              {animal}
            </SelectItem>
          ))}
        </Select>
        <Divider />

        {/* 遮罩+颜色选择 */}
        <div className='flex w-full items-center justify-between'>
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
          className='max-w-md'
        />
        <Divider />

        <Select
          label='字体'
          className=''>
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
          className=''>
          {animals.map((animal) => (
            <SelectItem
              key={animal}
              value={animal}>
              {animal}
            </SelectItem>
          ))}
        </Select>

        <Tabs
          className='w-full'
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
          className=' py-2'
        />

        <Input
          label='作者'
          type='search'
          className='py-2'
          placeholder='输入作者'
        />
      </div>
      <Divider />

      <>
        <Navbar>
          <NavbarBrand>
            <span>下载图像</span>
          </NavbarBrand>

          <NavbarContent justify='end'>
            <NavbarItem>
              <Button>JPG</Button>
              <Button className='mx-2'>PNG</Button>
              <Button>SVG</Button>
            </NavbarItem>
          </NavbarContent>
        </Navbar>
      </>
    </div>
  )
}
