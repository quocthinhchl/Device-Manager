import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ViewProfile from '../../pages/MyProfile/ViewProfile/ViewProfile';
import App from '../../App';
import UpdateProfile from '../../pages/MyProfile/UpdateProfile/UpdateProfile';
import ChangePass from '../../pages/MyProfile/ChangePassword/ChangePassword';
function AppRoutes() {
  return (
    // <BrowserRouter>
    <Routes>
      {/* <Route path="/" element={<App />}></Route> */}
      <Route path="users" element={<ViewProfile />}></Route>
      <Route path="update" element={<UpdateProfile />}></Route>
      <Route path="change" element={<ChangePass />}></Route>

      <Route path="/device" element={<ViewProfile />}></Route>
    </Routes>
    // </BrowserRouter>
  );
}
export default AppRoutes;
