import axiosInstance from '@/utils/axiosInstance'
import { useState, useEffect } from 'react'

export const useFetch = (url) => {
  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()
  const fetchData = async () => {
    setIsLoading(true)
    try {
      const res = await axiosInstance.get(url)
      const { data } = res

      if (res.status === 200) {
        setData(data)
      }
    } catch (e) {
      setError(e.message)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { data, isLoading, error, refetch: fetchData }
}
