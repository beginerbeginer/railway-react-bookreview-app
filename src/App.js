import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { Signin } from './Pages/Signin.jsx'
import './scss/App.scss'

const queryClient = new QueryClient()

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <header className="App-header">
          <Signin />
        </header>
      </div>
    </QueryClientProvider>
  )
}
