import axios from 'axios';

const login = async (username, password) => {
  try {
    const response = await axios.post('/login', { username, password });
    const { token } = response.data;
    localStorage.setItem('jwtToken', token);
  } catch (error) {
    console.error('Login failed', error);
  }
};

const fetchProtectedData = async () => {
  const jwtToken = localStorage.getItem('jwtToken');
  if (!jwtToken) {
    return;
  }
  try {
    const response = await axios.get('/api/protected', {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    console.log('Protected data', response.data);
  } catch (error) {
    console.error('Failed to fetch protected data', error);
  }
};

const logout = () => {
  localStorage.removeItem('jwtToken');
};
