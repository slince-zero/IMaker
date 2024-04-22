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
} from '@nextui-org/react'

export default function RightBoard() {
  const animals = ['cat', 'dog', '22']
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

        <Slider
          color='foreground'
          label='透明度'
          step={1}
          maxValue={100}
          minValue={0}
          defaultValue={0.4}
          className='max-w-md'
        />

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

        <Textarea
          label='标题'
          placeholder='输入标题'
          className='max-w-xs py-2'
        />

        <Input
          label='作者'
          type='search'
          className='py-2'
          placeholder='输入作者'
        />
      </div>
    </div>
  )
}
