import create from 'zustand';

const useRecipeStore = create((set, get) => ({
  recipes: [],
  searchTerm: '',
  filteredRecipes: [],

  // Add a new recipe
  addRecipe: (newRecipe) =>
    set(state => ({
      recipes: [...state.recipes, newRecipe],
      filteredRecipes: [...state.filteredRecipes, newRecipe], // keep filtered in sync
    })),

  // Set all recipes
  setRecipes: (recipes) =>
    set({
      recipes,
      filteredRecipes: recipes,
    }),

  // Update search term and filter recipes accordingly
  setSearchTerm: (term) => {
    set({ searchTerm: term });
    const { recipes } = get();
    set({
      filteredRecipes: recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(term.toLowerCase())
      ),
    });
  },
}));

export default useRecipeStore;
