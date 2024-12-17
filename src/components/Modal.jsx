'use client'

import axiosInstance from '@/utils/axiosInstance'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import CloseIcon from './icons/CloseIcon'
import toast from 'react-hot-toast'

const Modal = ({ showModal, closeModal }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (data) => {
    try {
      setIsLoading(true)
      const res = await axiosInstance.post(`donors/${id}`, data)
      const { donor } = res.data
      closeModal()
      toast(`Gracias ${donor.username}! Revisa tu correo`,
        {
          icon: '💞',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff'
          }
        }
      )
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
    reset()
  }

  // TODO: agregar input para el apellido del donante

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-500 ${
        showModal ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={closeModal} // Cierra el modal al hacer clic fuera
    >
      <div
        className={`p-8 bg-white rounded-lg shadow-lg transform transition-transform duration-500 ${
          showModal ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()} // Evita cerrar el modal al hacer clic dentro
      >
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 w-fit lg:w-[400px] lg:h-[500px] justify-center items-center py-8 lg:py-0'>
          <button className='fixed top-4 lg:top-8 right-4 lg:right-12' onClick={closeModal}>
            <CloseIcon />
          </button>
          <p className='text-center mb-4 font-semibold text-slate-400'>* Con este registro me comprometo a donar sangre para el paciente</p>
          <input
            type='text'
            placeholder='username'
            className='border border-slate-400 p-2 rounded-lg w-64'
            {...register('username', {
              required: { value: true, message: '*Ingrese un nombre' },
              minLength: { value: 4, message: 'Username must be at least 4 characters' }
            })}
          />
          {errors.username && <p className='text-red-500 text-sm'>{errors.username.message}</p>}
          <input
            type='email'
            placeholder='email'
            className='border border-slate-400 p-2 rounded-lg w-64'
            {...register('email', {
              required: { value: true, message: '*Ingrese un email' }
            })}
          />
          {errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}
          <div className='flex gap-2 w-64 justify-center mt-4'>
            <input
              type='checkbox'
              {...register('terms', {
                required: { value: true, message: '*Acepte los términos' }
              })}
            />
            <span className='text-sm text-slate-800'>Aceptar términos y condiciones</span>
          </div>
          {errors.terms && <p className='text-red-500 text-center text-sm'>{errors.terms.message}</p>}
          <button disabled={isLoading} className='p-2 bg-pink-600 hover:bg-slate-800 text-white rounded-lg mt-8 w-64'>
            {isLoading ? 'Cargando...' : 'Confirmar'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Modal
