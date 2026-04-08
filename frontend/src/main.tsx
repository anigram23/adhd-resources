import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import router from './routing/Router'
import { Provider } from './components/ui/provider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {AuthProvider} from "@/AuthContext.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      <QueryClientProvider client={queryClient}>
          <AuthProvider>
              <RouterProvider router={router} />
          </AuthProvider>
      </QueryClientProvider>
    </Provider>
  </StrictMode>
)
