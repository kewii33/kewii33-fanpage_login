// import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
// import Home from 'pages/Home';
// import LetterDetail from 'pages/LetterDetail';
// import Login from 'pages/Login';
// import Profile from 'pages/Profile';
// import { useSelector } from 'react-redux';

// function Router() {
//   const isLogin = useSelector((state) => state.authSlice.isLogin);
//   const access = localStorage.getItem('Token');

//   return (
//     <BrowserRouter>
//       <Routes>
//         {isLogin ? (
//           <>
//             <Route path="/home" element={<Home />} />
//             <Route path="/detail/:letterId" element={<LetterDetail />} />
//             <Route path="/profile" element={<Profile />} />
//             <Route path="*" element={<Navigate replace to="/home" />} />
//           </>
//         ) : (
//           <>
//             <Route path="/" element={<Login />} />
//             <Route path="*" element={<Navigate replace to="/" />} />
//           </>
//         )}
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default Router;

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from 'pages/Home';
import LetterDetail from 'pages/LetterDetail';
import Login from 'pages/Login';
import Profile from 'pages/Profile';
import PrivateRoute from './PrivateRoute';
import NonAuthLayout from './NonAuthLayout';
import AuthLayout from './AuthLayout';

function Router() {
  const access = localStorage.getItem('Token');
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/home"
          element={<PrivateRoute authenticated={access} component={<Home />} />}
        />
        <Route
          path="/detail/:letterId"
          element={
            <PrivateRoute authenticated={access} component={<LetterDetail />} />
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute authenticated={access} component={<Profile />} />
          }
        />
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
