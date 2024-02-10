import { GlobalStyles } from './styles/global'
import { AppRoutes } from './routes'
import { AppProvider } from './hooks'
import moment from 'moment'
moment.locale('pt-br')

const App: React.FC = () => {
  return (
    <AppProvider>
      <GlobalStyles />
      <AppRoutes />
    </AppProvider>
  )
}

export default App
