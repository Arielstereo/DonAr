'use client'

import { useFetch } from '@/hooks/useFetch'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import axiosInstance from '@/utils/axiosInstance'
import NumberFlow from '@number-flow/react'
import confetti from 'canvas-confetti'

export default function Donor () {
  const [donor, setDonor] = useState({})
  const { id } = useParams()
  const { data, refetch, isLoading } = useFetch(`donors/${id}`)
  useEffect(() => {
    if (data) {
      setDonor(data)
    }
  }, [data])

  const patientName = donor?.patient?.map(p => p.username)

  const handleConfirmation = async () => {
    try {
      const patientId = donor?.patient?.map(item => item._id)[0]
      await axiosInstance.put('donors', { id: patientId })
      refetch()
      confetti({
        particleCount: 3000,
        startVelocity: 50,
        spread: 360
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='lg:mx-96 flex flex-col gap-8 mt-8'>
      <h1 className='text-3xl lg:text-4xl text-red-600 text-center font-semibold'>Gracias {donor?.username}</h1>
      <div className='flex flex-col gap-2'>
        <h2 className='text-center text-slate-600'>Te has registrado como donante de sangre para ayudar a {patientName}.</h2>
        <h3 className='text-center text-slate-600'> Una vez que asistas al centro de donación, recuerda presionar el botón <span className='text-red-500'>confirmar</span> para actualizar su estado.</h3>
      </div>
      {
        donor?.patient && donor.patient.map(item => (
          <div key={item._id} className='flex flex-col gap-4 mt-8 mx-auto'>
            <h3 className='text-red-500 text-xl'>Información del paciente:</h3>
            <div className='flex gap-2'>
              <span>Nombre: {item.username}</span>
              <span>{item.fullName}</span>
            </div>
            <span>Email: {item.email}</span>
            <span>DNI: {item.dni}</span>
            <span>Lugar de donación: {item.place}</span>
            <div className='flex gap-2 items-center justify-center mt-4'>
              <span className='text-2xl'>Faltan</span>
              <NumberFlow
                className='text-2xl font-bold text-red-600'
                value={item.quantity}
                format={{ notation: 'compact' }}
                locales='en-US'
              />
              <span className='text-2xl'>donantes</span>
            </div>
          </div>
        ))
      }
      <button onClick={handleConfirmation} className={donor?.isConfirmated ? 'hidden' : 'bg-pink-500 hover:bg-slate-800 p-2 text-white w-1/3 mx-auto rounded-lg mt-8'}>
        {isLoading ? 'Cargando...' : 'Confirmar'}
      </button>
      <span className={donor?.isConfirmated ? 'text-center text-base lg:text-lg text-slate-600 font-semibold' : 'hidden'}>¡Gracias por hacer la diferencia y salvar vidas! 💓</span>
    </div>
  )
}
