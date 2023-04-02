import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import { Layout } from 'antd';
import PageContent from './components/PageContent/PageContent';
import Login from './pages/Authorization/Login/Login';
import { Route, Router, Routes } from 'react-router';
import ViewProfile from './pages/MyProfile/ViewProfile/ViewProfile';
import Dashboard from './components/Dashboard/Dashboard';
// import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard/*" index element={<Dashboard />} />
      </Routes>
    </div>
  );
}
export default App;
