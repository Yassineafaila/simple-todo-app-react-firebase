import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { Navigate } from 'react-router-dom'

function RequiredAuth({children}) {
    const { isAuthenticated } = useAuth()
    if (!isAuthenticated) {
        return <Navigate to="/sign-in" />
    }
  return (
    children
  )
}

export default RequiredAuth