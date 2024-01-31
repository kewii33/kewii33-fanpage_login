import 'reset.css';
import { useEffect, useState } from 'react';
import Header from 'components/Header/Header';
import FanLetterLists from 'components/FanLetterLists/FanLetterLists';
import styled from 'styled-components';

const filters = ['혜인', '민지', '해린', '다니엘', '하니'];

const Main = styled.div`
  width: 100vw;
  height: 102vh;
  display: flex;
  justify-content: center;
  background: rgb(141, 210, 239);
  background: linear-gradient(
    180deg,
    rgba(141, 210, 239, 1) 0%,
    rgba(255, 255, 255, 1) 64%
  );
`;

function Home() {
  const [filter, setFilter] = useState(() => {
    const storedFilter = localStorage.getItem('selectedFilter');
    return storedFilter && filters.includes(storedFilter)
      ? storedFilter
      : filters[0];
  });

  useEffect(() => {
    if (!filters.includes(filter)) {
      setFilter(filters[0]);
    }
    localStorage.setItem('selectedFilter', filter);
  }, [filter]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <Main>
      <div className="App">
        <Header
          filters={filters}
          filter={filter}
          onFilterChange={handleFilterChange}
        />
        <FanLetterLists filter={filter} />
      </div>
    </Main>
  );
}

export default Home;
