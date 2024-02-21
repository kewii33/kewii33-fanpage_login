import { useEffect } from 'react';
import AddForm from 'components/AddForm';
import Fanletter from 'components/Fanletter';
import db from '../db.json';
import { useNavigate } from 'react-router-dom';
import 'reset.css';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { updateLetter } from 'store/modules/letterSlice';

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
  const dispatch = useDispatch();
  const letters = useSelector((state) => state.letters.letters);
  const filter = useSelector((state) => {
    return state.filters.selectedFilter;
  });

  const handleUpdate = (updated) => {
    dispatch(updateLetter(updated));
  };

  const filtered = getFilteredItems(letters, filter);

  const navigate = useNavigate();

  const handleDetail = (item) => {
    navigate(`/detail/${item.id}`);
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('fanletters'));
    if (!storedData || storedData.length === 0) {
      localStorage.setItem('fanletters', JSON.stringify(db));
    }
  }, [dispatch]);

  return (
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
  );
}

function getFilteredItems(letters, filter) {
  return letters.filter((letter) => letter.status === filter);
}

export default FanLetterLists;
