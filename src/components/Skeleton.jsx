const Skeleton = () => {
  return (
    <div className='border-b border-pink-400 w-[320px] lg:w-3/4 ml-4 lg:ml-24 mb-32 animate-pulse'>
      <div className='flex justify-between gap-4 lg:gap-6 py-5 lg:p-6 hover:bg-slate-100 hover:rounded-lg w-full'>
        <div className='flex flex-col w-fit gap-1'>
          <div className='w-fit flex-col mt-2'>
            <div className='h-4 bg-gray-200 rounded w-32' />
          </div>
          <div className='w-fit flex-col mt-2'>
            <div className='h-4 bg-gray-200 rounded w-32' />
          </div>
          <div className='w-fit flex-col mt-2'>
            <div className='h-4 bg-gray-200 rounded w-32' />
          </div>
        </div>
        <div className='my-auto'>
          <div className='h-8 bg-gray-200 rounded w-16' />
        </div>
      </div>
    </div>
  )
}

export default Skeleton
