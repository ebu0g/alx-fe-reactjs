import React from 'react';
import { Link } from 'react-router-dom';
import useRecipeStore from '../recipeStore';

const RecipeList = () => {
  const filteredRecipes = useRecipeStore(state => state.filteredRecipes);

  if (!filteredRecipes.length) {
    return <p>No recipes found.</p>;
  }

  return (
    <div>
      {filteredRecipes.map(recipe => (
        <div key={recipe.id} style={{ borderBottom: '1px solid #ccc', padding: '12px 0' }}>
          <h3>
            <Link to={`/recipe/${recipe.id}`} style={{ textDecoration: 'none', color: 'blue' }}>
              {recipe.title}
            </Link>
          </h3>
          <p>{recipe.description}</p>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
