const mongoose = require("mongoose");
require("dotenv").config();

const Recipe = require("./models/Recipe");

const recipes = [
  {
    name: "Chicken Biryani",
    category: "Main Course",
    cuisine: "Indian",
    dietaryPreference: ["Non-Vegetarian"],
    image: "https://images.unsplash.com/photo-1563379091339-03246963d96a?auto=format&fit=crop&w=800&q=85",
    servings: 2,
    prepTime: 20,
    cookingTime: 40,
    difficulty: "Medium",
    rating: 5,
    ingredients: [
      { name: "Basmati rice", quantity: 200, unit: "g" },
      { name: "Chicken", quantity: 300, unit: "g" },
      { name: "Onion", quantity: 2, unit: "pieces" },
      { name: "Yogurt", quantity: 100, unit: "g" }
    ],
    instructions: [
      { step: 1, description: "Marinate chicken with yogurt and spices.", time: 20 },
      { step: 2, description: "Cook onions until golden brown.", time: 10 },
      { step: 3, description: "Layer partially cooked rice over chicken and cook until done.", time: 30 }
    ]
  },
  {
    name: "Palak Paneer",
    category: "Main Course",
    cuisine: "Indian",
    dietaryPreference: ["Vegetarian"],
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=85",
    servings: 2,
    prepTime: 15,
    cookingTime: 20,
    difficulty: "Easy",
    rating: 5,
    ingredients: [
      { name: "Spinach", quantity: 250, unit: "g" },
      { name: "Paneer", quantity: 200, unit: "g" },
      { name: "Onion", quantity: 1, unit: "piece" },
      { name: "Tomato", quantity: 2, unit: "pieces" }
    ],
    instructions: [
      { step: 1, description: "Blanch spinach and blend into a smooth puree.", time: 5 },
      { step: 2, description: "Cook onion and tomato with spices.", time: 10 },
      { step: 3, description: "Add spinach puree and paneer, then simmer.", time: 10 }
    ]
  },
  {
    name: "Veg Pulao",
    category: "Main Course",
    cuisine: "Indian",
    dietaryPreference: ["Vegetarian"],
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=85",
    servings: 2,
    prepTime: 15,
    cookingTime: 25,
    difficulty: "Easy",
    rating: 4,
    ingredients: [
      { name: "Rice", quantity: 200, unit: "g" },
      { name: "Mixed vegetables", quantity: 150, unit: "g" },
      { name: "Onion", quantity: 1, unit: "piece" }
    ],
    instructions: [
      { step: 1, description: "Wash and soak the rice.", time: 10 },
      { step: 2, description: "Saute onions and vegetables with spices.", time: 5 },
      { step: 3, description: "Add rice and water, then cook until tender.", time: 20 }
    ]
  },
  {
    name: "Gobi Manchurian",
    category: "Main Course",
    cuisine: "Indo-Chinese",
    dietaryPreference: ["Vegetarian"],
    image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=800&q=85",
    servings: 2,
    prepTime: 15,
    cookingTime: 20,
    difficulty: "Medium",
    rating: 4,
    ingredients: [
      { name: "Cauliflower", quantity: 300, unit: "g" },
      { name: "Cornflour", quantity: 50, unit: "g" },
      { name: "Soy sauce", quantity: 2, unit: "tbsp" },
      { name: "Garlic", quantity: 4, unit: "cloves" }
    ],
    instructions: [
      { step: 1, description: "Coat cauliflower florets in a seasoned batter.", time: 5 },
      { step: 2, description: "Fry or air-fry until crisp.", time: 15 },
      { step: 3, description: "Toss with garlic, soy sauce and spring onions.", time: 5 }
    ]
  },
  {
    name: "Paneer Tikka",
    category: "Healthy",
    cuisine: "Indian",
    dietaryPreference: ["Vegetarian"],
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=85",
    servings: 2,
    prepTime: 20,
    cookingTime: 15,
    difficulty: "Easy",
    rating: 5,
    ingredients: [
      { name: "Paneer", quantity: 250, unit: "g" },
      { name: "Yogurt", quantity: 100, unit: "g" },
      { name: "Bell pepper", quantity: 1, unit: "piece" }
    ],
    instructions: [
      { step: 1, description: "Mix yogurt with spices and coat paneer.", time: 10 },
      { step: 2, description: "Thread paneer and vegetables onto skewers.", time: 5 },
      { step: 3, description: "Grill until lightly charred.", time: 15 }
    ]
  },
  {
    name: "Chole Bhature",
    category: "Main Course",
    cuisine: "Indian",
    dietaryPreference: ["Vegetarian"],
    image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=800&q=85",
    servings: 2,
    prepTime: 20,
    cookingTime: 35,
    difficulty: "Medium",
    rating: 5,
    ingredients: [
      { name: "Chickpeas", quantity: 200, unit: "g" },
      { name: "Flour", quantity: 200, unit: "g" },
      { name: "Onion", quantity: 1, unit: "piece" }
    ],
    instructions: [
      { step: 1, description: "Soak chickpeas overnight and pressure-cook until tender.", time: 25 },
      { step: 2, description: "Prepare a spiced chickpea curry.", time: 15 },
      { step: 3, description: "Prepare dough, roll into rounds and fry bhature.", time: 15 }
    ]
  },
  {
    name: "Masala Pav",
    category: "Breakfast",
    cuisine: "Indian",
    dietaryPreference: ["Vegetarian"],
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=85",
    servings: 2,
    prepTime: 10,
    cookingTime: 15,
    difficulty: "Easy",
    rating: 4,
    ingredients: [
      { name: "Pav buns", quantity: 4, unit: "pieces" },
      { name: "Tomato", quantity: 2, unit: "pieces" },
      { name: "Onion", quantity: 1, unit: "piece" },
      { name: "Butter", quantity: 2, unit: "tbsp" }
    ],
    instructions: [
      { step: 1, description: "Chop onions and tomatoes.", time: 5 },
      { step: 2, description: "Cook the vegetables with butter and spices.", time: 10 },
      { step: 3, description: "Toast pav and serve with the masala.", time: 5 }
    ]
  },
  {
    name: "Aloo Tikki",
    category: "Breakfast",
    cuisine: "Indian",
    dietaryPreference: ["Vegetarian"],
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=85",
    servings: 2,
    prepTime: 15,
    cookingTime: 15,
    difficulty: "Easy",
    rating: 4,
    ingredients: [
      { name: "Potatoes", quantity: 300, unit: "g" },
      { name: "Breadcrumbs", quantity: 50, unit: "g" },
      { name: "Green chilli", quantity: 1, unit: "piece" }
    ],
    instructions: [
      { step: 1, description: "Boil and mash the potatoes.", time: 10 },
      { step: 2, description: "Mix with spices and shape into patties.", time: 5 },
      { step: 3, description: "Shallow-fry until golden on both sides.", time: 15 }
    ]
  },
  {
    name: "White Sauce Pasta",
    category: "Main Course",
    cuisine: "Italian",
    dietaryPreference: ["Vegetarian"],
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=85",
    servings: 2,
    prepTime: 10,
    cookingTime: 20,
    difficulty: "Easy",
    rating: 5,
    ingredients: [
      { name: "Pasta", quantity: 200, unit: "g" },
      { name: "Milk", quantity: 250, unit: "ml" },
      { name: "Butter", quantity: 2, unit: "tbsp" },
      { name: "Cheese", quantity: 50, unit: "g" }
    ],
    instructions: [
      { step: 1, description: "Boil pasta according to packet instructions.", time: 10 },
      { step: 2, description: "Prepare a white sauce with butter, flour and milk.", time: 8 },
      { step: 3, description: "Mix pasta with sauce and cheese.", time: 2 }
    ]
  },
  {
    name: "Chocolate Brownies",
    category: "Dessert",
    cuisine: "International",
    dietaryPreference: ["Vegetarian"],
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=85",
    servings: 4,
    prepTime: 15,
    cookingTime: 25,
    difficulty: "Easy",
    rating: 5,
    ingredients: [
      { name: "Chocolate", quantity: 150, unit: "g" },
      { name: "Butter", quantity: 100, unit: "g" },
      { name: "Flour", quantity: 100, unit: "g" },
      { name: "Sugar", quantity: 100, unit: "g" }
    ],
    instructions: [
      { step: 1, description: "Melt chocolate and butter together.", time: 5 },
      { step: 2, description: "Mix with sugar, flour and eggs.", time: 5 },
      { step: 3, description: "Bake in a prepared pan until set.", time: 25 }
    ]
  },
  {
    name: "Strawberry Milkshake",
    category: "Drinks",
    cuisine: "International",
    dietaryPreference: ["Vegetarian"],
    image: "https://images.unsplash.com/photo- strawberry-milkshake?auto=format&fit=crop&w=800&q=85",
    servings: 2,
    prepTime: 5,
    cookingTime: 0,
    difficulty: "Easy",
    rating: 5,
    ingredients: [
      { name: "Strawberries", quantity: 200, unit: "g" },
      { name: "Milk", quantity: 300, unit: "ml" },
      { name: "Sugar", quantity: 2, unit: "tbsp" }
    ],
    instructions: [
      { step: 1, description: "Blend strawberries, milk and sugar until smooth.", time: 3 },
      { step: 2, description: "Pour into glasses and serve chilled.", time: 2 }
    ]
  },
  {
    name: "Mango Lassi",
    category: "Drinks",
    cuisine: "Indian",
    dietaryPreference: ["Vegetarian"],
    image: "https://images.unsplash.com/photo-1626201850129-57f3c8d9b5f5?auto=format&fit=crop&w=800&q=85",
    servings: 2,
    prepTime: 5,
    cookingTime: 0,
    difficulty: "Easy",
    rating: 5,
    ingredients: [
      { name: "Mango", quantity: 1, unit: "large" },
      { name: "Yogurt", quantity: 250, unit: "g" },
      { name: "Milk", quantity: 100, unit: "ml" }
    ],
    instructions: [
      { step: 1, description: "Peel and chop the mango.", time: 3 },
      { step: 2, description: "Blend mango, yogurt and milk until smooth.", time: 2 }
    ]
  },
  {
    name: "Greek Salad",
    category: "Healthy",
    cuisine: "Greek",
    dietaryPreference: ["Vegetarian"],
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=85",
    servings: 2,
    prepTime: 15,
    cookingTime: 0,
    difficulty: "Easy",
    rating: 5,
    ingredients: [
      { name: "Cucumber", quantity: 1, unit: "piece" },
      { name: "Tomatoes", quantity: 2, unit: "pieces" },
      { name: "Feta cheese", quantity: 80, unit: "g" },
      { name: "Olives", quantity: 50, unit: "g" }
    ],
    instructions: [
      { step: 1, description: "Chop cucumber and tomatoes.", time: 8 },
      { step: 2, description: "Mix with feta cheese, olives and dressing.", time: 7 }
    ]
  },
  {
    name: "Mushroom Fried Rice",
    category: "Main Course",
    cuisine: "Chinese",
    dietaryPreference: ["Vegetarian"],
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=85",
    servings: 2,
    prepTime: 10,
    cookingTime: 15,
    difficulty: "Easy",
    rating: 4,
    ingredients: [
      { name: "Cooked rice", quantity: 300, unit: "g" },
      { name: "Mushrooms", quantity: 150, unit: "g" },
      { name: "Soy sauce", quantity: 2, unit: "tbsp" }
    ],
    instructions: [
      { step: 1, description: "Slice mushrooms and prepare the vegetables.", time: 5 },
      { step: 2, description: "Stir-fry mushrooms and vegetables.", time: 5 },
      { step: 3, description: "Add rice and soy sauce and toss well.", time: 5 }
    ]
  },
  {
    name: "Banana Pancakes",
    category: "Breakfast",
    cuisine: "International",
    dietaryPreference: ["Vegetarian"],
    image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=800&q=85",
    servings: 2,
    prepTime: 10,
    cookingTime: 10,
    difficulty: "Easy",
    rating: 5,
    ingredients: [
      { name: "Banana", quantity: 2, unit: "pieces" },
      { name: "Flour", quantity: 100, unit: "g" },
      { name: "Milk", quantity: 100, unit: "ml" },
      { name: "Egg", quantity: 1, unit: "piece" }
    ],
    instructions: [
      { step: 1, description: "Mash bananas and mix with flour, milk and egg.", time: 5 },
      { step: 2, description: "Cook small pancakes on a lightly greased pan.", time: 10 }
    ]
  },
  {
    name: "Tomato Soup",
    category: "Healthy",
    cuisine: "International",
    dietaryPreference: ["Vegetarian"],
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=85",
    servings: 2,
    prepTime: 10,
    cookingTime: 20,
    difficulty: "Easy",
    rating: 4,
    ingredients: [
      { name: "Tomatoes", quantity: 400, unit: "g" },
      { name: "Onion", quantity: 1, unit: "piece" },
      { name: "Garlic", quantity: 2, unit: "cloves" }
    ],
    instructions: [
      { step: 1, description: "Chop tomatoes, onion and garlic.", time: 5 },
      { step: 2, description: "Cook vegetables with water and seasoning.", time: 15 },
      { step: 3, description: "Blend until smooth and serve warm.", time: 5 }
    ]
  },
  {
    name: "Aloo Paratha",
    category: "Breakfast",
    cuisine: "Indian",
    dietaryPreference: ["Vegetarian"],
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=85",
    servings: 2,
    prepTime: 20,
    cookingTime: 15,
    difficulty: "Medium",
    rating: 5,
    ingredients: [
      { name: "Wheat flour", quantity: 200, unit: "g" },
      { name: "Potatoes", quantity: 250, unit: "g" },
      { name: "Spices", quantity: 1, unit: "tsp" }
    ],
    instructions: [
      { step: 1, description: "Prepare dough and boil the potatoes.", time: 15 },
      { step: 2, description: "Mash potatoes with spices and fill the dough.", time: 10 },
      { step: 3, description: "Roll and cook parathas on a hot pan.", time: 15 }
    ]
  },
  {
    name: "Chocolate Pancakes",
    category: "Dessert",
    cuisine: "International",
    dietaryPreference: ["Vegetarian"],
    image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=800&q=85",
    servings: 2,
    prepTime: 10,
    cookingTime: 15,
    difficulty: "Easy",
    rating: 5,
    ingredients: [
      { name: "Flour", quantity: 150, unit: "g" },
      { name: "Milk", quantity: 200, unit: "ml" },
      { name: "Cocoa powder", quantity: 2, unit: "tbsp" },
      { name: "Sugar", quantity: 2, unit: "tbsp" }
    ],
    instructions: [
      { step: 1, description: "Mix flour, cocoa powder, sugar and milk.", time: 5 },
      { step: 2, description: "Cook pancakes on a lightly greased pan.", time: 10 }
    ]
  },
  {
    name: "Vegetable Sandwich",
    category: "Breakfast",
    cuisine: "International",
    dietaryPreference: ["Vegetarian"],
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=85",
    servings: 2,
    prepTime: 10,
    cookingTime: 5,
    difficulty: "Easy",
    rating: 4,
    ingredients: [
      { name: "Bread", quantity: 4, unit: "slices" },
      { name: "Cucumber", quantity: 1, unit: "piece" },
      { name: "Tomato", quantity: 1, unit: "piece" },
      { name: "Cheese", quantity: 2, unit: "slices" }
    ],
    instructions: [
      { step: 1, description: "Slice the vegetables.", time: 5 },
      { step: 2, description: "Layer vegetables and cheese between bread slices.", time: 3 },
      { step: 3, description: "Toast if desired and serve.", time: 5 }
    ]
  },
  {
    name: "Fruit Smoothie",
    category: "Drinks",
    cuisine: "International",
    dietaryPreference: ["Vegetarian"],
    image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=800&q=85",
    servings: 2,
    prepTime: 5,
    cookingTime: 0,
    difficulty: "Easy",
    rating: 5,
    ingredients: [
      { name: "Banana", quantity: 1, unit: "piece" },
      { name: "Strawberries", quantity: 100, unit: "g" },
      { name: "Yogurt", quantity: 150, unit: "g" },
      { name: "Milk", quantity: 100, unit: "ml" }
    ],
    instructions: [
      { step: 1, description: "Add all ingredients to a blender.", time: 1 },
      { step: 2, description: "Blend until smooth and serve chilled.", time: 2 }
    ]
  },
  {
    name: "Corn Cheese Toast",
    category: "Breakfast",
    cuisine: "International",
    dietaryPreference: ["Vegetarian"],
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=85",
    servings: 2,
    prepTime: 10,
    cookingTime: 10,
    difficulty: "Easy",
    rating: 4,
    ingredients: [
      { name: "Bread", quantity: 4, unit: "slices" },
      { name: "Sweet corn", quantity: 100, unit: "g" },
      { name: "Cheese", quantity: 80, unit: "g" }
    ],
    instructions: [
      { step: 1, description: "Mix sweet corn with grated cheese.", time: 5 },
      { step: 2, description: "Spread the mixture on bread.", time: 2 },
      { step: 3, description: "Toast until the cheese melts.", time: 8 }
    ]
  }
];

async function addMoreRecipes() {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/food_recipe_db");

    let added = 0;
    let skipped = 0;

    for (const recipe of recipes) {
      const existing = await Recipe.findOne({ name: recipe.name });

      if (existing) {
        skipped++;
        continue;
      }

      await Recipe.create(recipe);
      added++;
    }

    console.log(`Finished! Added ${added} recipes; skipped ${skipped} duplicates.`);
  } catch (error) {
    console.error("Error adding recipes:", error);
  } finally {
    await mongoose.disconnect();
  }
}

addMoreRecipes();