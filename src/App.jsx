import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import { Layout } from 'antd';
import Login from './pages/Authorization/Login/Login';
import { Route, Router, Routes, useLocation, useNavigate } from 'react-router';
import Dashboard from './components/Dashboard/Dashboard';
import { useEffect, useState } from 'react';



function getToken() {
  const tokenString = localStorage.getItem('token');
  return tokenString
}

function App() {
  // const { token, setToken } = useToken();
  const [token, setToken] = useState(getToken())
  const [location, setLocation] = useState(useLocation())
  function GetToken(userToken) {
    setToken(userToken);
    localStorage.setItem('token', userToken);
  }
  const navigate = useNavigate();
  console.log(123, location);
  useEffect(() => {
    if (!token) {
      navigate('/')
    } else {
      if (location.pathname === '/') {
        navigate('/dashboard')
      } else {
        navigate(`${location.pathname}`)
      }
    }
  }, [localStorage.getItem('token')])
  return (
    <div className="App">
      <Routes>
        <Route path="/" index element={<Login setToken={GetToken} />} />
        <Route path="/dashboard/*" element={<Dashboard setToken={setToken} setLocation={setLocation} />} />
      </Routes>
    </div>
  );
}
export default App;
