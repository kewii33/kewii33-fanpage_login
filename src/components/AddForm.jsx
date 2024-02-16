import React from 'react';
import 'reset.css';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import { addLetter } from 'store/modules/letters';

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

const StyledInputName = styled.input`
  width: 28rem;
  padding: 0.3rem;
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

function AddForm() {
  const dispatch = useDispatch();

  const maxNameLength = 20;
  const maxContentLength = 100;

  const [userName, setUserName] = useState('');
  const [content, setContent] = useState('');
  const [selectedIdol, setselectedIdol] = useState('');
  const [status, setStatus] = useState('혜인');

  const handleNameChange = (e) => {
    const value = e.target.value.slice(0, maxNameLength);
    setUserName(value);
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userName.trim().length === 0 || content.trim().length === 0) {
      alert('닉네임과 내용은 필수 입력값입니다.');
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
      userName,
      content,
      status,
      formattedTime,
    };

    dispatch(addLetter(newLetter));

    setUserName('');
    setContent('');
  };

  return (
    <InputContainer>
      <form onSubmit={handleSubmit}>
        <StyledInputNameContainer className="nameInput">
          닉네임 :
          <StyledInputName
            type="text"
            placeholder="최대 20글자까지 작성할 수 있습니다."
            value={userName}
            onChange={handleNameChange}
          ></StyledInputName>
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

export default AddForm;
