import axios from 'axios';

export const searchUsers = async (query) => {
  const url = `https://api.github.com/search/users?q=${query}`;
  const token = import.meta.env.VITE_GITHUB_TOKEN;

  const headers = token ? { Authorization: `token ${token}` } : {};

  const response = await axios.get(url, { headers });
  return response.data.items;
};
