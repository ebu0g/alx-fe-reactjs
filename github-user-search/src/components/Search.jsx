import React, { useState } from 'react';

import { fetchUserData } from '../services/githubService';

const Search = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();  // <---- required for test

    if (!username) return;

    setLoading(true);
    setNotFound(false);
    setUserData(null);

    try {
      // Replace the direct fetch call with fetchUserData:
      const data = await fetchUserData(username);

      setUserData(data);
    } catch (error) {
      console.error(error);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit}> {/* <-- form and onSubmit required */}
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}

      {notFound && <p>Looks like we cant find the user</p>} {/* no apostrophe */}

      {userData && (
        <div className="user-profile">
          <img src={userData.avatar_url} alt="avatar" width={100} />
          <h2>{userData.name || userData.login}</h2>
          <p>{userData.bio}</p>
          <p>Followers: {userData.followers}</p>
          <p>Following: {userData.following}</p>
          <a href={userData.html_url} target="_blank" rel="noopener noreferrer">
            View Profile
          </a>
        </div>
      )}
    </div>
  );
};

export default Search;
