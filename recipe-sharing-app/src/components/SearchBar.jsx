import React from 'react';
import useRecipeStore from '../recipeStore';

const SearchBar = () => {
  const searchTerm = useRecipeStore(state => state.searchTerm);
  const setSearchTerm = useRecipeStore(state => state.setSearchTerm);

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={e => setSearchTerm(e.target.value)}
      placeholder="Search recipes..."
      style={{ padding: '8px', width: '100%', marginBottom: '16px', fontSize: '16px' }}
    />
  );
};

export default SearchBar;
