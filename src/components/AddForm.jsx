import React, { useEffect } from 'react';
import 'reset.css';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import { addLetter } from 'store/modules/letterSlice';
import axios from 'axios';

function AddForm() {
  const dispatch = useDispatch();

  const maxContentLength = 100;
  const [nickname, setNickname] = useState('');
  const [content, setContent] = useState('');
  const [selectedIdol, setselectedIdol] = useState('');
  const [status, setStatus] = useState('혜인');

  const handleContentChange = (e) => {
    const value = e.target.value.slice(0, maxContentLength);
    setContent(value);
  };

  const handleIdolChange = (e) => {
    let statusValue;
    switch (e.target.value) {
      case '혜인':
        statusValue = '혜인';
        break;
      case '민지':
        statusValue = '민지';
        break;
      case '해린':
        statusValue = '해린';
        break;
      case '다니엘':
        statusValue = '다니엘';
        break;
      case '하니':
        statusValue = '하니';
        break;
      default:
        statusValue = status;
    }

    setStatus(statusValue);
    setselectedIdol(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (content.trim().length === 0) {
      alert('내용은 필수 입력값입니다.');
      return;
    }

    const formattedTime = new Date().toLocaleDateString('ko', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    const newLetter = {
      id: uuidv4(),
      nickname,
      content,
      status,
      formattedTime,
    };

    try {
      await axios.post('http://localhost:5000/letters', newLetter);
      console.log('팬레터 저장 성공');
      dispatch(addLetter(newLetter));
      setContent('');
    } catch (error) {
      console.error('팬레터 저장 실패:', error);
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    const getNickname = async () => {
      try {
        if (accessToken) {
          const response = await axios.get('/user', {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
          });
          console.log('response:', response);
          setNickname(response.data.nickname);
        }
      } catch (error) {
        console.log('닉네임 불러오기 실패:', error);
      }
    };

    getNickname();
  }, []);

  return (
    <InputContainer>
      <form onSubmit={handleSubmit}>
        <StyledInputNameContainer>
          닉네임 :<StyledInputName>{nickname}</StyledInputName>
        </StyledInputNameContainer>
        <StyledInputContentContainer className="contentInput">
          내용 :
          <StyledInputContent
            type="text"
            placeholder="최대 100자까지만 작성할 수 있습니다."
            value={content}
            onChange={handleContentChange}
          ></StyledInputContent>
        </StyledInputContentContainer>
        <SelectContainer>
          누구한테 보내실 건가요?
          <SelectContent value={selectedIdol} onChange={handleIdolChange}>
            <option>혜인</option>
            <option>민지</option>
            <option>해린</option>
            <option>다니엘</option>
            <option>하니</option>
          </SelectContent>
        </SelectContainer>
        <button>팬래터 등록</button>
      </form>
    </InputContainer>
  );
}

const InputContainer = styled.div`
  width: 100%;
  height: 15rem;
  background-color: white;
  display: flex;
  justify-content: center;
  padding-top: 0.6rem;
  border: solid #8dd2ef;
  border-radius: 0.7rem;
  button {
    display: flex;
    margin-left: auto;
    margin-right: 1rem;
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
    padding-left: 1rem;
    padding-right: 1rem;
    cursor: pointer;
    font-size: 0.9rem;
  }
  button:hover {
    color: white;
    background-color: #449ee7;
    border: 0.1rem solid white;
  }
`;

const StyledInputNameContainer = styled.div`
  width: 36rem;
  padding-top: 1rem;
  padding-bottom: 0.2rem;
  padding-left: 0.1rem;
  padding-right: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledInputName = styled.div`
  width: 28rem;
  padding: 0.4rem;
  margin-right: 15px;
`;

const StyledInputContentContainer = styled.div`
  width: 36rem;
  height: 6rem;
  padding-top: 0.4rem;
  padding-left: 0.1rem;
  padding-right: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
`;

const StyledInputContent = styled.textarea`
  width: 28rem;
  height: 5rem;
  padding: 0.4rem;
  resize: none;
  margin: 0;
`;

const SelectContainer = styled.div`
  padding-left: 0.2rem;
  margin-top: 0.8rem;
`;

const SelectContent = styled.select`
  margin-left: 0.5rem;
`;

export default AddForm;
