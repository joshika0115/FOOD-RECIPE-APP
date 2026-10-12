import { useState } from "react";

function RecipeForm({ onRecipeAdded }) {
  const [ingredients, setIngredients] = useState([
    { name: "", quantity: "", unit: "" },
  ]);

  const [steps, setSteps] = useState([
    { description: "", time: "" },
  ]);

  const addIngredient = () => {
    setIngredients([
      ...ingredients,
      { name: "", quantity: "", unit: "" },
    ]);
  };

  const removeIngredient = (index) => {
    setIngredients(
      ingredients.filter((_, i) => i !== index)
    );
  };

  const updateIngredient = (index, field, value) => {
    const updatedIngredients = [...ingredients];

    updatedIngredients[index] = {
      ...updatedIngredients[index],
      [field]: value,
    };

    setIngredients(updatedIngredients);
  };

  const addStep = () => {
    setSteps([
      ...steps,
      { description: "", time: "" },
    ]);
  };

  const removeStep = (index) => {
    setSteps(
      steps.filter((_, i) => i !== index)
    );
  };

  const updateStep = (index, field, value) => {
    const updatedSteps = [...steps];

    updatedSteps[index] = {
      ...updatedSteps[index],
      [field]: value,
    };

    setSteps(updatedSteps);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;

    const recipe = {
      name: form.name.value,
      category: form.category.value,
      cuisine: form.cuisine.value,

      dietaryPreference: form.dietaryPreference.value
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== ""),

      ingredients: ingredients
        .filter((item) => item.name.trim() !== "")
        .map((item) => ({
          name: item.name.trim(),
          quantity: Number(item.quantity),
          unit: item.unit.trim(),
        })),

      instructions: steps
        .filter((item) => item.description.trim() !== "")
        .map((item, index) => ({
          step: index + 1,
          description: item.description.trim(),
          time: Number(item.time) || 0,
        })),

      prepTime: Number(form.prepTime.value),
      cookingTime: Number(form.cookingTime.value),
      servings: Number(form.servings.value),

      difficulty: form.difficulty.value,

      image: form.image.value,

      rating: Number(form.rating.value) || 0,

      tips: form.tips.value
        .split("\n")
        .map((item) => item.trim())
        .filter((item) => item !== ""),
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/recipes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(recipe),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add recipe");
      }

      const savedRecipe = await response.json();

      onRecipeAdded(savedRecipe);

      alert("Recipe added successfully! 🎉");
    } catch (error) {
      console.error(error);
      alert("Could not add recipe.");
    }
  };

  return (
    <form className="recipe-form" onSubmit={handleSubmit}>

      <h2>➕ Add New Recipe</h2>

      <label>🍲 Recipe Name</label>
      <input
        type="text"
        name="name"
        placeholder="Example: Veg Biryani"
        required
      />

      <label>🏷️ Category</label>
      <input
        type="text"
        name="category"
        placeholder="Example: Main Course"
        required
      />

      <label>🌎 Cuisine</label>
      <input
        type="text"
        name="cuisine"
        placeholder="Example: Indian"
        required
      />

      <label>🥗 Dietary Preference</label>
      <input
        type="text"
        name="dietaryPreference"
        placeholder="Example: Vegetarian, Healthy"
      />

      <label>👥 Number of Persons</label>
      <input
        type="number"
        name="servings"
        min="1"
        defaultValue="2"
        required
      />

      <label>🔪 Preparation Time (minutes)</label>
      <input
        type="number"
        name="prepTime"
        min="0"
        placeholder="Example: 20"
        required
      />

      <label>🔥 Cooking Time (minutes)</label>
      <input
        type="number"
        name="cookingTime"
        min="0"
        placeholder="Example: 30"
        required
      />

      <label>📊 Difficulty</label>
      <select name="difficulty" defaultValue="Easy">
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>

      {/* INGREDIENTS */}

      <label>🧂 Ingredients</label>

      <p className="form-help">
        Add ingredients one by one.
      </p>

      {ingredients.map((ingredient, index) => (
        <div key={index}>

          <input
            type="text"
            placeholder="Ingredient name"
            value={ingredient.name}
            onChange={(event) =>
              updateIngredient(
                index,
                "name",
                event.target.value
              )
            }
            required
          />

          <input
            type="number"
            placeholder="Quantity"
            min="0"
            step="0.1"
            value={ingredient.quantity}
            onChange={(event) =>
              updateIngredient(
                index,
                "quantity",
                event.target.value
              )
            }
            required
          />

          <input
            type="text"
            placeholder="Unit (cups, grams, pieces...)"
            value={ingredient.unit}
            onChange={(event) =>
              updateIngredient(
                index,
                "unit",
                event.target.value
              )
            }
            required
          />

          {ingredients.length > 1 && (
            <button
              type="button"
              onClick={() => removeIngredient(index)}
            >
              ❌
            </button>
          )}

        </div>
      ))}

      <button
        type="button"
        onClick={addIngredient}
      >
        ➕ Add Ingredient
      </button>

      {/* COOKING STEPS */}

      <label>👩‍🍳 Cooking Steps</label>

      <p className="form-help">
        Add each cooking step separately.
      </p>

      {steps.map((step, index) => (
        <div key={index}>

          <strong>
            Step {index + 1}
          </strong>

          <textarea
            placeholder="Example: Wash and soak the rice."
            value={step.description}
            onChange={(event) =>
              updateStep(
                index,
                "description",
                event.target.value
              )
            }
            required
          />

          <input
            type="number"
            placeholder="Time in minutes"
            min="0"
            value={step.time}
            onChange={(event) =>
              updateStep(
                index,
                "time",
                event.target.value
              )
            }
          />

          {steps.length > 1 && (
            <button
              type="button"
              onClick={() => removeStep(index)}
            >
              ❌
            </button>
          )}

        </div>
      ))}

      <button
        type="button"
        onClick={addStep}
      >
        ➕ Add Cooking Step
      </button>

      {/* TIPS */}

      <label>💡 Cooking Tips</label>

      <textarea
        name="tips"
        placeholder={`Example:
Use fresh vegetables.
Do not overcook the rice.
Cook on low flame.`}
      />

      <label>🖼️ Image URL</label>

      <input
        type="text"
        name="image"
        placeholder="Paste recipe image URL"
      />

      <label>⭐ Rating</label>

      <input
        type="number"
        name="rating"
        placeholder="Rating from 0 to 5"
        min="0"
        max="5"
        step="0.1"
      />

      <button type="submit">
        Add Recipe 🍲
      </button>

    </form>
  );
}

export default RecipeForm;