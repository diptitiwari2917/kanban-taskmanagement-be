import Routes from "./routes";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext.tsx';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
