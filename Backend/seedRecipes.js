const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Recipe = require("./models/Recipe");

dotenv.config();

const recipes = [
  {
    name: "Veg Biryani",
    category: "Main Course",
    cuisine: "Indian",
    dietaryPreference: ["Vegetarian"],
    servings: 2,
    prepTime: 20,
    cookingTime: 35,
    difficulty: "Medium",
    image:
      "https://images.unsplash.com/photo-1563379091339-03246963d96c",
    rating: 4.5,

    ingredients: [
      { name: "Basmati Rice", quantity: 2, unit: "cups" },
      { name: "Mixed Vegetables", quantity: 2, unit: "cups" },
      { name: "Onion", quantity: 2, unit: "pieces" },
      { name: "Tomato", quantity: 2, unit: "pieces" },
      { name: "Ginger-Garlic Paste", quantity: 1, unit: "tablespoon" },
      { name: "Biryani Masala", quantity: 2, unit: "teaspoons" },
      { name: "Oil", quantity: 3, unit: "tablespoons" },
      { name: "Water", quantity: 3, unit: "cups" },
      { name: "Salt", quantity: 1, unit: "teaspoon" }
    ],

    instructions: [
      {
        step: 1,
        description: "Wash and soak the basmati rice.",
        time: 10
      },
      {
        step: 2,
        description:
          "Heat oil in a pan and sauté sliced onions until golden.",
        time: 8
      },
      {
        step: 3,
        description:
          "Add ginger-garlic paste, tomatoes and mixed vegetables. Cook well.",
        time: 10
      },
      {
        step: 4,
        description:
          "Add biryani masala, salt, rice and water. Mix gently.",
        time: 5
      },
      {
        step: 5,
        description:
          "Cover and cook on low flame until the rice is completely cooked.",
        time: 20
      },
      {
        step: 6,
        description:
          "Rest the biryani for a few minutes and serve hot.",
        time: 5
      }
    ],

    tips: [
      "Do not overcook the rice.",
      "Use long-grain basmati rice for better texture.",
      "Cook on low flame after adding the rice."
    ]
  },

  {
    name: "Paneer Butter Masala",
    category: "Main Course",
    cuisine: "Indian",
    dietaryPreference: ["Vegetarian"],
    servings: 2,
    prepTime: 15,
    cookingTime: 25,
    difficulty: "Medium",
    image:
      "https://images.unsplash.com/photo-1631452180519-c014fe946bc7",
    rating: 4.8,

    ingredients: [
      { name: "Paneer", quantity: 250, unit: "grams" },
      { name: "Tomato", quantity: 3, unit: "pieces" },
      { name: "Butter", quantity: 2, unit: "tablespoons" },
      { name: "Cream", quantity: 3, unit: "tablespoons" },
      { name: "Ginger-Garlic Paste", quantity: 1, unit: "tablespoon" },
      { name: "Garam Masala", quantity: 1, unit: "teaspoon" },
      { name: "Salt", quantity: 1, unit: "teaspoon" }
    ],

    instructions: [
      {
        step: 1,
        description: "Cut the paneer into medium-sized cubes.",
        time: 5
      },
      {
        step: 2,
        description: "Heat butter and lightly sauté the paneer cubes.",
        time: 5
      },
      {
        step: 3,
        description:
          "Cook tomatoes and ginger-garlic paste until soft, then blend into a smooth paste.",
        time: 10
      },
      {
        step: 4,
        description:
          "Cook the tomato gravy with spices and salt.",
        time: 8
      },
      {
        step: 5,
        description:
          "Add paneer and cream. Simmer gently and serve hot.",
        time: 7
      }
    ],

    tips: [
      "Do not overcook paneer.",
      "Add cream at the end for a rich texture."
    ]
  },

  {
    name: "Masala Dosa",
    category: "Breakfast",
    cuisine: "South Indian",
    dietaryPreference: ["Vegetarian"],
    servings: 2,
    prepTime: 15,
    cookingTime: 20,
    difficulty: "Medium",
    image:
      "https://images.unsplash.com/photo-1668236543090-82eba5ee5976",
    rating: 4.7,

    ingredients: [
      { name: "Dosa Batter", quantity: 2, unit: "cups" },
      { name: "Potatoes", quantity: 3, unit: "pieces" },
      { name: "Onion", quantity: 1, unit: "piece" },
      { name: "Green Chilli", quantity: 2, unit: "pieces" },
      { name: "Oil", quantity: 2, unit: "tablespoons" },
      { name: "Salt", quantity: 1, unit: "teaspoon" }
    ],

    instructions: [
      {
        step: 1,
        description: "Boil and mash the potatoes.",
        time: 10
      },
      {
        step: 2,
        description:
          "Sauté onions and green chillies in oil and add mashed potatoes.",
        time: 8
      },
      {
        step: 3,
        description:
          "Heat a dosa pan and spread the batter into a thin circle.",
        time: 2
      },
      {
        step: 4,
        description:
          "Add the potato filling, fold the dosa and serve hot.",
        time: 3
      }
    ],

    tips: [
      "The dosa pan should be hot before spreading the batter.",
      "Spread the batter quickly for a thin crispy dosa."
    ]
  },

  {
    name: "Veg Fried Rice",
    category: "Main Course",
    cuisine: "Chinese",
    dietaryPreference: ["Vegetarian"],
    servings: 2,
    prepTime: 15,
    cookingTime: 15,
    difficulty: "Easy",
    image:
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b",
    rating: 4.4,

    ingredients: [
      { name: "Cooked Rice", quantity: 3, unit: "cups" },
      { name: "Carrot", quantity: 1, unit: "piece" },
      { name: "Capsicum", quantity: 1, unit: "piece" },
      { name: "Spring Onion", quantity: 2, unit: "pieces" },
      { name: "Soy Sauce", quantity: 1, unit: "tablespoon" },
      { name: "Oil", quantity: 2, unit: "tablespoons" },
      { name: "Salt", quantity: 0.5, unit: "teaspoon" }
    ],

    instructions: [
      {
        step: 1,
        description: "Chop all vegetables into small pieces.",
        time: 5
      },
      {
        step: 2,
        description:
          "Heat oil in a wok and stir-fry the vegetables on high heat.",
        time: 5
      },
      {
        step: 3,
        description:
          "Add cooked rice, soy sauce and salt. Toss everything together.",
        time: 5
      },
      {
        step: 4,
        description: "Garnish with spring onion and serve hot.",
        time: 2
      }
    ],

    tips: [
      "Use cooled cooked rice for the best fried rice.",
      "Cook vegetables on high heat."
    ]
  },

  {
    name: "Margherita Pizza",
    category: "Main Course",
    cuisine: "Italian",
    dietaryPreference: ["Vegetarian"],
    servings: 2,
    prepTime: 20,
    cookingTime: 20,
    difficulty: "Medium",
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002",
    rating: 4.6,

    ingredients: [
      { name: "Pizza Dough", quantity: 1, unit: "base" },
      { name: "Pizza Sauce", quantity: 4, unit: "tablespoons" },
      { name: "Mozzarella Cheese", quantity: 150, unit: "grams" },
      { name: "Tomato", quantity: 1, unit: "piece" },
      { name: "Basil Leaves", quantity: 5, unit: "leaves" }
    ],

    instructions: [
      {
        step: 1,
        description: "Preheat the oven.",
        time: 10
      },
      {
        step: 2,
        description: "Spread pizza sauce over the pizza base.",
        time: 3
      },
      {
        step: 3,
        description:
          "Add mozzarella cheese and tomato slices.",
        time: 3
      },
      {
        step: 4,
        description:
          "Bake until the cheese melts and the crust becomes golden.",
        time: 15
      },
      {
        step: 5,
        description:
          "Add fresh basil leaves and serve.",
        time: 2
      }
    ],

    tips: [
      "Preheat the oven properly.",
      "Do not overload the pizza with toppings."
    ]
  },

  {
    name: "Chocolate Pancakes",
    category: "Dessert",
    cuisine: "American",
    dietaryPreference: ["Vegetarian"],
    servings: 2,
    prepTime: 10,
    cookingTime: 15,
    difficulty: "Easy",
    image:
      "https://images.unsplash.com/photo-1575853121743-60c24f0a7502",
    rating: 4.9,

    ingredients: [
      { name: "All-Purpose Flour", quantity: 1, unit: "cup" },
      { name: "Cocoa Powder", quantity: 2, unit: "tablespoons" },
      { name: "Milk", quantity: 1, unit: "cup" },
      { name: "Sugar", quantity: 2, unit: "tablespoons" },
      { name: "Baking Powder", quantity: 1, unit: "teaspoon" },
      { name: "Butter", quantity: 1, unit: "tablespoon" }
    ],

    instructions: [
      {
        step: 1,
        description:
          "Mix flour, cocoa powder, sugar and baking powder.",
        time: 3
      },
      {
        step: 2,
        description:
          "Add milk and mix until a smooth batter forms.",
        time: 3
      },
      {
        step: 3,
        description:
          "Heat a pan and pour a small amount of batter.",
        time: 2
      },
      {
        step: 4,
        description:
          "Cook both sides until golden and serve with toppings.",
        time: 7
      }
    ],

    tips: [
      "Do not overmix the batter.",
      "Cook pancakes on medium heat."
    ]
  },

  {
    name: "Greek Salad",
    category: "Healthy",
    cuisine: "Greek",
    dietaryPreference: ["Vegetarian", "Healthy"],
    servings: 2,
    prepTime: 15,
    cookingTime: 0,
    difficulty: "Easy",
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999",
    rating: 4.3,

    ingredients: [
      { name: "Cucumber", quantity: 1, unit: "piece" },
      { name: "Tomato", quantity: 2, unit: "pieces" },
      { name: "Onion", quantity: 1, unit: "piece" },
      { name: "Olives", quantity: 10, unit: "pieces" },
      { name: "Feta Cheese", quantity: 100, unit: "grams" },
      { name: "Olive Oil", quantity: 2, unit: "tablespoons" }
    ],

    instructions: [
      {
        step: 1,
        description: "Wash and chop all vegetables.",
        time: 8
      },
      {
        step: 2,
        description:
          "Add vegetables, olives and feta cheese to a bowl.",
        time: 3
      },
      {
        step: 3,
        description:
          "Drizzle olive oil, mix gently and serve fresh.",
        time: 2
      }
    ],

    tips: [
      "Use fresh vegetables.",
      "Serve immediately for the best taste."
    ]
  },

  {
    name: "Mango Smoothie",
    category: "Drinks",
    cuisine: "Indian",
    dietaryPreference: ["Vegetarian"],
    servings: 2,
    prepTime: 10,
    cookingTime: 0,
    difficulty: "Easy",
    image:
      "https://images.unsplash.com/photo-1505252585461-04db1eb84625",
    rating: 4.7,

    ingredients: [
      { name: "Mango", quantity: 2, unit: "pieces" },
      { name: "Milk", quantity: 2, unit: "cups" },
      { name: "Sugar", quantity: 1, unit: "tablespoon" },
      { name: "Ice Cubes", quantity: 5, unit: "pieces" }
    ],

    instructions: [
      {
        step: 1,
        description: "Peel and chop the mangoes.",
        time: 5
      },
      {
        step: 2,
        description:
          "Add mango, milk, sugar and ice cubes to a blender.",
        time: 2
      },
      {
        step: 3,
        description:
          "Blend until smooth and creamy.",
        time: 2
      },
      {
        step: 4,
        description: "Pour into glasses and serve chilled.",
        time: 1
      }
    ],

    tips: [
      "Use ripe sweet mangoes.",
      "Chill before serving for better taste."
    ]
  },

  {
    name: "Pasta Alfredo",
    category: "Main Course",
    cuisine: "Italian",
    dietaryPreference: ["Vegetarian"],
    servings: 2,
    prepTime: 10,
    cookingTime: 20,
    difficulty: "Easy",
    image:
      "https://images.unsplash.com/photo-1645112411341-6c4fd023714a",
    rating: 4.6,

    ingredients: [
      { name: "Pasta", quantity: 200, unit: "grams" },
      { name: "Butter", quantity: 2, unit: "tablespoons" },
      { name: "Cream", quantity: 1, unit: "cup" },
      { name: "Parmesan Cheese", quantity: 50, unit: "grams" },
      { name: "Garlic", quantity: 2, unit: "cloves" },
      { name: "Salt", quantity: 1, unit: "teaspoon" }
    ],

    instructions: [
      {
        step: 1,
        description: "Boil pasta in salted water until cooked.",
        time: 10
      },
      {
        step: 2,
        description:
          "Melt butter and sauté minced garlic.",
        time: 3
      },
      {
        step: 3,
        description:
          "Add cream and simmer gently.",
        time: 4
      },
      {
        step: 4,
        description:
          "Add Parmesan cheese and mix until the sauce becomes creamy.",
        time: 3
      },
      {
        step: 5,
        description:
          "Add cooked pasta, mix well and serve hot.",
        time: 3
      }
    ],

    tips: [
      "Do not boil the cream on high heat.",
      "Reserve some pasta water to adjust the sauce."
    ]
  },

  {
    name: "Aloo Paratha",
    category: "Breakfast",
    cuisine: "North Indian",
    dietaryPreference: ["Vegetarian"],
    servings: 2,
    prepTime: 20,
    cookingTime: 20,
    difficulty: "Medium",
    image:
      "https://images.unsplash.com/photo-1626132647523-66f5bf380027",
    rating: 4.8,

    ingredients: [
      { name: "Wheat Flour", quantity: 2, unit: "cups" },
      { name: "Potatoes", quantity: 3, unit: "pieces" },
      { name: "Green Chilli", quantity: 1, unit: "piece" },
      { name: "Coriander", quantity: 2, unit: "tablespoons" },
      { name: "Oil", quantity: 2, unit: "tablespoons" },
      { name: "Salt", quantity: 1, unit: "teaspoon" }
    ],

    instructions: [
      {
        step: 1,
        description:
          "Boil and mash the potatoes. Mix with chilli, coriander and salt.",
        time: 10
      },
      {
        step: 2,
        description:
          "Prepare a soft dough using wheat flour and water.",
        time: 10
      },
      {
        step: 3,
        description:
          "Place potato filling inside the dough and seal it.",
        time: 5
      },
      {
        step: 4,
        description:
          "Roll into a flat paratha carefully.",
        time: 3
      },
      {
        step: 5,
        description:
          "Cook on a hot pan with oil until both sides are golden.",
        time: 7
      }
    ],

    tips: [
      "Make a soft dough.",
      "Do not overfill the paratha.",
      "Cook both sides evenly."
    ]
  }
];

async function seedRecipes() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected!");

    await Recipe.deleteMany({});

    await Recipe.insertMany(recipes);

    console.log("10 complete recipes added successfully! 🎉");

    await mongoose.connection.close();
  } catch (error) {
    console.error("Error:", error);
  }
}

seedRecipes();