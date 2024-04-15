import axios from 'axios';

const getAll = () => {
  const request = axios.get('db.json');
  return request
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error fetching data:', error);
      throw error;
    });
};

export default getAll;
