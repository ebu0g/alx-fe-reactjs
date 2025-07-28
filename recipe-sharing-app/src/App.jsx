import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeDetail from './components/RecipeDetail';
import EditRecipeForm from './components/EditRecipeForm';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add" element={<AddRecipeForm />} />
      <Route path="/recipe/:id" element={<RecipeDetail />} />
      <Route path="/edit/:id" element={<EditRecipeForm />} />
    </Routes>
  );
}

export default App;