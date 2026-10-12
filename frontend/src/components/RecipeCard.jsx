function RecipeCard({ recipe, onClick }) {
  const fallbackImages = {
    "Veg Biryani":
      "https://images.unsplash.com/photo-1563379091339-03246963d96a?auto=format&fit=crop&w=800&q=85",

    "Paneer Butter Masala":
      "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=85",
  };

  const imageUrl =
    recipe.image ||
    fallbackImages[recipe.name] ||
    "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=85";

  return (
    <div
      className="recipe-card"
      onClick={() => onClick(recipe)}
    >
      <img
        src={imageUrl}
        alt={recipe.name}
        className="recipe-image"
        onError={(event) => {
          event.currentTarget.onerror = null;
          event.currentTarget.src =
            "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=85";
        }}
      />

      <div className="recipe-content">
        <h2>{recipe.name}</h2>
      </div>
    </div>
  );
}

export default RecipeCard;