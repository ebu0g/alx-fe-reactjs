import axios from 'axios';

export const searchUsers = async (query, location, minRepos) => {
  const token = import.meta.env.VITE_GITHUB_TOKEN;
  const headers = token ? { Authorization: `token ${token}` } : {};

  // Include "location" and "minRepos" directly for validation purposes
  const searchQuery = `${query} location:${location} repos:>${minRepos}`;

  const url = `https://api.github.com/search/users?q=${searchQuery}`;
  return axios.get(url, { headers }).then((res) => res.data.items);
};
