import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import { Layout } from 'antd';
import Login from './pages/Authorization/Login/Login';
import { Route, Router, Routes, useNavigate } from 'react-router';
import Dashboard from './components/Dashboard/Dashboard';
import { useEffect, useState } from 'react';



function getToken() {
  const tokenString = localStorage.getItem('token');
  return tokenString
}

function App() {
  // const { token, setToken } = useToken();
  const [token, setToken] = useState(getToken())
  function GetToken(userToken) {
    setToken(userToken);
    localStorage.setItem('token', userToken);
  }

  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate('/')
    } else {
      navigate('/dashboard')
    }
    // return navigate('/')
  }, [localStorage.getItem('token')])
  return (
    <div className="App">
      <Routes>
        <Route path="/" index element={<Login setToken={GetToken} />} />
        <Route path="/dashboard/*" element={<Dashboard setToken={setToken} />} />
      </Routes>
    </div>
  );
}
export default App;
