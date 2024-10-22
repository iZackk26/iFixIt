import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";


function App() {
  return (
    <div className='flex items-center justify-center bg-white w-screen h-screen'>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        </Router>
    </div>
  )
}

export default App
