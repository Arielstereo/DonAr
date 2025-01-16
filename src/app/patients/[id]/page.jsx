'use client'

import { useFetch } from '@/hooks/useFetch'
import { useParams, usePathname } from 'next/navigation'
import { useState } from 'react'
import Loader from '@/components/Loader'
import Modal from '@/components/Modal'
import Image from 'next/image'

export default function Patient () {
  const { id } = useParams()
  const pathname = usePathname() // Obtiene la ruta actual
  const { data, isLoading } = useFetch(`patients/${id}`)
  const [showModal, setShowModal] = useState(false)

  const currentURL = `https://donar-three.vercel.app${pathname}`

  const handleShareOnWhatsApp = () => {
    const whatsappURL = `https://wa.me/?text=${encodeURIComponent(currentURL)}`
    window.open(whatsappURL, '_blank')
  }

  return (
    <>
      {
    data
      ? (
        <div className='flex flex-col lg:flex-row justify-center lg:gap-32'>
          <div className='px-4 sm:px-0'>
            <h3 className='text-base/7 font-semibold text-gray-900 mt-8'>Información del paciente</h3>
            <p className='mt-1 max-w-2xl text-sm/6 text-gray-500'>Datos importantes para la donación</p>
            <div className='flex gap-4'>
              <button className='p-3 bg-pink-600 hover:bg-slate-800 font-semibold text-white rounded-lg mt-8' onClick={() => setShowModal(true)}>
                Quiero donar
              </button>
              <Image src='/Heart.gif' width={60} height={60} alt='Heart' unoptimized className='mt-4' />
            </div>
            <div className='flex flex-col gap-4 mt-12'>
              <p className='text-gray-500 text-sm'>Ayuda compartiendo esta página con tus contactos.</p>
              <div className='flex gap-4'>
                <button
                  className='p-3 bg-green-600 hover:bg-slate-900 font-semibold text-white rounded-lg w-fit'
                  onClick={handleShareOnWhatsApp}
                >
                  Compartir en WhatsApp
                </button>
                <Image src='/share.gif' width={50} height={40} alt='whatsapp' unoptimized />
              </div>
            </div>
          </div>
          <div className='mt-6'>
            <dl className='divide-y divide-pink-400'>
              <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                <dt className='text-sm/6 font-medium text-gray-500'>Nombre y apellido:</dt>
                <dd className='mt-1 text-sm/6 text-gray-700 font-semibold sm:col-span-2 sm:mt-0'>{data?.username} {data?.fullName}</dd>
              </div>
              <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                <dt className='text-sm/6 font-medium text-gray-500'>N° de documento:</dt>
                <dd className='mt-1 text-sm/6 text-gray-700 font-semibold sm:col-span-2 sm:mt-0'>{data?.dni}</dd>
              </div>
              <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                <dt className='text-sm/6 font-medium text-gray-500'>Email:</dt>
                <dd className='mt-1 text-sm/6 text-gray-700 font-semibold sm:col-span-2 sm:mt-0'>{data?.email}</dd>
              </div>
              <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                <dt className='text-sm/6 font-medium text-gray-500'>Grupo sanguineo:</dt>
                <dd className='mt-1 text-sm/6 text-gray-700 font-semibold sm:col-span-2 sm:mt-0'>{data?.group}</dd>
              </div>
              <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                <dt className='text-sm/6 font-medium text-gray-500'>Dadores faltantes:</dt>
                <dd className='mt-1 text-sm/6 text-red-500 font-semibold sm:col-span-2 sm:mt-0'>{data?.quantity}</dd>
              </div>
              <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                <dt className='text-sm/6 font-medium text-gray-500'>Establecimiento:</dt>
                <dd className='mt-1 text-sm/6 text-gray-700 font-semibold sm:col-span-2 sm:mt-0'>{data?.place}</dd>
              </div>
              <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                <dt className='text-sm/6 font-medium text-gray-500'>Dirección:</dt>
                <dd className='mt-1 text-sm/6 text-gray-700 font-semibold sm:col-span-2 sm:mt-0'>{data?.address}</dd>
              </div>
              <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                <dt className='text-sm/6 font-medium text-gray-500'>Dias y horarios:</dt>
                <dd className='mt-1 text-sm/6 text-gray-700 font-semibold sm:col-span-2 sm:mt-0'>{data?.schedule}</dd>
              </div>
            </dl>
          </div>
          {isLoading && <Loader />}
          <Modal showModal={showModal} closeModal={() => setShowModal(false)} />
        </div>
        )
      : (<Loader />)
   }
    </>
  )
}
