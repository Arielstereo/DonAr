'use client'

import { useFetch } from '@/hooks/useFetch'
import Loader from '@/components/Loader'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { title } from '@/styles/fonts'

export default function Patients () {
  const [patients, setPatients] = useState()
  const { data, isLoading } = useFetch('patients')

  useEffect(() => {
    setPatients(data)
  }, [data])

  return (
    <div className='flex flex-col gap-12 mx-2 lg:mx-32'>
      <div className='flex flex-col gap-4 mx-4'>
        <div className='flex gap-4'>
          <h1 className={`${title.className} text-pink-500 text-2xl lg:text-4xl`}>Se necesitan dadores de sangre</h1>
        </div>
        <h2 className='text-slate-500 lg:mr-32 text-justify text-sm lg:text-base'>A continuación, encontrarás una lista de personas que necesitan donantes de sangre. Haz clic en el botón "+ info" para acceder a todos los detalles necesarios y conocer los datos para acudir al centro de donación correspondiente, en caso de que decidas registrarte como su donante.
        </h2>
      </div>
      <ul className='divide-y divide-pink-400 w-full lg:w-3/4 lg:ml-24 mb-32'>
        {patients?.map((patient) => (
          <li key={patient._id} className='flex justify-between gap-4 lg:gap-6 py-5 lg:p-6 hover:bg-slate-100 hover:rounded-lg w-full'>
            <div className='flex w-fit gap-4'>
              <div className='w-fit flex-col mt-2'>
                <div className='flex gap-2'>
                  <p className='text-sm lg:text-base font-semibold text-gray-900'>{patient.username}</p>
                  <p className='text-sm lg:text-base font-semibold text-gray-900'>{patient.fullName}</p>
                </div>
                <p className='text-sm lg:text-base text-gray-900'>Grupo sanguíneo | <span className='font-black text-red-500'>{patient.group}</span></p>
                <p className='text-sm lg:text-base text-gray-900'>Dadores faltantes | <span className='font-black text-red-500'>{patient.quantity}</span></p>
              </div>
            </div>
            <div className='my-auto'>
              <Link href={`/patients/${patient._id}`} className='p-2 rounded-lg text-sm shadow-lg hover:bg-slate-800 hover:text-white border border-slate-900'>
                + Info
              </Link>
            </div>
          </li>
        ))}
      </ul>
      {
        isLoading && <Loader />
      }
    </div>
  )
}
