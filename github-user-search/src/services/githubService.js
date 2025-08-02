// src/services/githubService.js

const BASE_URL = "https://api.github.com";

export const searchUsers = async ({ username = "", location = "", minRepos = "" }) => {
  try {
    let query = "";

    if (username) query += `${username}`;
    if (location) query += `+location:${location}`;
    if (minRepos) query += `+repos:>${minRepos}`;

    const url = `${BASE_URL}/search/users?q=${encodeURIComponent(query)}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("GitHub API request failed");
    }

    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error("GitHub search failed:", error);
    throw error;
  }
};
