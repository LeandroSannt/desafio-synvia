import { queryClient } from '../services/queryClient'
import { AuthProvider } from './useAuth'
import { ToastProvider } from './useToast'
import { QueryClientProvider } from 'react-query'
import { ReactElement, ReactNode } from 'react'

interface HooksProps {
  children?: ReactNode
}

const AppProvider = ({ children }: HooksProps) => (
  <ToastProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children as ReactElement}</AuthProvider>
    </QueryClientProvider>
  </ToastProvider>
)

export { AppProvider }
