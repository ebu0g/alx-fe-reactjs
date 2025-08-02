import React, { useState } from 'react';
import { searchUsers } from '../services/githubService';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const users = await searchUsers(query);
      setResults(users);
      setError('');
    } catch (err) {
      setError('Could not fetch users.');
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <input
        type="text"
        placeholder="Search GitHub users"
        className="w-full p-2 border rounded"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={handleSearch}
      >
        Search
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <ul className="mt-4">
        {results.map((user) => (
          <li key={user.id} className="border-b py-2">
            <a href={user.html_url} target="_blank" rel="noreferrer" className="text-blue-500">
              {user.login}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
