import HomePage from "./pages/HomePage";
import { CallRequestProvider } from "./components/CallRequest/CallRequestContext";
import MobileCallButton from "./components/ui/MobileCallButton";

// App solo envuelve la página con los proveedores globales.
function App() {
  return (
    <CallRequestProvider>
      <HomePage />
      <MobileCallButton />
    </CallRequestProvider>
  );
}

export default App;
