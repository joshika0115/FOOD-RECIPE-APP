# 🍽️ Food Recipe App

## 📌 Project Overview

The Food Recipe App is a full-stack web application designed to help users explore different recipes, view ingredients, and follow step-by-step cooking instructions.

The application provides a simple and user-friendly interface for discovering recipes and learning how to prepare various dishes.

## 🎯 Aim

The main aim of this project is to develop an interactive web application that makes recipe information easily accessible and provides users with a convenient way to explore and contribute recipes.

## ✨ Features

- Browse different recipes.
- View recipe ingredients and cooking instructions.
- Add new recipes to the application.
- Store and manage recipe information using MongoDB.
- Connect the frontend and backend through APIs.
- User-friendly interface for exploring recipes.

## 🛠️ Technology Stack

### Frontend
- React.js
- Vite
- HTML
- CSS
- JavaScript
- Axios

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

## 📂 Project Structure

```text
Food-recipe-app/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── RecipeCard.jsx
│   │   │   └── RecipeForm.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   └── package.json
│
├── Backend/
│   ├── models/
│   │   └── Recipe.js
│   ├── routes/
│   │   └── recipeRoutes.js
│   ├── server.js
│   ├── seedRecipes.js
│   └── package.json
│
├── README.md
└── .gitignore
