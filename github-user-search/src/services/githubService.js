import axios from 'axios';

const BASE_URL = 'https://api.github.com';

// Fetch user by username (existing)
export const fetchUserData = async (username) => {
  const token = import.meta.env.VITE_GITHUB_TOKEN;
  const headers = token ? { Authorization: `token ${token}` } : {};

  const response = await axios.get(`${BASE_URL}/users/${username}`, { headers });
  return response.data;
};

// Advanced search function (new)
export const searchUsers = async ({ username, location, minRepos }) => {
  const token = import.meta.env.VITE_GITHUB_TOKEN;
  const headers = token ? { Authorization: `token ${token}` } : {};

  // Build query string
  let query = '';
  if (username) query += `${username} in:login`;
  if (location) query += ` location:${location}`;
  if (minRepos) query += ` repos:>=${minRepos}`;

  const response = await axios.get(`${BASE_URL}/search/users?q=${encodeURIComponent(query)}`, { headers });
  return response.data; // this contains items[] array of users
};
