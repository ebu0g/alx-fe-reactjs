import axios from 'axios';

const BASE_SEARCH_URL = 'https://api.github.com/search/users';

export const searchUsers = async ({ username, location, minRepos, page = 1 }) => {
  const token = import.meta.env.VITE_GITHUB_TOKEN;
  const headers = token ? { Authorization: `token ${token}` } : {};

  // Build the query string
  let query = '';
  if (username) query += `${username} `;
  if (location) query += `location:${location} `;
  if (minRepos) query += `repos:>=${minRepos} `;

  const params = {
    q: query.trim(),
    per_page: 10,
    page,
  };

  const response = await axios.get(BASE_SEARCH_URL, { headers, params });
  return response.data; // { total_count, items: [...] }
};
