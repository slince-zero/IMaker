import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { NextUIProvider } from '@nextui-org/react'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <NextUIProvider>
    <main className='dark text-foreground bg-background'>
      <App />
    </main>
  </NextUIProvider>
)
