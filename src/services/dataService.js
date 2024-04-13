import axios from 'axios';

const getAll = () => {
  const request = axios.get('db.json');
  return request.then((response) => response.data);
};

export default { getAll };
