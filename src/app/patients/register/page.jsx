'use client'

import axiosInstance from '@/utils/axiosInstance'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { title } from '@/styles/fonts'
import toast from 'react-hot-toast'
import Image from 'next/image'

export default function Register () {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      await axiosInstance.post('patients', data)
      router.push('/patients')
      toast('Paciente registrado!', {
        icon: '💞',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff'
        }
      })
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
    reset()
  }

  return (
    <div className='flex flex-col gap-8'>
      <div className='flex flex-col gap-4'>
        <h1
          className={`${title.className} ml-8 lg:ml-32 text-3xl lg:text-4xl text-pink-600`}
        >
          ¿Necesitas donantes?
        </h1>
        <h2 className='text-slate-600 text-sm lg:text-base ml-8 lg:ml-32 w-5/6 lg:w-3/4'>
          Regístrate como paciente o registra a un familiar o amigo que necesite
          donantes de sangre. Asegúrate de completar todos los campos del
          formulario, ya que cada dato es esencial para que los donantes puedan
          acudir al centro de donación con toda la información necesaria.
          Recuerda ingresar un correo electrónico válido, donde recibirás la
          confirmación del registro al finalizar el proceso.
        </h2>
      </div>
      <Image
        src='/profile.gif'
        width={80}
        height={80}
        alt='profile'
        unoptimized
        className='mx-auto'
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-4 lg:gap-8 items-center mb-12'
      >
        <div className='flex flex-col lg:flex-row gap-4'>
          <div className='flex flex-col'>
            <input
              type='number'
              placeholder='dni'
              className='border border-slate-500 p-2 w-fit rounded-lg'
              {...register('dni', {
                required: { value: true, message: '* El dni es obligatorio' },
                minLength: {
                  value: 8,
                  message: '*Ingresar 8 caracteres'
                }
              })}
            />
            {errors.dni && <p className='text-red-500'>{errors.dni.message}</p>}
          </div>
          <div className='flex flex-col'>
            <input
              type='text'
              placeholder='Nombre'
              className='border border-slate-500 p-2 w-fit rounded-lg'
              {...register('username', {
                required: {
                  value: true,
                  message: '* El nombre es obligatorio'
                },
                minLength: {
                  value: 4,
                  message: '*Minimo 4 caracteres'
                }
              })}
            />
            {errors.username && (
              <p className='text-red-500'>{errors.username.message}</p>
            )}
          </div>
          <div className='flex flex-col'>
            <input
              type='text'
              placeholder='Apellido'
              className='border border-slate-500 p-2 w-fit rounded-lg'
              {...register('fullName', {
                required: {
                  value: true,
                  message: '*El apellido es obligatorio'
                },
                minLength: {
                  value: 4,
                  message: '*Minimo 4 caracteres'
                }
              })}
            />
            {errors.fullName && (
              <p className='text-red-500'>{errors.fullName.message}</p>
            )}
          </div>
        </div>
        <div className='flex flex-col lg:flex-row gap-4'>
          <div className='flex flex-col'>
            <input
              type='text'
              placeholder='email'
              className='border border-slate-500 p-2 w-fit rounded-lg'
              {...register('email', {
                required: { value: true, message: '*El email es obligatorio' }
              })}
            />
            {errors.email && (
              <p className='text-red-500'>{errors.email.message}</p>
            )}
          </div>
          <div className='flex flex-col'>
            <input
              type='text'
              placeholder='Establecimiento'
              className='border border-slate-500 p-2 w-fit rounded-lg'
              {...register('place', {
                required: {
                  value: true,
                  message: '*Coloca un establecimiento'
                }
              })}
            />
            {errors.place && (
              <p className='text-red-500'>{errors.place.message}</p>
            )}
          </div>
          <div className='flex flex-col'>
            <input
              type='text'
              placeholder='Dirección'
              className='border border-slate-500 p-2 w-fit rounded-lg'
              {...register('address', {
                required: { value: true, message: '*Coloca una dirección' }
              })}
            />
            {errors.address && (
              <p className='text-red-500'>{errors.address.message}</p>
            )}
          </div>
        </div>

        <div className='flex flex-col lg:flex-row gap-4'>
          <div className='flex flex-col'>
            <input
              type='text'
              placeholder='Dias y horarios'
              className='border border-slate-500 p-2 w-fit rounded-lg'
              {...register('schedule', {
                required: {
                  value: true,
                  message: '*Coloca los dias y horarios'
                }
              })}
            />
            {errors.schedule && (
              <p className='text-red-500'>{errors.schedule.message}</p>
            )}
          </div>

          <div className='flex flex-col'>
            <input
              type='number'
              placeholder='Cantidad'
              className='border border-slate-500 p-2 w-fit rounded-lg'
              {...register('quantity', {
                required: { value: true, message: '*Coloca una cantidad' },
                maxLength: { value: 2, message: '*Maximo 2 caracteres' }
              })}
            />
            {errors.quantity && (
              <p className='text-red-500'>{errors.quantity.message}</p>
            )}
          </div>
          <div>
            <select
              {...register('group')}
              className='border border-slate-500 bg-transparent p-2 w-full lg:w-[225px] h-[41px] rounded-lg'
            >
              <option value='cualquiera'>Cualquiera</option>
              <option value='A+'>A+</option>
              <option value='A-'>A-</option>
              <option value='B+'>B+</option>
              <option value='B-'>B-</option>
              <option value='0'>0+</option>
            </select>
          </div>
        </div>

        <button
          disabled={isLoading}
          className={
            isLoading
              ? 'p-2 bg-slate-400 rounded-lg text-white w-48'
              : 'p-2 bg-pink-600 hover:bg-slate-800 rounded-lg text-white w-48'
          }
        >
          {isLoading ? 'Enviando...' : 'Registrar'}
        </button>
      </form>
    </div>
  )
}
