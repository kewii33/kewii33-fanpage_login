import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateLetter, deleteLetter } from 'store/modules/letters';
import { selectUserId } from 'store/modules/login';
import 'reset.css';
import Navbar from 'components/Navbar';
import styled from 'styled-components';
import axios from 'axios';

function LetterDetail() {
  const dispatch = useDispatch();
  const letters = useSelector((state) => state.letters.letters);
  const id = useSelector(selectUserId);
  const [nickname, setNickname] = useState('');
  const [profilePic, setProfilePic] = useState('');

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

    const getProfilePic = async () => {
      const accessToken = localStorage.getItem('accessToken');
      try {
        const response = await axios.get('/user', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log('response:', response);
        setProfilePic({
          id: response.data.id,
          nickname: response.data.nickname,
          avatar: response.data.avatar || '',
        });
      } catch (error) {
        console.error('프로필 정보 가져오기 실패:', error);
      }
    };
    if (accessToken) {
      getProfilePic();
    }
  }, []);

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

  const { avatar, formattedTime, status, nickname: authorNickname } = letter;

  const hasAvatar = !!avatar;
  const defaultAvatarURL =
    'https://i.pinimg.com/originals/1a/2a/39/1a2a39f46908773b0c6b6acd74b57d1f.jpg';
  const avatarURL = hasAvatar ? avatar : defaultAvatarURL;

  const handleGoHome = () => {
    navigate('/home');
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('정말로 삭제하시겠습니까?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/letters/${letterId}`);
        dispatch(deleteLetter(letterId));
        navigate('/home');
      } catch (error) {
        console.error('삭제 실패:', error);
      }
    }
  };

  const enterEditMode = () => {
    setEditMode(true);
    setOriginContent(editedContent);
  };

  const handleEdit = async () => {
    if (editedContent === originalContent) {
      alert('수정된 부분이 없습니다.');
      return;
    }

    const confirmEdit = window.confirm('이대로 수정하시겠습니까?');
    if (confirmEdit) {
      try {
        const response = await axios.patch(
          `http://localhost:5000/letters/${letterId}`,
          {
            content: editedContent,
          }
        );
        console.log('서버 응답:', response);
        dispatch(updateLetter(letterId, editedContent));
        setEditMode(false);
      } catch (error) {
        console.error('수정 실패:', error);
      }
    }
  };

  const maxContentLength = 100;

  const handleCancel = () => {
    setEditMode(false);
    setEditedContent(originalContent);
  };

  return (
    <>
      <Navbar />
      <BackHomeButton>
        <button onClick={handleGoHome}>홈으로</button>
      </BackHomeButton>
      <DetailLetter>
        <LetterCard>
          <LetterCardHeader>
            <LetterCardProfile
              src={
                nickname === authorNickname
                  ? profilePic.avatar || defaultAvatarURL
                  : defaultAvatarURL
              }
              alt="avatar"
            ></LetterCardProfile>
            <LetterCardHeaderContent>
              <UserName className="userName">{authorNickname}</UserName>
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
            {nickname === authorNickname && (
              <>
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
              </>
            )}
          </DetailButtons>
        </LetterCard>
      </DetailLetter>
    </>
  );
}

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

export default LetterDetail;
