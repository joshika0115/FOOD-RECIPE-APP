const mongoose = require("mongoose");
require("dotenv").config();
const Recipe = require("./models/Recipe");

// Updates ONLY the image field for recipes whose Wikimedia lookup was blocked
// or returned no suitable image. Existing instructions and ingredients remain untouched.
const recipesToFix = [
  { name: "Masala Pav", query: "masala pav" },
  { name: "Strawberry Milkshake", query: "strawberry milkshake" },
  { name: "Mango Lassi", query: "mango lassi" },
  { name: "Mushroom Fried Rice", query: "mushroom fried rice" },
  { name: "Banana Pancakes", query: "banana pancakes" },
  { name: "Tomato Soup", query: "tomato soup" },
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
  api.searchParams.set("gsrsearch", `intitle:${query}`);
  api.searchParams.set("gsrnamespace", "6");
  api.searchParams.set("gsrlimit", "20");
  api.searchParams.set("prop", "imageinfo");
  api.searchParams.set("iiprop", "url|mime");
  api.searchParams.set("iiurlwidth", "1000");
  api.searchParams.set("format", "json");

  for (let attempt = 1; attempt <= 4; attempt++) {
    const response = await fetch(api, {
      headers: {
        "User-Agent": "FoodRecipeAppImageFix/1.1 (educational project; respectful request spacing)",
        Accept: "application/json",
      },
    });

    if (response.status === 429 || response.status === 503) {
      const retryAfter = Number(response.headers.get("retry-after"));
      const waitMs = Number.isFinite(retryAfter) && retryAfter > 0
        ? retryAfter * 1000
        : attempt * 30000;
      if (attempt === 4) {
        throw new Error(`Wikimedia still rate-limited the request (HTTP ${response.status}) after retries`);
      }
      console.log(`Wikimedia rate limit for “${query}”; waiting ${Math.round(waitMs / 1000)} seconds before retry ${attempt + 1}/4...`);
      await sleep(waitMs);
      continue;
    }

    if (!response.ok) throw new Error(`Wikimedia search returned HTTP ${response.status}`);
    const data = await response.json();
    const pages = Object.values(data.query?.pages || {});
    const words = normalize(query).split(" ").filter((word) => word.length > 2);

    const candidates = pages
      .map((page, index) => {
        const info = page.imageinfo?.[0];
        const title = normalize(page.title);
        const score = words.reduce((total, word) => total + (title.includes(word) ? 1 : 0), 0);
        return { title: page.title, url: info?.thumburl || info?.url, mime: info?.mime || "", score, index };
      })
      .filter((item) => item.url && item.mime.startsWith("image/"))
      .filter((item) => !/(logo|poster|menu|diagram|map|icon|book cover|recipe card)/i.test(item.title))
      // Avoid changing a recipe to an image that matches only one generic word.
      .filter((item) => item.score >= Math.min(2, words.length));

    candidates.sort((a, b) => b.score - a.score || a.index - b.index);
    return candidates[0] || null;
  }
  return null;
}

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/food_recipe_db");
    console.log("Connected to food_recipe_db. Fixing remaining recipe pictures only.\n");
    let updated = 0;
    let unchanged = 0;
    let failed = 0;

    for (const recipe of recipesToFix) {
      try {
        const photo = await findCommonsImage(recipe.query);
        if (!photo) {
          console.log(`No suitable matching photo: ${recipe.name} (existing picture left unchanged)`);
          unchanged++;
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
            unchanged++;
          }
        }
      } catch (error) {
        console.log(`Could not update ${recipe.name}: ${error.message}`);
        failed++;
      }
      // Deliberately slow requests to avoid repeating the previous HTTP 429 issue.
      await sleep(6000);
    }

    console.log(`\nDone! Pictures updated: ${updated}; left unchanged/not found: ${unchanged}; errors: ${failed}.`);
    console.log("Only the image field was changed. Instructions, ingredients, and other fields were untouched.");
  } catch (error) {
    console.error("Image repair failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

main();
