import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { NextUIProvider } from '@nextui-org/react'
import ImgContextProvider from '@/context'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <NextUIProvider>
    <main className='dark text-foreground bg-background'>
      <ImgContextProvider>
        <App />
      </ImgContextProvider>
    </main>
  </NextUIProvider>
)
