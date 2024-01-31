import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from 'pages/Home';
import NotFound from 'pages/NotFound';
import LetterDetail from 'pages/LetterDetail';
import Root from 'pages/Root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: '/detail/:letterId', element: <LetterDetail /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
