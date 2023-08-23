import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import { Layout } from 'antd';
import Login from './pages/Authorization/Login/Login';
import { Route, Router, Routes, useLocation, useNavigate } from 'react-router';
import Dashboard from './components/Dashboard/Dashboard';
import { useEffect, useState } from 'react';
import {
  UserProfile,
  addToken,
  fetchUserProfileAction,
} from './stores/Slice/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import { SignUp } from './pages/Authorization/SignUp/SignUp';

// function getToken() {
//   const tokenString = localStorage.getItem('token');
//   return tokenString
// }
// function GetToken(userToken) {
//   setToken(userToken);
//   localStorage.setItem('token', userToken);
// }

function App() {
  // const [token, setToken] = useState(getToken())
  const [location, setLocation] = useState(useLocation());
  const token = useSelector(UserProfile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // console.log(123, location.pathname);
  // useEffect(()=>{
  //   setLocation(useLocation());
  // } ,[])
  useEffect(() => {
    const getToken = async () => {
      await dispatch(addToken(localStorage.getItem('token')));
    };
    getToken();
    const checkToken = async () => {
      if (localStorage.getItem('token') === null) {
        navigate('/sign_in');
      } else {
        await dispatch(fetchUserProfileAction({ populate: 'role,avatar' }));
        navigate('/');
      }
    };
    checkToken();
  }, [localStorage.getItem('token')]);

  return (
    <div className="App">
      <Routes>
        <Route path="/sign_in" index element={<Login />} />
        <Route path="/sign_up" element={<SignUp />} />
        <Route path="/*" element={<Dashboard />} />
      </Routes>
    </div>
  );
}
export default App;
