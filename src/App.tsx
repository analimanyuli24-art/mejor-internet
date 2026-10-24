import HomePage from './pages/HomePage'
import { CallRequestProvider } from './components/CallRequest/CallRequestContext'

// App solo envuelve la página con los proveedores globales.
function App() {
  return (
    <CallRequestProvider>
      <HomePage />
    </CallRequestProvider>
  )
}

export default App
