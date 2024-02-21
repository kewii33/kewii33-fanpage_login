import React, { useEffect, useRef, useState } from 'react';
import Navbar from 'components/Navbar';
import styled from 'styled-components';
import 'reset.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [editMode, setEditMode] = useState(false);
  const inputRef = useRef();
  const [editNickname, setEditNickname] = useState('');
  const [userProfile, setUserProfile] = useState({
    id: '',
    nickname: '',
    avatar: '',
  });

  const [imgFile, setImgFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImgFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      setUserProfile((prevProfile) => ({
        ...prevProfile,
        avatar: e.target.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const getUserProfile = async () => {
      try {
        const response = await axios.get('/user', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log('response:', response);
        const { id, nickname, avatar } = response.data;
        setUserProfile({
          id,
          nickname,
          avatar:
            avatar ||
            'https://i.pinimg.com/originals/1a/2a/39/1a2a39f46908773b0c6b6acd74b57d1f.jpg',
          success: true,
        });
        setEditNickname(nickname);
      } catch (error) {
        console.error('프로필 정보 가져오기 실패:', error);
      }
    };
    if (accessToken) {
      getUserProfile();
    }
  }, []);

  const defaultAvatarURL =
    'https://i.pinimg.com/originals/1a/2a/39/1a2a39f46908773b0c6b6acd74b57d1f.jpg';

  const enterEditMode = (e) => {
    e.preventDefault();
    inputRef.current && inputRef.current.focus();
    setEditMode(!editMode);
  };

  const editConfirmHandler = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem('accessToken');
      const formData = new FormData();
      formData.append('avatar', imgFile);
      formData.append('nickname', editNickname);

      const response = await axios.patch('/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      alert('프로필 수정이 완료되었습니다.');
      window.location.reload();
    } catch (error) {
      console.error('프로필 수정 실패:', error);
      console.error('에러 메시지:', error.response?.data || error.message);
    }
  };

  const isEditButtonDisabled = !editNickname && !imgFile;

  const { nickname, id, avatar } = userProfile;

  return (
    <>
      <Navbar />
      <ProfilePageLayout>
        <ProfileBox>
          <ProfileTitle>프로필 관리</ProfileTitle>
          {editMode ? (
            <>
              <label htmlFor="profilePic">
                <ProfilePic src={avatar || defaultAvatarURL} alt="avatar" />
              </label>
              <input
                type="file"
                id="profilePic"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
            </>
          ) : (
            <label htmlFor="profilePic">
              <ProfilePic src={avatar || defaultAvatarURL} alt="avatar" />
            </label>
          )}

          <UserNickname>
            {editMode ? (
              <EditNicknameInput
                type="text"
                value={editNickname}
                onChange={(e) => setEditNickname(e.target.value)}
                ref={inputRef}
              ></EditNicknameInput>
            ) : (
              nickname
            )}
          </UserNickname>
          <UserID>{id}</UserID>
          <ProfileBtns>
            {editMode ? (
              <>
                <CancelBtn onClick={enterEditMode}>취소</CancelBtn>
                <EditConfirmBtn
                  onClick={editConfirmHandler}
                  disabled={isEditButtonDisabled}
                >
                  수정완료
                </EditConfirmBtn>
              </>
            ) : (
              <EditBtn onClick={enterEditMode}>수정하기</EditBtn>
            )}
          </ProfileBtns>
        </ProfileBox>
      </ProfilePageLayout>
    </>
  );
}

const ProfilePageLayout = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #d3d3d3;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProfileBox = styled.form`
  width: 500px;
  height: 350px;
  background-color: white;
  border-radius: 10px;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ProfileTitle = styled.div`
  color: black;
  font-size: 35px;
  font-weight: bold;
  padding: 10px;
`;

const ProfilePic = styled.img`
  background-color: green;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: 20px;
`;

const UserNickname = styled.div`
  width: 250px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  font-size: 25px;
  font-weight: bold;
  margin: 15px;
`;

const EditNicknameInput = styled.input`
  width: 250px;
  height: 20px;
  padding: 5px;
`;

const UserID = styled.div`
  color: #979797;
  font-size: 20px;
  margin: 5px;
`;

const ProfileBtns = styled.div`
  display: flex;
  margin: 10px;
  gap: 10px;
`;

const EditBtn = styled.button`
  width: 80px;
  height: 40px;
  background-color: black;
  font-size: 15px;
  color: white;
  cursor: pointer;
`;

const CancelBtn = styled.button`
  width: 80px;
  height: 40px;
  background-color: black;
  font-size: 15px;
  color: white;
  cursor: pointer;
`;

const EditConfirmBtn = styled.button`
  width: 80px;
  height: 40px;
  background-color: #d3d3d3;
  border: none;
  font-size: 15px;
  color: white;
  cursor: pointer;
`;

export default Profile;
