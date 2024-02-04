import React from 'react';
import 'reset.css';
import styled from 'styled-components';
import { setFilter } from '../redux/config/filters';
import { useDispatch, useSelector } from 'react-redux';

const HeaderTitle = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(25, 97, 180);
  font-size: 3rem;
  font-weight: bold;
  padding-top: 6rem;
  padding-bottom: 3rem;
`;

const HeaderFilter = styled.div`
  display: flex;
  width: 100%;
  height: 4rem;
  justify-content: center;
  align-items: center;
  list-style: none;
  border: 0.1px solid white;
  border-radius: 0.5rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding: 0.5rem;
  background-color: #8dd2ef;
`;

const FilterItem = styled.li`
  margin: 0.6rem;
  padding: 0.2rem 1.7rem;
  font-size: 1.4rem;
  border: 0.1px solid white;
  border-radius: 0.3rem;
  background-color: ${(props) => (props.isSelected ? '#edc5ff' : '#ffffff')};
  &:hover {
    cursor: pointer;
    background-color: ${(props) => (props.isSelected ? '#edc5ff' : '#edc5ff')};
  }
`;

function Header() {
  const filters = useSelector((state) => state.filters.filterList);
  const selectedFilter = useSelector((state) => state.filters.selectedFilter);

  const dispatch = useDispatch();
  const handleFilterChange = (newFilter) => {
    dispatch(setFilter(newFilter));
  };

  return (
    <>
      <HeaderTitle>뉴진스 팬레터 콜렉션</HeaderTitle>
      <HeaderFilter>
        {filters.map((value, index) => (
          <FilterItem
            key={index}
            isSelected={selectedFilter === value}
            onClick={() => {
              handleFilterChange(value);
            }}
          >
            {value}
          </FilterItem>
        ))}
      </HeaderFilter>
    </>
  );
}

export default Header;
