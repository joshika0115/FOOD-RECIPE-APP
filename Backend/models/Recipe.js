const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    cuisine: {
      type: String,
      required: true,
    },

    dietaryPreference: {
      type: [String],
      default: [],
    },

    ingredients: [
      {
        name: {
          type: String,
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
        },

        unit: {
          type: String,
          required: true,
        },
      },
    ],

    instructions: [
      {
        step: {
          type: Number,
          required: true,
        },

        description: {
          type: String,
          required: true,
        },

        time: {
          type: Number,
          default: 0,
        },
      },
    ],

    prepTime: {
      type: Number,
      required: true,
    },

    cookingTime: {
      type: Number,
      required: true,
    },

    servings: {
      type: Number,
      required: true,
      default: 2,
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Easy",
    },

    image: {
      type: String,
      default: "",
    },

    rating: {
      type: Number,
      default: 0,
    },

    tips: {
      type: [String],
      default: [],
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Recipe", recipeSchema);