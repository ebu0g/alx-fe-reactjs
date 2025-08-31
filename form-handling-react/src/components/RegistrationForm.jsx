// src/components/RegistrationForm.jsx
import React, { useState } from "react";

const RegistrationForm = () => {
  // Separate states for each field
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!username || !email || !password) {
      setError("All fields are required!");
      return;
    }

    setError("");
    console.log("Submitted Data:", { username, email, password });

    // mock API call
    fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers: { "Content-Type": "application/json" }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("API Response:", data);
        alert("User registered successfully!");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h2>Controlled Registration Form</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={username}   // ✅ explicit value
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={email}   // ✅ explicit value
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}   // ✅ explicit value
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
