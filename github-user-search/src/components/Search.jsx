import React, { useState } from 'react';
import { searchUsers } from '../services/githubService';

const Search = () => {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPage(1);

    try {
      const data = await searchUsers({ username, location, minRepos, page: 1 });
      setUsers(data.items);
      setTotalCount(data.total_count);
    } catch (err) {
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    const nextPage = page + 1;
    setLoading(true);
    setError(null);

    try {
      const data = await searchUsers({ username, location, minRepos, page: nextPage });
      setUsers((prev) => [...prev, ...data.items]);
      setPage(nextPage);
    } catch (err) {
      setError('Failed to fetch more users');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          placeholder="Minimum Repositories"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
          className="border p-2 rounded w-full"
          min="0"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          Search
        </button>
      </form>

      {loading && <p className="mt-4">Loading...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      {users.length > 0 && (
        <div className="mt-6 space-y-4">
          {users.map((user) => (
            <div key={user.id} className="flex items-center space-x-4 border p-4 rounded">
              <img src={user.avatar_url} alt={user.login} className="w-16 h-16 rounded-full" />
              <div>
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-semibold"
                >
                  {user.login}
                </a>
              </div>
            </div>
          ))}

          {users.length < totalCount && (
            <button
              onClick={loadMore}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              disabled={loading}
            >
              Load More
            </button>
          )}
        </div>
      )}

      {users.length === 0 && !loading && <p className="mt-4">No users found.</p>}
    </div>
  );
};

export default Search;
