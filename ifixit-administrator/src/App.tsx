import Routing from "./routes";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routing />
      </Router>
    </AuthProvider>
  );
}

export default App;
