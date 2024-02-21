import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const NonAuthLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      navigate('/home');
    }
  }, []);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default NonAuthLayout;
