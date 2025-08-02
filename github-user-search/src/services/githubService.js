import axios from 'axios';

const BASE_URL = 'https://api.github.com';

// Existing function (do not remove)
export const fetchUserData = async (username) => {
  const token = import.meta.env.VITE_GITHUB_TOKEN;
  const headers = token ? { Authorization: `token ${token}` } : {};

  const response = await axios.get(`${BASE_URL}/users/${username}`, { headers });
  return response.data;
};

// ADD THIS NEW FUNCTION to handle advanced user search:
export const searchUsers = async ({ username, location, minRepos }) => {
  const token = import.meta.env.VITE_GITHUB_TOKEN;
  const headers = token ? { Authorization: `token ${token}` } : {};

  // Build search query string for GitHub API
  let query = '';
  if (username) query += `${username} in:login`;
  if (location) query += ` location:${location}`;
  if (minRepos) query += ` repos:>=${minRepos}`;

  const response = await axios.get(`${BASE_URL}/search/users?q=${encodeURIComponent(query)}`, { headers });
  return response.data;  // contains 'items' array with users
};
