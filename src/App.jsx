import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import { Layout } from 'antd';
import Login from './pages/Authorization/Login/Login';
import { Route, Router, Routes, useNavigate } from 'react-router';
import Dashboard from './components/Dashboard/Dashboard';
import useToken from './useToken';


function App() {
  const { token, setToken } = useToken();

  // if (!token) {
  //   return <Login setToken={setToken} />
  // }
  return (
    <div className="App">
      {/* <Dashboard setToken={setToken} /> */}
      <Routes>
        <Route path="/" index element={<Login setToken={setToken} />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
    </div>
  );
}
export default App;
