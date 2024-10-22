import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";

import Registration from "./pages/registration";


function App() {
  return (
    <div className="flex w-full h-full justify-center items-center">
      <Registration />
    </div>
  )
}

export default App
