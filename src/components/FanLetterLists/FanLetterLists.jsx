import { useContext, useState, useEffect } from 'react';
import AddForm from 'components/AddForm/AddForm';
import Fanletter from 'components/Fanletter/Fanletter';
import fakeData from 'assets/fakeData.json';
import { useNavigate } from 'react-router-dom';
import 'reset.css';
import styled from 'styled-components';
import { FanPageContext } from 'context/FanPageContext';
import { FanLetterContext } from 'context/FanLetterContext';

const LetterList = styled.div`
  background-color: #8dd2ef;
  display: flex;
  flex-direction: column;
  margin-top: 1.3rem;
  margin-bottom: 1.3rem;
  border-radius: 0.7rem;
  padding: 1rem;
`;

function FanLetterLists() {
  // useEffect(() => {
  //   localStorage.clear();
  // }, []);

  const { filter } = useContext(FanPageContext);

  const [letters, setLetters] = useState(() => {
    const storedData =
      JSON.parse(localStorage.getItem('fanletters')) || fakeData;
    return [...storedData];
  });

  const handleAdd = (letter) => {
    const newLetters = [...letters, letter];
    setLetters(newLetters);
    localStorage.setItem('fanletters', JSON.stringify(newLetters));
  };

  const handleUpdate = (updated) => {
    const updatedLetters = letters.map((l) =>
      l.id === updated.id ? updated : l
    );
    setLetters(updatedLetters);
    localStorage.setItem('fanletters', JSON.stringify(updatedLetters));
  };

  const filtered = getFilteredItems(letters, filter);

  const navigate = useNavigate();

  const handleDetail = (item) => {
    navigate(`/detail/${item.id}`);
  };

  useEffect(() => {
    if (!localStorage.getItem('fanletters')) {
      localStorage.setItem('fanletters', JSON.stringify(fakeData));
    }
  }, []);

  return (
    <FanLetterContext.Provider
      value={{
        onAdd: handleAdd,
      }}
    >
      <section>
        <AddForm />
        <LetterList>
          {filtered.length === 0 ? (
            <p>
              {filter}에게 남겨진 팬레터가 없습니다. 첫 번째 팬레터의 주인공이
              되세요!🐇
            </p>
          ) : (
            filtered.map((item) => (
              <Fanletter
                key={item.id}
                letter={item}
                onUpdate={handleUpdate}
                status={item.status}
                onClick={() => handleDetail(item)}
              />
            ))
          )}
        </LetterList>
      </section>
    </FanLetterContext.Provider>
  );
}

function getFilteredItems(letters, filter) {
  return letters.filter((letter) => letter.status === filter);
}

export default FanLetterLists;
