import { Routes, Route, BrowserRouter } from 'react-router-dom'

import PublicRoute from './PublicRoute'
import { Auth } from '../pages/Auth'
import { Login } from '../pages/Auth/Login'
import { SingUp } from '../pages/Auth/SingUp'
import PrivateRoute from './PrivateRoute'
import { Home } from '../pages/Home'
import { Tasks } from '../pages/Tasks'
import { FormTasks } from '../pages/Tasks/FormTasks'
export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Auth />
            </PublicRoute>
          }
        >
          <Route path="login" element={<Login />} />
          <Route path="sign-up" element={<SingUp />} />
        </Route>

        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        >
          <Route path="tasks" element={<Tasks />} />
          <Route path="tasks/new" element={<FormTasks />} />
          <Route path="tasks/:id/details" element={<FormTasks />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
