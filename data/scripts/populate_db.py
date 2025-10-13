import json
from pathlib import Path
from pymongo import MongoClient
from dotenv import load_dotenv
import os

BASE_DIR = Path(__file__).resolve().parent.parent

DATA_DIR = BASE_DIR / "processed"
UNITS_FILE = DATA_DIR / "units.json"
RECIPES_FILE = DATA_DIR / "recipes.json"
INGREDIENTS_FILE = DATA_DIR / "ingredients.json"


def load_json(path):
    with open(path, "r") as f:
        return json.load(f)


def get_db_connection():
    load_dotenv()
    uri = os.getenv("MONGO_URI")
    db_name = os.getenv("MONGO_DB")

    if not uri or not db_name:
        raise ValueError("MONGO_URI or MONGO_DB missing in .env")

    client = MongoClient(uri)
    return client[db_name]


def replace_collection(collection, data):
    collection.drop()
    if data:
        collection.insert_many(data)
    print(f"{collection.name} collection updated with {len(data)} documents.")


def main():
    db = get_db_connection()

    units_data = load_json(UNITS_FILE)
    recipes_data = load_json(RECIPES_FILE)
    ingredients_data = load_json(INGREDIENTS_FILE)

    unit_collection = db["units"]
    recipes_collection = db["recipes"]
    ingredients_collection = db["ingredients"]

    replace_collection(unit_collection, units_data)
    replace_collection(recipes_collection, recipes_data)
    replace_collection(ingredients_collection, ingredients_data)

    print("MongoDB successfully populated!")


if __name__ == "__main__":
    main()
