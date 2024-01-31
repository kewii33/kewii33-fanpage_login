import React from 'react';
import 'reset.css';
import styled from 'styled-components';

const LetterCard = styled.div`
  margin: 0.6rem;
  background-color: #5f79cd;
  display: flex;
  border-radius: 0.3rem;
  border: 0.1rem solid white;
  padding: 1.2rem;
  cursor: pointer;
  transition: transform 0.2s ease;
  transform: scale(1);
  &:hover {
    transform: scale(1.05);
  }
`;

const ProfilePic = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
`;

const LetterCardContent = styled.div`
  margin-top: 0.5rem;
  margin-left: 1.4rem;
  color: white;
`;

const ContentElement = styled.div`
  margin-bottom: 0.7rem;
`;

const ContentElementPreview = styled.div`
  width: 27rem;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 0.3rem;
  padding: 0.3rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

function Fanletter({ letter, onClick }) {
  const { userName, content, formattedTime, avatar } = letter;
  const hasAvatar = !!avatar;
  const defaultAvatarURL =
    'https://i.pinimg.com/originals/1a/2a/39/1a2a39f46908773b0c6b6acd74b57d1f.jpg';
  const avatarURL = hasAvatar ? avatar : defaultAvatarURL;

  return (
    <LetterCard onClick={() => onClick(letter.id)}>
      <ProfilePic src={avatarURL} alt="avatar"></ProfilePic>
      <LetterCardContent>
        <ContentElement className="userName">{userName}</ContentElement>
        <ContentElement className="time">{formattedTime}</ContentElement>
        <ContentElementPreview className="content">
          {content}
        </ContentElementPreview>
      </LetterCardContent>
    </LetterCard>
  );
}

export default Fanletter;
