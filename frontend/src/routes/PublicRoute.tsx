import React from 'react'
import { Navigate } from 'react-router-dom'

import { AuthLayout } from '../pages/Layout/AuthLayout'
import { useAuth } from '../hooks/useAuth'

type Props = {
  children?: React.ReactNode // 👈️ type children
}

const PublicRoute = ({ children }: Props) => {
  const { user } = useAuth()

  if (user) {
    return <Navigate to="/home/tasks" />
  }

  return <AuthLayout>{children}</AuthLayout>
}

export default PublicRoute
