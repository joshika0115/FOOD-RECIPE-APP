const mongoose = require("mongoose");
require("dotenv").config();
const Recipe = require("./models/Recipe");

// Repairs only the 18 recipes added by addMoreRecipes.js.
// It updates image + cooking instructions only. It never deletes recipes.
// The three duplicate names skipped by the original script are deliberately excluded.
const fixes = [
["Chicken Biryani","https://images.unsplash.com/photo-1563379091339-03246963d96a?auto=format&fit=crop&w=1000&q=85",[
"Rinse basmati rice until the water is mostly clear. Soak for 20 minutes, then drain.",
"Marinate chicken with yogurt, ginger-garlic paste, chilli powder, turmeric, biryani masala, and salt.",
"Heat oil or ghee in a heavy pot. Fry sliced onions until golden and reserve some for garnish.",
"Add the marinated chicken and cook, stirring, until the outside changes colour and the masala smells fragrant.",
"Boil rice in salted water with whole spices until about 70% cooked, then drain.",
"Layer rice over the chicken. Add mint, coriander, and fried onions.",
"Cover tightly and cook on very low heat until rice is tender and chicken is fully cooked; chicken should reach 74°C.",
"Rest covered for 5 minutes, fluff gently, and serve with raita."
]],
["Palak Paneer","https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=1000&q=85",[
"Wash spinach well and remove tough stems.",
"Blanch spinach in boiling water for 1–2 minutes, then cool in cold water to preserve its colour.",
"Drain and blend spinach into a smooth puree.",
"Heat oil or ghee; cook chopped onion until soft, then add ginger, garlic, and green chilli.",
"Add chopped tomato, cumin, coriander powder, and salt. Cook until tomato softens.",
"Stir in spinach puree and simmer gently, adding a little water if too thick.",
"Add paneer cubes and simmer until warmed through without breaking them.",
"Finish with a little cream or butter if desired. Serve with roti, naan, or rice."
]],
["Veg Pulao","https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1000&q=85",[
"Rinse rice, soak for 15 minutes, and drain.",
"Chop onion and mixed vegetables into evenly sized pieces.",
"Heat ghee or oil in a pot. Add cumin and whole spices and let them sizzle briefly.",
"Add onion and cook until lightly golden.",
"Add vegetables, salt, and pulao spices. Saute for 3–4 minutes.",
"Add drained rice and stir gently so the grains are coated with spices.",
"Add hot water, cover, and cook on low heat until rice is tender.",
"Rest covered for 5 minutes, fluff gently, and serve with raita."
]],
["Gobi Manchurian","https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=1000&q=85",[
"Wash cauliflower and cut into bite-sized florets. Pat dry.",
"Blanch florets in boiling water for 2 minutes, then drain and dry well.",
"Mix cornflour, flour, salt, pepper, and water into a thick batter.",
"Coat florets and fry or air-fry until crisp and cooked through.",
"Heat a little oil in another pan. Saute chopped garlic, ginger, and green chilli briefly.",
"Add onion and capsicum and stir-fry over high heat until just tender.",
"Add soy sauce, chilli sauce, and a splash of water; toss until glossy.",
"Add crispy cauliflower, toss quickly, garnish with spring onion, and serve immediately."
]],
["Paneer Tikka","https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=1000&q=85",[
"Cut paneer and bell pepper into similar-sized cubes.",
"Whisk yogurt with ginger-garlic paste, chilli powder, turmeric, garam masala, lemon juice, and salt.",
"Fold paneer and vegetables into the marinade until coated on all sides.",
"Cover and refrigerate for at least 15 minutes for flavour.",
"Preheat oven or air fryer to 200°C, or heat a grill pan over medium-high heat.",
"Thread paneer and vegetables onto skewers, leaving small gaps.",
"Brush lightly with oil and cook, turning occasionally, until browned at the edges and heated through.",
"Serve hot with lemon wedges, mint chutney, and sliced onion."
]],
["Chole Bhature","https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1000&q=85",[
"Soak dried chickpeas overnight, drain, and pressure-cook until tender; canned chickpeas can be used instead.",
"Mix flour, a little yogurt, salt, and water into a soft bhature dough. Cover and rest.",
"Heat oil in a pan and cook chopped onion until golden.",
"Add ginger-garlic paste, tomato, and chole spices. Cook until the masala thickens.",
"Add chickpeas and some cooking liquid. Simmer and mash a few chickpeas to thicken the gravy.",
"Divide rested dough into balls and roll each into an oval or circle.",
"Carefully fry each bhatura in hot oil until puffed and golden, turning once.",
"Serve hot bhature with chole, sliced onion, lemon, and coriander."
]],
["Masala Pav","https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1000&q=85",[
"Finely chop onion, tomato, and capsicum. Slit pav buns without cutting all the way through.",
"Heat butter in a pan and add cumin and pav bhaji masala.",
"Add onion and capsicum and cook until softened.",
"Add tomato, chilli powder, salt, and a splash of water. Cook until tomato breaks down.",
"Mash the masala lightly with a spatula until thick and spreadable.",
"Spread masala across the pan and press the cut sides of pav into it.",
"Toast pav with a little extra butter until warm and lightly crisp.",
"Garnish with coriander and serve hot with lemon wedges."
]],
["Aloo Tikki","https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1000&q=85",[
"Boil potatoes until tender, drain, peel, and let them cool enough to handle.",
"Mash potatoes until mostly smooth, without large lumps.",
"Mix in salt, chilli powder, cumin, coriander, herbs, and a little cornflour or breadcrumbs.",
"Divide mixture into equal portions and shape each into a flat patty.",
"Chill patties briefly if they are too soft to handle.",
"Heat a thin layer of oil in a non-stick pan over medium heat.",
"Cook patties until golden and crisp underneath, then flip and cook the other side.",
"Serve hot with mint chutney, tamarind chutney, or yogurt."
]],
["White Sauce Pasta","https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1000&q=85",[
"Boil salted water and cook pasta until al dente according to packet directions.",
"Reserve a small cup of pasta water, then drain the pasta.",
"Melt butter in a pan over medium-low heat. Whisk in flour and cook for one minute without browning.",
"Gradually whisk in milk, a little at a time, to prevent lumps.",
"Simmer while stirring until the sauce thickens and coats the back of a spoon.",
"Season with salt, pepper, and mixed herbs or a pinch of nutmeg if desired.",
"Stir in cheese, add pasta, and toss until coated. Loosen with pasta water if needed.",
"Serve immediately with herbs and extra cheese."
]],
["Chocolate Brownies","https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1000&q=85",[
"Preheat oven to 175°C and line a small baking tin with baking paper.",
"Melt chocolate and butter gently, then allow the mixture to cool slightly.",
"Whisk sugar and eggs in a bowl until combined.",
"Pour in the melted chocolate mixture and stir until smooth.",
"Sift in flour, cocoa powder, and a pinch of salt. Fold just until combined.",
"Spread batter evenly in the prepared tin and smooth the top.",
"Bake until edges are set and a toothpick near the centre has a few moist crumbs.",
"Cool completely before slicing so the brownies set and cut neatly."
]],
["Strawberry Milkshake","https://images.unsplash.com/photo-1553787499-6f913324f8c6?auto=format&fit=crop&w=1000&q=85",[
"Rinse strawberries under cool running water and pat them dry.",
"Remove green tops and cut the strawberries into halves or quarters.",
"Chill strawberries and milk beforehand for a thicker, colder shake.",
"Place strawberries in a blender with cold milk.",
"Add sugar, honey, or vanilla only if desired, depending on fruit sweetness.",
"Blend for 30–60 seconds until smooth and evenly pink.",
"Taste and adjust: add milk if too thick or a few ice cubes if you want it colder.",
"Pour into chilled glasses and serve immediately."
]],
["Mango Lassi","https://images.unsplash.com/photo-1626201850129-57f3c8d9b5f5?auto=format&fit=crop&w=1000&q=85",[
"Wash, peel, and cut the ripe mango into chunks, removing the stone.",
"Add mango chunks and chilled yogurt to a blender.",
"Pour in milk or water a little at a time to help the mixture blend.",
"Add sugar or honey only if the mango is not sweet enough.",
"Blend until creamy and smooth, scraping down the sides if needed.",
"Check thickness and add a little more milk for a thinner drink.",
"Taste and adjust sweetness; add a pinch of cardamom if desired.",
"Pour into glasses and serve cold, optionally garnished with chopped nuts."
]],
["Mushroom Fried Rice","https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1000&q=85",[
"Use cooked rice that has cooled and separated grains; chilled leftover rice works well.",
"Wipe mushrooms clean and slice them. Chop garlic, spring onion, and other vegetables.",
"Heat a wok or wide pan until hot, then add a little oil.",
"Add mushrooms in a single layer and cook until their moisture evaporates and edges brown.",
"Add garlic and vegetables and stir-fry briefly over high heat.",
"Add rice and break up clumps with a spatula.",
"Season with soy sauce and pepper; toss until heated throughout.",
"Finish with spring onion and serve immediately."
]],
["Banana Pancakes","https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=1000&q=85",[
"Peel ripe bananas and mash them in a bowl until mostly smooth.",
"Whisk in egg and milk until combined.",
"Add flour, a little baking powder, and a pinch of salt. Mix just until combined.",
"Rest the batter for 5 minutes while heating a lightly greased non-stick pan.",
"Pour small portions of batter into the pan, leaving space between pancakes.",
"Cook over medium-low heat until bubbles appear and the edges look set.",
"Flip carefully and cook the other side until golden and cooked through.",
"Serve warm with banana slices, yogurt, or a little honey."
]],
["Tomato Soup","https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=85",[
"Wash tomatoes and cut into quarters. Chop onion and garlic.",
"Heat a little oil or butter in a saucepan and soften the onion.",
"Add garlic and cook briefly until fragrant without letting it burn.",
"Add tomatoes, salt, pepper, and enough water or stock to simmer.",
"Cover and simmer until tomatoes are very soft.",
"Cool slightly, then carefully blend until smooth.",
"Strain if desired, return to the pan, and adjust seasoning and thickness.",
"Warm gently and serve with herbs, black pepper, or toasted bread."
]],
["Vegetable Sandwich","https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=1000&q=85",[
"Wash and dry cucumber, tomato, and lettuce. Slice vegetables thinly.",
"Pat tomato slices dry so the bread does not become soggy.",
"Spread butter, chutney, or a little mayonnaise on the bread as preferred.",
"Layer cucumber, tomato, lettuce, and cheese evenly over the bread.",
"Season lightly with salt and pepper. Add herbs or chutney if desired.",
"Close with the remaining bread slices and press gently.",
"Grill in a sandwich press or pan until crisp and cheese melts, if you want it toasted.",
"Cut in halves and serve immediately with ketchup or a side salad."
]],
["Fruit Smoothie","https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=1000&q=85",[
"Wash fruit well. Peel banana and remove stems or seeds as needed.",
"Cut larger fruit into small chunks so it blends evenly.",
"Add fruit to a blender with yogurt or milk.",
"Add ice cubes or use frozen fruit for a colder, thicker smoothie.",
"Blend until smooth, stopping to scrape down the sides if pieces stick.",
"Add milk for a thinner smoothie or more fruit for a thicker one.",
"Taste before adding sweetener; ripe fruit may already be sweet enough.",
"Pour into glasses and serve straight away for the best texture."
]],
["Corn Cheese Toast","https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=1000&q=85",[
"Drain sweet corn well. If using frozen corn, thaw it and pat dry.",
"Mix corn with grated cheese, black pepper, and chopped capsicum or spring onion if desired.",
"Place bread slices on a baking tray or board.",
"Spread the corn-cheese mixture evenly over each slice and press gently.",
"Preheat oven or air fryer to 180–200°C, or heat a covered pan over low heat.",
"Toast until bread is crisp and cheese is melted and bubbling.",
"Let it cool for a minute before handling because the topping will be very hot.",
"Sprinkle with chilli flakes or herbs and serve warm."
]]
];

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/food_recipe_db");
    console.log("Connected to food_recipe_db.");
    let updated = 0;
    let missing = 0;

    for (const [name, image, steps] of fixes) {
      const instructions = steps.map((description, index) => ({
        step: index + 1,
        description,
        time: 3
      }));
      const result = await Recipe.updateOne(
        { name },
        { $set: { image, instructions } }
      );
      if (result.matchedCount) {
        updated++;
        console.log("Updated: " + name);
      } else {
        missing++;
        console.log("Not found; left unchanged: " + name);
      }
    }

    console.log(`\nDone! Updated ${updated} recipes; ${missing} were not found.`);
    console.log("No recipes were deleted. Ingredients and other fields were left unchanged.");
  } catch (error) {
    console.error("Update failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

main();
