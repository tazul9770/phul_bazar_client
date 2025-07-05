import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.css"
import AppRoutes from './routes/AppRoutes.jsx'
import { BrowserRouter } from 'react-router'
import { AuthProvider } from './context/AuthContext.jsx'
import { CartProvider } from './context/CartContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <CartProvider>
      <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
    </CartProvider>
    </AuthProvider>
  </StrictMode>,
)
