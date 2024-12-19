import Image from 'next/image'
import Link from 'next/link'
import LinkedinIcon from './icons/LinkedinIcon'

const Footer = () => {
  return (
    <div className='mt-32 w-full flex justify-center items-center'>
      <Image src='/footerPng.png' width='600' height='600' alt='Footer-img' className='w-[800px] lg:w-[500px] h-full relative -bottom-6' />
      <div className='z-10 absolute mt-24 lg:mt-20 flex gap-4'>
        <Link href='https://www.linkedin.com/in/arielstereo/' target='_blank' className='text-base lg:text-xl text-white font-semibold hover:text-sky-400 pb-8' rel='noreferrer'>Ariel Martinez</Link>
        <LinkedinIcon />
      </div>
    </div>
  )
}

export default Footer
