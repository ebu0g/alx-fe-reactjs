// src/services/githubService.js

const BASE_URL = "https://api.github.com";

export const searchUsers = async ({ username, location, minRepos }) => {
  try {
    // Build advanced query string
    let query = username || '';
    if (location) query += `+location:${location}`;
    if (minRepos) query += `+repos:>${minRepos}`;

    const response = await fetch(`${BASE_URL}/search/users?q=${query}`);
    
    if (!response.ok) {
      throw new Error("GitHub API request failed");
    }

    const data = await response.json();
    return data.items; // GitHub search API returns results in 'items'
  } catch (error) {
    console.error("Advanced search error:", error);
    throw error;
  }
};

export const getUserDetails = async (username) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${username}`);
    if (!response.ok) {
      throw new Error("User fetch failed");
    }
    return await response.json();
  } catch (error) {
    console.error("User detail fetch error:", error);
    throw error;
  }
};
