import React, { useState } from 'react';
import { searchUsers } from '../services/githubService';

const Search = () => {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [users, setUsers] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchUserData = async (username, location, minRepos) => {
    return await searchUsers({ username, location, minRepos });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setNotFound(false);
    setUsers([]);

    try {
      const data = await fetchUserData(username, location, minRepos);
      if (data.total_count === 0) {
        setNotFound(true);
      } else {
        setUsers(data.items);
      }
    } catch (error) {
      console.error(error);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="GitHub username"
        />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location (optional)"
        />
        <input
          type="number"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
          placeholder="Min Repositories (optional)"
          min="0"
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {notFound && <p>Looks like we can't find the user</p>}

      {users.length > 0 && (
        <ul>
          {users.map(user => (
            <li key={user.id} style={{ marginBottom: '1rem' }}>
              <img src={user.avatar_url} alt={user.login} width={50} />
              <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                {user.login}
              </a>
              <p>Score: {user.score.toFixed(2)}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
