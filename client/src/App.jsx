import Login from './views/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './views/Home'
import { AuthContextProvider } from './context/AuthContext'
import './App.scss'

function App() {
  return(
      <div className="app">
      <div className="app_wrp">
        <BrowserRouter>
        <AuthContextProvider>
          <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/markdown" element={<Home/>}/>
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
      </div>
    </div>
  )
}

export default App;
