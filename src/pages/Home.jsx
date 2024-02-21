import 'reset.css';
import { useSelector } from 'react-redux';
import Header from 'components/Header';
import FanLetterLists from 'components/FanLetterLists';
import styled from 'styled-components';
import Navbar from 'components/Navbar';

const Main = styled.div`
  width: auto;
  height: auto;
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
  useSelector((state) => state.filter);

  return (
    <>
      <Navbar />
      <Main>
        <div className="App">
          <Header />
          <FanLetterLists />
        </div>
      </Main>
    </>
  );
}

export default Home;
