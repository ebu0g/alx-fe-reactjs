// src/App.jsx or src/components/Search.jsx

import { useState } from "react";
import { searchUsers } from "./services/githubService";

function App() {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const data = await searchUsers({ username, location, minRepos });
      setResults(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch users");
      setResults([]);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">GitHub User Search</h1>
      <form onSubmit={handleSearch} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 border rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          className="w-full p-2 border rounded"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="number"
          placeholder="Minimum Repos"
          className="w-full p-2 border rounded"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Search
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      <ul className="mt-6 space-y-4">
        {results.map((user) => (
          <li key={user.id} className="flex items-center gap-4 border p-3 rounded">
            <img src={user.avatar_url} alt={user.login} className="w-12 h-12 rounded-full" />
            <a href={user.html_url} target="_blank" rel="noreferrer" className="text-blue-700 font-semibold">
              {user.login}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
