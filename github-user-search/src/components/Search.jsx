import React, { useState } from 'react';

const Search = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!username) return;

    setLoading(true);
    setNotFound(false);
    setUserData(null);

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (response.status === 404) {
        setNotFound(true);
      } else {
        const data = await response.json();
        setUserData(data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-container">
      <h1>GitHub User Search</h1>
      <input
        type="text"
        value={username}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Enter GitHub username"
      />
      <button onClick={handleSearch}>Search</button>

      {loading && <p>Loading...</p>}

      {notFound && <p>Looks like we can't find the user</p>}

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
