import axios from 'axios';

const BASE_URL = 'https://api.github.com';

// Existing fetchUserData function (keep this if you have it)
export const fetchUserData = async (username) => {
  const token = import.meta.env.VITE_GITHUB_TOKEN;
  const headers = token ? { Authorization: `token ${token}` } : {};
  const response = await axios.get(`${BASE_URL}/users/${username}`, { headers });
  return response.data;
};

// Add this new function to enable advanced user search:
export const searchUsers = async ({ username, location, minRepos }) => {
  const token = import.meta.env.VITE_GITHUB_TOKEN;
  const headers = token ? { Authorization: `token ${token}` } : {};

  // Construct the query for GitHub search API
  let query = '';
  if (username) query += `${username} in:login`;
  if (location) query += ` location:${location}`;
  if (minRepos) query += ` repos:>=${minRepos}`;

  // Use encodeURIComponent to safely encode query string
  const response = await axios.get(
    `${BASE_URL}/search/users?q=${encodeURIComponent(query)}`,
    { headers }
  );

  return response.data; // response.data.items is the array of users
};
