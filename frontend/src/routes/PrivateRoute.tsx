import { Navigate } from 'react-router-dom'

import { useAuth } from '../hooks/useAuth'
import { PrivateLayout } from '../pages/Layout/PrivateLayout'

type Props = {
  children?: React.ReactNode // 👈️ type children
}

const PrivateRoute = ({ children }: Props) => {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/login" />
  }

  if (user) {
    return <PrivateLayout>{children}</PrivateLayout>
  }
}

export default PrivateRoute
