import React from 'react';
import 'reset.css';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Navbar() {
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem('accessToken');
    alert('로그아웃 되었습니다.');
    navigate('/');
  };
  return (
    <div>
      <HeaderTap>
        <GoHome to="/home">HOME</GoHome>
        <GoMyPage>
          <GoMyProfile to="/profile">내 프로필</GoMyProfile>
          <GoLogout onClick={logoutHandler}>로그아웃</GoLogout>
        </GoMyPage>
      </HeaderTap>
    </div>
  );
}

const HeaderTap = styled.div`
  width: auto;
  height: 40px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: black;
  padding: 15px;
  border-bottom: 1px rgb(25, 97, 180) solid;
`;

const GoHome = styled(Link)`
  color: black;
  text-decoration: none;
  display: flex;
  text-align: center;
  font-weight: bold;
  &:hover {
    color: rgb(25, 97, 180);
  }
`;

const GoMyPage = styled.div`
  display: flex;
  gap: 10px;
`;

const GoMyProfile = styled(Link)`
  color: black;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    color: rgb(25, 97, 180);
  }
`;

const GoLogout = styled(Link)`
  color: black;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    color: rgb(25, 97, 180);
  }
`;

export default Navbar;
