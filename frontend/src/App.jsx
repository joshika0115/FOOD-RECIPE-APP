import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import RecipeCard from "./components/RecipeCard";
import RecipeForm from "./components/RecipeForm";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCuisine, setSelectedCuisine] = useState("All");
  const [showForm, setShowForm] = useState(false);

  const [currentPage, setCurrentPage] = useState("home");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [servings, setServings] = useState(2);

  const fetchRecipes = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/recipes"
      );

      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleRecipeAdded = (newRecipe) => {
    setRecipes((currentRecipes) => [
      newRecipe,
      ...currentRecipes,
    ]);

    setShowForm(false);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/recipes/${id}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        throw new Error("Could not delete recipe");
      }

      setRecipes((currentRecipes) =>
        currentRecipes.filter((recipe) => recipe._id !== id)
      );

      setSelectedRecipe(null);
    } catch (error) {
      console.error("Error deleting recipe:", error);
      alert("Could not delete the recipe. Please try again.");
    }
  };

  const openRecipe = (recipe) => {
    setSelectedRecipe(recipe);
    setServings(recipe.servings || 2);
  };

  const categories = [
    "All",
    "Breakfast",
    "Main Course",
    "Dessert",
    "Healthy",
    "Drinks",
  ];

  const cuisines = [
    "All",
    ...new Set(
      recipes.map((recipe) => recipe.cuisine).filter(Boolean)
    ),
  ];

  const filteredRecipes = recipes.filter((recipe) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      recipe.name?.toLowerCase().includes(searchText) ||
      recipe.category?.toLowerCase().includes(searchText) ||
      recipe.cuisine?.toLowerCase().includes(searchText) ||
      recipe.dietaryPreference?.some((diet) =>
        diet.toLowerCase().includes(searchText)
      ) ||
      recipe.ingredients?.some((ingredient) =>
        ingredient.name?.toLowerCase().includes(searchText)
      );

    const matchesCategory =
      selectedCategory === "All" ||
      recipe.category === selectedCategory;

    const matchesCuisine =
      selectedCuisine === "All" ||
      recipe.cuisine === selectedCuisine;

    return matchesSearch && matchesCategory && matchesCuisine;
  });

  const originalServings = selectedRecipe?.servings || 2;

  const calculateQuantity = (quantity) => {
    const amount = (quantity * servings) / originalServings;

    return Number.isInteger(amount)
      ? amount
      : Number(amount.toFixed(2));
  };

  return (
    <>
      <Navbar />

      {/* HOME PAGE */}
      {currentPage === "home" && (
        <section className="hero">
          <div className="hero-content">

            <div className="hero-tag">
              ✨ A LITTLE TASTE OF HAPPINESS
            </div>

            <h1>
              Made with love,
              <span> served with joy.</span>
            </h1>

            <p className="hero-description">
              Discover delicious recipes, explore new flavours,
              and turn everyday ingredients into something special.
              Your next favourite meal starts here. 💗
            </p>

            <div className="hero-buttons">
              <button
                className="hero-button"
                onClick={() => setCurrentPage("recipes")}
              >
                Explore Recipes <span>→</span>
              </button>

              <button
                className="hero-button secondary-button"
                onClick={() => setShowForm(true)}
              >
                + Add Your Recipe
              </button>
            </div>

            <div className="hero-features">
              <span>♡ Easy to make</span>
              <span>♡ Made with love</span>
              <span>♡ Something delicious</span>
            </div>

          </div>

          <div className="hero-image-container">
            <img
              className="hero-food-image"
              src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1000&q=85"
              alt="Delicious pasta with fresh ingredients"
            />

            <div className="hero-image-badge">
              <span>🍝</span>
              <div>
                <strong>Good food, good mood</strong>
                <p>A little happiness on every plate.</p>
              </div>
            </div>

            <div className="hero-floating-heart">♡</div>
          </div>

        </section>
      
      )}

      {/* RECIPES PAGE */}
      {currentPage === "recipes" && !selectedRecipe && (
        <main className="app-container">
          <button
            className="hero-button"
            onClick={() => setCurrentPage("home")}
          >
            ← Back to Home
          </button>

          <section className="category-section">
            <div>
              <p className="section-label">EXPLORE OUR COLLECTION</p>
              <h2>Find Your Favourite Recipe 🍽️</h2>
            </div>

            <button
              className="hero-button"
              onClick={() => setShowForm(true)}
            >
              ➕ Add Recipe
            </button>

            <div className="search-box">
              <span>🔍</span>
              <input
                type="text"
                placeholder="Search recipes or ingredients..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>

            <div className="category-buttons">
              {categories.map((category) => (
                <button
                  key={category}
                  className={
                    selectedCategory === category
                      ? "category-button active"
                      : "category-button"
                  }
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <select
              className="cuisine-filter"
              value={selectedCuisine}
              onChange={(event) =>
                setSelectedCuisine(event.target.value)
              }
            >
              {cuisines.map((cuisine) => (
                <option key={cuisine} value={cuisine}>
                  {cuisine === "All"
                    ? "🌎 All Cuisines"
                    : `🌎 ${cuisine}`}
                </option>
              ))}
            </select>
          </section>

          <section id="recipes">
            <div className="recipe-heading">
              <h2>Delicious Recipes 😋</h2>
              <span className="recipe-count">
                {filteredRecipes.length} recipes
              </span>
            </div>

            {filteredRecipes.length === 0 ? (
              <div className="empty-state">
                <h3>No recipes found 🍽️</h3>
                <p>Try another recipe name or ingredient.</p>
              </div>
            ) : (
              <div className="recipe-grid">
                {filteredRecipes.map((recipe) => (
                  <RecipeCard
                    key={recipe._id}
                    recipe={recipe}
                    onClick={openRecipe}
                  />
                ))}
              </div>
            )}
          </section>
        </main>
      )}

      {/* RECIPE DETAILS PAGE */}
      {selectedRecipe && (
        <main className="app-container">
          <button
            className="hero-button"
            onClick={() => setSelectedRecipe(null)}
          >
            ← Back to Recipes
          </button>

          <section className="recipe-details">
            <h1>{selectedRecipe.name}</h1>

            {selectedRecipe.image && (
              <img
                src={selectedRecipe.image}
                alt={selectedRecipe.name}
                className="recipe-image"
                style={{
                  width: "100%",
                  maxWidth: "700px",
                  height: "350px",
                  objectFit: "cover",
                  borderRadius: "16px",
                }}
              />
            )}

            <p>🌎 Cuisine: {selectedRecipe.cuisine || "Not specified"}</p>
            <p>🏷️ Category: {selectedRecipe.category || "Not specified"}</p>
            <p>⏱️ Preparation: {selectedRecipe.prepTime || 0} minutes</p>
            <p>🔥 Cooking: {selectedRecipe.cookingTime || 0} minutes</p>
            <p>📊 Difficulty: {selectedRecipe.difficulty || "Not specified"}</p>
            <p>⭐ Rating: {selectedRecipe.rating || "Not rated"}</p>

            <h2>👥 Servings Calculator</h2>

            <label htmlFor="servings">Number of people: </label>

            <select
              id="servings"
              value={servings}
              onChange={(event) =>
                setServings(Number(event.target.value))
              }
            >
              {[1, 2, 3, 4, 5, 6, 8, 10].map((number) => (
                <option key={number} value={number}>
                  {number} {number === 1 ? "person" : "people"}
                </option>
              ))}
            </select>

            <h2>🥗 Ingredients</h2>

            {selectedRecipe.ingredients?.length > 0 ? (
              <ul>
                {selectedRecipe.ingredients.map((ingredient, index) => (
                  <li key={index}>
                    {ingredient.name} —{" "}
                    <strong>
                      {calculateQuantity(ingredient.quantity)}
                    </strong>{" "}
                    {ingredient.unit}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No ingredients added yet.</p>
            )}

            <h2>👩‍🍳 Cooking Instructions</h2>

            {selectedRecipe.instructions?.length > 0 ? (
              selectedRecipe.instructions.map((instruction, index) => (
                <div className="instruction-step" key={index}>
                  <h3>Step {instruction.step || index + 1}</h3>
                  <p>{instruction.description}</p>

                  {instruction.time > 0 && (
                    <small>⏱️ {instruction.time} minutes</small>
                  )}
                </div>
              ))
            ) : (
              <p>No cooking instructions added yet.</p>
            )}

            {selectedRecipe.tips?.length > 0 && (
              <>
                <h2>💡 Cooking Tips</h2>
                <ul>
                  {selectedRecipe.tips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </>
            )}

            <button
              className="delete-button"
              onClick={() => handleDelete(selectedRecipe._id)}
            >
              🗑️ Delete Recipe
            </button>
          </section>
        </main>
      )}

      {/* ADD RECIPE POPUP */}
      {showForm && (
        <div className="modal-overlay">
          <div className="recipe-modal">
            <button
              className="close-modal"
              onClick={() => setShowForm(false)}
              aria-label="Close add recipe form"
            >
              ✕
            </button>

            <RecipeForm onRecipeAdded={handleRecipeAdded} />
          </div>
        </div>
      )}
    </>
  );
}

export default App;