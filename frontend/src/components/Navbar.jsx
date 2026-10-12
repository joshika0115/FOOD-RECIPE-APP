function Navbar() {
  return (
    <nav className="navbar">
      <h1>🍲 Food Recipe App</h1>

      <div className="nav-links">
        <a href="/">Home</a>
        <a href="#recipes">Recipes</a>
        <a href="#add-recipe">Add Recipe</a>
      </div>
    </nav>
  );
}

export default Navbar;