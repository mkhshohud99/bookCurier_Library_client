import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// Router
import { RouterProvider } from 'react-router-dom'
import router from './routes/Routes.jsx'

// Context
import AuthProvider from './provider/AuthProvider.jsx'

// Toast
import { Toaster } from 'react-hot-toast'

// React Query
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

// ✅ Create Query Client
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster position="top-right" reverseOrder={false} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)