import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

function PrivateRoute({ component: Component }) {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    const checkTokenValidity = async () => {
      if (accessToken) {
        try {
          const response = await axios.get('/user', {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
          });

          if (
            response.data &&
            response.data.message ===
              '토큰이 만료되었습니다. 다시 로그인 해주세요.'
          ) {
            alert('토큰이 만료되었습니다. 다시 로그인 해주세요.');
            navigate('/');
          }
        } catch (error) {
          console.error('토큰 확인 중 에러:', error);
          alert('토큰이 만료되었습니다. 다시 로그인 해주세요.');
          navigate('/');
        }
      }
    };

    checkTokenValidity();
  }, [accessToken, navigate]);

  return accessToken ? Component : <Navigate to="/" />;
}

export default PrivateRoute;
