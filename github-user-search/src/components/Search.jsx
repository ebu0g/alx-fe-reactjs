import React, { useState } from 'react';
import { searchUsers } from '../services/githubService';

const Search = () => {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState(0);
  const [results, setResults] = useState([]);

  // ✅ Required function name
  const fetchUserData = async () => {
    if (!query) return;
    try {
      const users = await searchUsers(query, location, minRepos);
      setResults(users);
    } catch (error) {
      console.error('Error fetching GitHub users:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchUserData(); // ✅ make sure to call it
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search username"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="number"
          placeholder="Minimum Repos"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <ul>
        {results.map((user) => (
          <li key={user.id}>
            <a href={user.html_url} target="_blank" rel="noopener noreferrer">
              {user.login}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
