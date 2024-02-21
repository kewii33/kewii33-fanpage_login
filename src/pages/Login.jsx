import React, { useState } from 'react';
import styled from 'styled-components';
import 'reset.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [status, setStatus] = useState('');
  const [data, setData] = useState([]);
  const [signupMode, setSignupMode] = useState(false);

  const navigate = useNavigate();

  const signupHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://moneyfulpublicpolicy.co.kr/register',
        {
          id,
          password,
          nickname,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('회원가입 성공:', response.data);
      alert('회원가입이 완료되었습니다. 로그인 해주세요.');
      setSignupMode(!signupMode);
      setId('');
      setPassword('');
      setNickname('');
    } catch (error) {
      if (
        // error.response &&
        // error.response.data &&
        error.response.data.message
      ) {
        const errorMessage = error.response.data.message;
        if (errorMessage === '이미 존재하는 유저 id입니다.') {
          alert('이미 존재하는 유저 id입니다.');
          setSignupMode(!signupMode);
        } else if (
          errorMessage === '아이디, 비밀번호, 닉네임은 필수값입니다.'
        ) {
          alert('아이디, 비밀번호, 닉네임은 필수값입니다.');
        } else {
          console.error('회원가입 실패:', error);
        }
      } else {
        console.error('회원가입 실패:', error);
      }
    }
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        '/login',
        {
          id,
          password,
        },
        { withCredentials: true }
      );
      localStorage.setItem('accessToken', response.data.accessToken);
      setId('');
      setPassword('');
      setData(response.data);
      console.log('response:', response);
      alert('로그인이 완료되었습니다.');
      navigate('/home');
      if (response.status === 200) {
        setStatus('인증 완료');
      } else {
        setStatus('인증 실패');
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        const errorMessage = error.response.data.message;
        if (errorMessage === '존재하지 않는 유저입니다.') {
          alert('존재하지 않는 유저입니다.');
        } else if (errorMessage === '비밀번호가 일치하지 않습니다.') {
          alert('비밀번호가 일치하지 않습니다.');
        } else {
          console.error('로그인 실패:', error);
        }
      }
    }
  };

  const enterSignupMode = (e) => {
    e.preventDefault();
    setSignupMode(!signupMode);
    setId('');
    setPassword('');
    setNickname('');
  };

  return (
    <LoginPageLayout>
      <LoginBox $signupMode={signupMode}>
        <LoginTitle>{signupMode ? '회원가입' : '로그인'}</LoginTitle>
        <LoginInputs>
          {signupMode ? (
            <>
              <InputID
                type="text"
                value={id}
                placeholder="아이디 (4~10글자)"
                onChange={(e) => {
                  setId(e.target.value);
                }}
              ></InputID>
              <InputPw
                type="text"
                value={password}
                placeholder="비밀번호 (4~15글자)"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              ></InputPw>
              <InputNickname
                type="text"
                value={nickname}
                placeholder="닉네임 (1~10글자)"
                onChange={(e) => {
                  setNickname(e.target.value);
                }}
              ></InputNickname>
            </>
          ) : (
            <>
              <InputID
                type="text"
                placeholder="아이디 (4~10글자)"
                value={id}
                onChange={(e) => {
                  setId(e.target.value);
                }}
              ></InputID>
              <InputPw
                type="password"
                placeholder="비밀번호 (4~15글자)"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              ></InputPw>
            </>
          )}
        </LoginInputs>
        <LoginPageBtns>
          <>
            {signupMode ? (
              <SignupBtn
                onClick={signupHandler}
                disabled={!id || !password}
                $disabled={!id || !password || !nickname}
              >
                회원가입
              </SignupBtn>
            ) : (
              <LoginBtn
                onClick={loginHandler}
                disabled={!id || !password}
                $disabled={!id || !password}
              >
                로그인
              </LoginBtn>
            )}
          </>
          <LoginToSignupBtn onClick={enterSignupMode}>
            {signupMode ? '로그인' : '회원가입'}
          </LoginToSignupBtn>
        </LoginPageBtns>
      </LoginBox>
    </LoginPageLayout>
  );
}

const LoginPageLayout = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #d3d3d3;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginBox = styled.form`
  width: 500px;
  height: ${(props) => (props.$signupMode ? '410px' : '340px')};
  background-color: white;
  border-radius: 10px;
  padding: 15px;
`;

const LoginTitle = styled.div`
  font-size: 36px;
`;

const LoginInputs = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 35px;
  margin-bottom: 25px;
  gap: 35px;
`;

const InputID = styled.input`
  width: 450px;
  height: 30px;
  border: none;
  border-bottom: 1px solid #979797;
  &:focus {
    outline: none;
  }
`;

const InputPw = styled.input`
  width: 450px;
  height: 30px;
  border: none;
  border-bottom: 1px solid #979797;
  &:focus {
    outline: none;
  }
`;

const InputNickname = styled.input`
  width: 450px;
  height: 30px;
  border: none;
  border-bottom: 1px solid #979797;
  &:focus {
    outline: none;
  }
`;

const LoginPageBtns = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 5px;
`;

const LoginBtn = styled.button`
  width: 460px;
  height: 80px;
  background-color: ${(props) => (props.$disabled ? '#a9a9a9' : 'black')};
  border: 1px solid #979797;
  cursor: pointer;
  color: white;
  font-size: 20px;
`;

const SignupBtn = styled.button`
  width: 460px;
  height: 80px;
  background-color: ${(props) => (props.$disabled ? '#a9a9a9' : 'black')};
  border: 1px solid #979797;
  cursor: pointer;
  color: white;
  font-size: 20px;
`;

const LoginToSignupBtn = styled.button`
  width: 460px;
  height: 30px;
  border: 1px solid #979797;
  background-color: transparent;
  cursor: pointer;
  border: none;
  font-size: 15px;
  color: #979797;
  &:hover {
    color: black;
  }
`;

export default Login;
