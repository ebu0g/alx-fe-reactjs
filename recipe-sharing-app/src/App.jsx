import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeDetail from './components/RecipeDetail';
import RecipeList from './components/RecipeList';

function App() {
  return (
    <Routes>
      <Route path="/" element={<RecipeList />} />
      <Route path="/add" element={<AddRecipeForm />} />
      <Route path="/recipe/:id" element={<RecipeDetail />} />
    </Routes>
  );
}

export default App;
