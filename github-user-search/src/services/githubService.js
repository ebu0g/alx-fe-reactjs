// src/services/githubService.js

const BASE_URL = "https://api.github.com";

export const searchUsers = async (query) => {
  try {
    const response = await fetch(`${BASE_URL}/search/users?q=${query}`);
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    const data = await response.json();
    return data.items; // GitHub API returns users under the "items" key
  } catch (error) {
    console.error("Error searching users:", error);
    throw error;
  }
};

export const getUserDetails = async (username) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${username}`);
    if (!response.ok) {
      throw new Error("Failed to fetch user details");
    }
    return await response.json();
  } catch (error) {
    console.error("Error getting user details:", error);
    throw error;
  }
};
