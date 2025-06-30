import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.css"
import AppRoutes from './routes/AppRoutes.jsx'
import { BrowserRouter } from 'react-router'
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
