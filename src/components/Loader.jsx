import React from 'react'
import { Hearts } from 'react-loader-spinner'

const Loader = () => {
  return (
    <div className='flex justify-center mt-32'>
      <Hearts color='red' width={400} />
    </div>
  )
}

export default Loader
