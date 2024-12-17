import { font } from '@/styles/fonts'
import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className='py-3 z-50 border-b-2 shadow-md mb-8'>
      <Link href='/' className='flex gap-0 lg:gap-2 lg:ml-32 ml-4'>
        <Image src='/gota.png' width={50} height={50} alt='logo' />
        <span className={`${font.className} text-xl lg:text-xl font-semibold pt-3 hover:text-red-800`}>DonAr | salva vidas</span>
      </Link>
    </nav>
  )
}

export default Navbar
