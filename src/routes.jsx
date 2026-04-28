import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Cadastro  from './pages/Cadastro'
import Login     from './pages/Login'
import Principal from './pages/Principal'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"          element={<Navigate to="/cadastro" replace />} />
        <Route path="/cadastro"  element={<Cadastro />} />
        <Route path="/login"     element={<Login />} />
        <Route path="/principal" element={<Principal />} />
      </Routes>
    </BrowserRouter>
  )
}
