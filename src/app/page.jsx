'use client'

import { title } from '@/styles/fonts'
import AOS from 'aos'
import 'aos/dist/aos.css'
import 'animate.css'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'

export default function Home () {
  useEffect(() => {
    AOS.init()

    const handleRouteChange = () => {
      AOS.refresh()
    }

    // Añadir el evento de refresco en cada cambio de ruta
    window.addEventListener('scroll', handleRouteChange)

    // Cleanup para desmontar
    return () => {
      window.removeEventListener('scroll', handleRouteChange)
    }
  }, [])

  return (
    <main className='flex flex-col'>
      <header className='flex flex-col-reverse lg:flex-row gap-8 justify-center items-center'>
        <div className='flex flex-col gap-4 w-5/6 lg:w-1/3'>
          <div className='flex gap-2 lg:gap-2 mx-auto'>
            <h1 className={`${title.className} animate__animated animate__fadeInLeft text-red-700 text-3xl lg:text-4xl`}>DonAr</h1>
            <span className={`${title.className} animate__animated animate__fadeInRight text-3xl lg:text-4xl text-slate-800`}>salva vidas</span>
          </div>
          <h2 className='text-slate-500 animate__animated animate__backInUp text-sm lg:text-base text-center'>
            Conectamos a pacientes que necesitan donantes de sangre con personas dispuestas a ayudar.
            Puedes registrar a un paciente o inscribirte como donante.
          </h2>
          <div className='flex gap-2 lg:gap-4 mt-4 mx-auto'>
            <Link href='/patients/register' className='p-3 text-sm lg:text-base bg-slate-700 hover:bg-pink-600 text-white w-fit rounded-lg shadow-xl border border-slate-100 text-center'>
              Registrar paciente
            </Link>
            <Link href='/patients' className='p-3 text-sm lg:text-base text-center hover:bg-pink-600 text-slate-800 hover:text-slate-100 w-32 rounded-lg shadow-xl border border-slate-800 hover:border-slate-100'>
              Quiero donar
            </Link>
          </div>
          <div className='flex flex-col gap-1 mx-auto'>
            <Link href='#faq' className='font-semibold text-sm lg:text-base text-pink-600 hover:text-pink-400 mt-4 underline'>
              Requisitos e información
            </Link>
          </div>
        </div>
        <Image src='/header_img.JPG' width={400} height={300} alt='blood-bg' className='w-1/2 lg:w-1/3' />
      </header>
      <div id='faq' className='mt-16 lg:mt-32'>
        <section
          data-aos='fade-up'
          data-aos-duration='3000'
          className='mx-4 lg:m-48 flex flex-col-reverse lg:flex-row gap-8 items-center'
        >
          <div className='lg:-mr-32 z-50 flex flex-col gap-4 text-center'>
            <span className='text-red-400 text-sm lg:text-lg'>¿Cuáles son los requisitos para donar?</span>
            <p className='text-slate-700 text-sm lg:text-lg'>
              Tener entre 16 y 65 años, pesar más de 50 kg, y gozar de buena salud general.
              No asistas en ayunas: desayuna normalmente.
              Si tienes tatuajes o piercings, deben haber pasado al menos 6 meses desde su realización.
              Mujeres embarazadas no pueden donar.
            </p>
          </div>
          <Image src='/donarbg.png' width={600} height={500} alt='photo' className='rounded-lg z-10 shadow-xl w-1/2 lg:w-full' />
        </section>
        <section
          data-aos='zoom-in-up'
          data-aos-duration='3000'
          className='mt-12 lg:my-72 mx-4 lg:mx-48 flex flex-col lg:flex-row gap-8 items-center'
        >
          <Image src='/donar2.webp' width={600} height={500} alt='photo' className='rounded-lg z-10 shadow-xl w-1/2 lg:w-full' />
          <div className='text-center lg:-ml-32 z-50 flex flex-col gap-4'>
            <span className='text-red-400 text-sm lg:text-lg'>Recomendaciones después de la donación:</span>
            <p className='text-slate-700 text-sm lg:text-lg'>
              Descansa unos minutos y toma algo para reponer energías.
              Evita fumar durante al menos una hora tras la donación.
              Hidrátate más de lo habitual y evita actividades intensas o cargar peso durante el día.
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}
