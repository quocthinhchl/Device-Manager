import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import { Layout } from 'antd';
import Login from './pages/Authorization/Login/Login';
import { Route, Router, Routes, useNavigate } from 'react-router';
import Dashboard from './components/Dashboard/Dashboard';
import useToken from './useToken';
import { useEffect } from 'react';


function App() {
  const { token, setToken } = useToken();
  const navigate = useNavigate();
  // if (!token) {
  //   return <Login setToken={setToken} />
  // }
  useEffect(() => {
    if (!token) {
      navigate('/')
    } else {
      navigate('/dashboard')
    }
    // return navigate('/')
  }, [token])
  return (
    <div className="App">
      {/* <Dashboard setToken={setToken} /> */}
      <Routes>
        <Route path="/" index element={<Login setToken={setToken} />} />
        <Route path="/dashboard/*" element={<Dashboard setToken={setToken} />} />
      </Routes>
    </div>
  );
}
export default App;
