import 'reset.css';
import { useSelector } from 'react-redux';
import Header from 'components/Header';
import FanLetterLists from 'components/FanLetterLists';
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
  const filters = useSelector((state) => state.filter);
  const filter = useSelector((state) => state.filter);

  return (
    <Main>
      <div className="App">
        <Header />
        <FanLetterLists />
      </div>
    </Main>
  );
}

export default Home;
