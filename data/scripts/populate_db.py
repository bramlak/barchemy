import json
from pathlib import Path
from pymongo import MongoClient
from dotenv import load_dotenv
import os


DATA_DIR = Path("processed")
UNITS_FILE = DATA_DIR / "units.json"
RECIPES_FILE = DATA_DIR / "recipes.json"


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
    print(f"{name} collection updated with {len(data)} documents.")


def main():
    db = get_db_connection()

    units_data = load_json(UNITS_FILE)
    recipes_data = load_json(RECIPES_FILE)

    unit_collection = db["units"]
    recipes_collection = db["recipes"]
    replace_collection(unit_collection, units_data)
    replace_collection(recipes_collection, recipes_data)

    print("MongoDB successfully populated!")


if __name__ == "__main__":
    main()
