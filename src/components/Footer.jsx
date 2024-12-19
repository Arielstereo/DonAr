import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
  return (
    <div className='mt-32 w-full flex justify-center'>
      <Image src='/footerPng.png' width='600' height='600' alt='Footer-img' className='w-full lg:w-[500px] h-full relative -bottom-24 xl:-bottom-48' />
      <div className='z-10 absolute mt-32 lg:mt-20 xl:mt-60 flex gap-4'>
        <Link href='https://portfolio.empren.dev/' target='_blank' className='text-base lg:text-xl text-white font-semibold hover:text-pink-200 pb-8' rel='noreferrer'>Ariel Martinez | 2024</Link>
      </div>
    </div>
  )
}

export default Footer
