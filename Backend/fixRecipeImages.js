const mongoose = require("mongoose");
require("dotenv").config();
const Recipe = require("./models/Recipe");

// Repairs recipe pictures only. It does not change instructions, ingredients,
// names, or any other recipe fields. Photos are searched by dish name on Wikimedia Commons.
const recipesToFix = [
  { name: "Chicken Biryani", query: "chicken biryani" },
  { name: "Palak Paneer", query: "palak paneer" },
  { name: "Veg Pulao", query: "vegetable pulao rice" },
  { name: "Gobi Manchurian", query: "gobi manchurian" },
  { name: "Paneer Tikka", query: "paneer tikka" },
  { name: "Chole Bhature", query: "chole bhature" },
  { name: "Masala Pav", query: "masala pav Indian food" },
  { name: "Aloo Tikki", query: "aloo tikki" },
  { name: "White Sauce Pasta", query: "white sauce pasta" },
  { name: "Chocolate Brownies", query: "chocolate brownies dessert" },
  { name: "Strawberry Milkshake", query: "strawberry milkshake" },
  { name: "Mango Lassi", query: "mango lassi" },
  { name: "Mushroom Fried Rice", query: "mushroom fried rice" },
  { name: "Banana Pancakes", query: "banana pancakes" },
  { name: "Tomato Soup", query: "tomato soup bowl" },
  { name: "Vegetable Sandwich", query: "vegetable sandwich" },
  { name: "Fruit Smoothie", query: "fruit smoothie" },
  { name: "Corn Cheese Toast", query: "corn cheese toast" },
  { name: "Greek Salad", query: "greek salad" },
  { name: "Aloo Paratha", query: "aloo paratha" },
  { name: "Chocolate Pancakes", query: "chocolate pancakes" },
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function normalize(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/^file:/, "")
    .replace(/\.[a-z0-9]{2,5}$/i, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

async function findCommonsImage(query) {
  const api = new URL("https://commons.wikimedia.org/w/api.php");
  api.searchParams.set("action", "query");
  api.searchParams.set("generator", "search");
  api.searchParams.set("gsrsearch", query);
  api.searchParams.set("gsrnamespace", "6");
  api.searchParams.set("gsrlimit", "12");
  api.searchParams.set("prop", "imageinfo");
  api.searchParams.set("iiprop", "url|mime");
  api.searchParams.set("iiurlwidth", "1000");
  api.searchParams.set("format", "json");

  const response = await fetch(api, {
    headers: {
      "User-Agent": "FoodRecipeAppImageFix/1.0 (educational project)",
      Accept: "application/json",
    },
  });
  if (!response.ok) throw new Error(`Wikimedia search returned HTTP ${response.status}`);
  const data = await response.json();
  const pages = Object.values(data.query?.pages || {});
  const words = normalize(query).split(" ").filter((word) => word.length > 2 && !["food", "dish", "indian", "bowl", "dessert"].includes(word));

  const candidates = pages
    .map((page, index) => {
      const info = page.imageinfo?.[0];
      const title = normalize(page.title);
      const score = words.reduce((total, word) => total + (title.includes(word) ? 1 : 0), 0);
      return { title: page.title, url: info?.thumburl || info?.url, mime: info?.mime || "", score, index };
    })
    .filter((item) => item.url && item.mime.startsWith("image/") && item.score > 0)
    .filter((item) => !/(logo|poster|menu|diagram|map|icon|book cover|recipe card)/i.test(item.title));

  candidates.sort((a, b) => b.score - a.score || a.index - b.index);
  return candidates[0] || null;
}

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/food_recipe_db");
    console.log("Connected to food_recipe_db. Searching for dish-specific pictures...\n");

    let updated = 0;
    let notFound = 0;
    let failed = 0;

    for (const recipe of recipesToFix) {
      try {
        const photo = await findCommonsImage(recipe.query);
        if (!photo) {
          console.log(`No suitable photo found: ${recipe.name} (left existing picture unchanged)`);
          notFound++;
        } else {
          const result = await Recipe.updateOne(
            { name: recipe.name },
            { $set: { image: photo.url } }
          );
          if (result.matchedCount) {
            console.log(`Updated picture: ${recipe.name} — ${photo.title}`);
            updated++;
          } else {
            console.log(`Recipe not found in database: ${recipe.name}`);
            notFound++;
          }
        }
      } catch (error) {
        console.log(`Could not update ${recipe.name}: ${error.message}`);
        failed++;
      }
      await sleep(500);
    }

    console.log(`\nDone! Pictures updated: ${updated}; not found/no match: ${notFound}; errors: ${failed}.`);
    console.log("Only the image field was changed. Instructions and ingredients were left untouched.");
  } catch (error) {
    console.error("Image repair failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

main();
