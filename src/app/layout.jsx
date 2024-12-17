import './globals.css'
import Navbar from '@/components/Navbar'
import { font } from '@/styles/fonts'
import Footer from '@/components/Footer'
import Circle from '@/components/Circle'
import Circle2 from '@/components/Circle2'
import { Toaster } from 'react-hot-toast'

export const metadata = {
  title: 'Donar | Salva vidas',
  description: 'Registro de pacientes y donantes de sangre'
}

export default function RootLayout ({ children }) {
  // TODO: cambiar el toast x react-toastify
  return (
    <html lang='en'>
      <body className={`${font.className} antialiased w-full h-screen flex flex-col min-h-screen`}>
        <Toaster position='bottom-center' />
        <Navbar />
        <div className='flex-grow'>
          {children}
        </div>
        <Circle />
        <Circle2 />
        <Footer />
      </body>
    </html>
  )
}
