import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const AuthLayout = () => {
  const [isRendered, setIsRendered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      navigate('/');
    } else {
      setIsRendered(true);
    }
  }, [navigate]);

  if (!isRendered) {
    return null;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
