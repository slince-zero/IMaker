import { useState } from 'react'
import { Button } from '@nextui-org/react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Button
        radius='full'
        className='bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg'>
        Button
      </Button>
    </>
  )
}

export default App
