import React, {createContext, useContext, useMemo} from 'react'
import {createAxiosInstance} from './axios'

const AxiosContext = createContext()

export function AxiosProvider({children}) {
  const axiosInstance = useMemo(() => createAxiosInstance(), [])

  return (
    <AxiosContext.Provider value={axiosInstance}>
      {children}
    </AxiosContext.Provider>
  )
}

export function useAxios() {
  const context = useContext(AxiosContext)
  if (!context) throw new Error('useAxios must be used within AxiosProvider')
  return context
}