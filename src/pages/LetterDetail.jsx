import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editLetter, deleteLetter } from '../store/modules/letters';
import 'reset.css';
import styled from 'styled-components';

const DetailLetter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BackHomeButton = styled.div`
  margin-top: 2rem;
  margin-left: 2rem;

  button {
    padding: 0.8rem 1.6rem;
    cursor: pointer;
    background-color: #6b7bb0;
    color: white;
    border: white;
    border-radius: 0.5rem;
    box-shadow: 12px 12px 9px 0px rgba(0, 0, 0, 0.81);
    -webkit-box-shadow: 12px 12px 9px 0px rgba(0, 0, 0, 0.81);
    -moz-box-shadow: 12px 12px 9px 0px rgba(0, 0, 0, 0.81);
  }
  button:hover {
    color: white;
    background-color: #dcc6ff;
    border: white;
  }
`;

const LetterCard = styled.div`
  margin-top: 9rem;
  width: 49rem;
  height: 33rem;
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: #6b7bb0;
  padding: 0.2rem 1.2rem;
`;

const LetterCardHeader = styled.div`
  display: flex;
  align-items: center;
`;

const LetterCardProfile = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
`;

const LetterCardHeaderContent = styled.div`
  width: 40rem;
  height: 5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem;
`;

const UserName = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  color: white;
`;

const Nowtime = styled.div`
  color: white;
`;

const MemberName = styled.div`
  padding: 0.8rem;
  font-size: 1.4rem;
  color: white;
`;

const LetterCardDetail = styled.div`
  width: 46rem;
  height: 15rem;
  background-color: white;
  display: flex;
  padding: 0.8rem;
  border-radius: 1rem;
  margin: 0.5rem;
  font-size: 1.4rem;
  line-height: 1.5;
`;

const Edittextarea = styled.textarea`
  width: 46rem;
  height: 13rem;
  background-color: white;
  display: flex;
  border-radius: 1rem;
  font-size: 1.4rem;
  line-height: 1.5;
  resize: none;
  border: none;
`;

const DetailButtons = styled.div`
  display: flex;
  margin-left: auto;
  margin-top: 1rem;
  padding: 0.8rem;
  gap: 0.5rem;
  button {
    font-size: 1.4rem;
    padding: 0.3rem 0.5rem;
    cursor: pointer;
    background-color: white;
  }
  button:hover {
    color: white;
    background-color: #dcc6ff;
    border: solid white;
  }
`;

function LetterDetail() {
  const dispatch = useDispatch();
  const letters = useSelector((state) => state.letters.letters);

  const { letterId } = useParams();
  const [letter, setLetter] = useState(null);
  const [editedContent, setEditedContent] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [originalContent, setOriginContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const selectedLetter = letters.find((letter) => letter.id === letterId);

    if (selectedLetter) {
      setLetter(selectedLetter);
      setEditedContent(selectedLetter.content);
    } else {
      console.log('팬레터 정보가 없습니다.');
    }
  }, [letterId, letters]);

  if (!letter) {
    return <div>Loading...</div>;
  }

  const { avatar, userName, formattedTime, status } = letter;

  const hasAvatar = !!avatar;
  const defaultAvatarURL =
    'https://i.pinimg.com/originals/1a/2a/39/1a2a39f46908773b0c6b6acd74b57d1f.jpg';
  const avatarURL = hasAvatar ? avatar : defaultAvatarURL;

  const handleGoHome = () => {
    navigate(`/`);
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm('정말로 삭제하시겠습니까?');
    if (confirmDelete) {
      dispatch(deleteLetter(letterId));
      navigate('/');
    }
  };

  const enterEditMode = () => {
    setEditMode(true);
    setOriginContent(editedContent);
  };

  const handleEdit = () => {
    if (editedContent === originalContent) {
      alert('수정된 부분이 없습니다.');
      return;
    }
    const confirmEdit = window.confirm('이대로 수정하시겠습니까?');
    if (confirmEdit) {
      dispatch(editLetter(letterId, editedContent));
      setEditMode(false);
    }
  };

  const maxContentLength = 100;

  const handleCancel = () => {
    setEditMode(false);
    setEditedContent(originalContent);
  };

  return (
    <>
      <BackHomeButton>
        <button onClick={handleGoHome}>홈으로</button>
      </BackHomeButton>
      <DetailLetter>
        <LetterCard>
          <LetterCardHeader>
            <LetterCardProfile src={avatarURL} alt="avatar"></LetterCardProfile>
            <LetterCardHeaderContent>
              <UserName className="userName">{userName}</UserName>
              <Nowtime className="time">{formattedTime}</Nowtime>
            </LetterCardHeaderContent>
          </LetterCardHeader>
          <MemberName className="memberName">To. {status}</MemberName>
          <LetterCardDetail className="letterCardDetail">
            {editMode ? (
              <Edittextarea
                type="text"
                className="contentInput"
                value={editedContent}
                onChange={(e) =>
                  setEditedContent(e.target.value.slice(0, maxContentLength))
                }
              />
            ) : (
              <div className="content">{editedContent}</div>
            )}
          </LetterCardDetail>
          <DetailButtons className="DetailButtons">
            {editMode ? (
              <>
                <button onClick={handleEdit}>수정 완료</button>
                <button onClick={handleCancel}>취소</button>
              </>
            ) : (
              <>
                <button onClick={enterEditMode}>수정</button>
                <button onClick={handleDelete}>삭제</button>
              </>
            )}
          </DetailButtons>
        </LetterCard>
      </DetailLetter>
    </>
  );
}

export default LetterDetail;
