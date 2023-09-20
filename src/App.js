import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { AppRouter } from './routes/Router.jsx'
import './scss/App.scss'

const queryClient = new QueryClient()

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />
    </QueryClientProvider>
  )
}
