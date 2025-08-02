import axios from 'axios';

const BASE_URL = 'https://api.github.com/users';

export const fetchGitHubUser = async (username) => {
  const token = import.meta.env.VITE_GITHUB_TOKEN;
  const headers = token ? { Authorization: `token ${token}` } : {};
  
  const response = await axios.get(`${BASE_URL}/${username}`, { headers });
  return response.data;
};
