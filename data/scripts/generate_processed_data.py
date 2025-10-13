import pandas as pd
import json
from pathlib import Path

RAW_DIR = Path("raw")
CONFIG_DIR = Path("config")
PROCESSED_DIR = Path("processed")
PROCESSED_DIR.mkdir(exist_ok=True)

INGREDIENTS_CSV = RAW_DIR / "iba-cocktails-ingredients-web.csv"
COCKTAILS_CSV = RAW_DIR / "iba-cocktails-web.csv"
CONVERSIONS_CSV = CONFIG_DIR / "unit-conversions.csv"
STORED_UNITS_CSV = CONFIG_DIR / "stored-units.csv"


def filter_columns(df, columns):
    return df[columns]


def capitalize_column(df, column):
    df = df.copy()
    df[column] = df[column].str.title()
    return df


def replace_nan_with_none(df):
    return df.where(pd.notnull(df), None)


def merge_data(ingredients_df, cocktails_df):
    return pd.merge(ingredients_df, cocktails_df, on="name", how="inner")


def prepare_units(merged_df, conversions_df, stored_units_df):
    units_df = pd.DataFrame({"unit": merged_df["unit"].dropna().unique()})
    units_df = filterStoredUnits(units_df, stored_units_df)
    units_df = apply_unit_conversions(units_df, conversions_df)
    return units_df.to_dict(orient="records")

def filterStoredUnits(units_df, stored_units_df):
    filtered_df = units_df[units_df['unit'].isin(stored_units_df['unit'])]
    return filtered_df


def write_json(data, path):
    with open(path, "w") as f:
        json.dump(data, f, indent=4)


def find_unit_by_unit_name(units, unit_name):
    temporary_unit = {
        "unit": unit_name,
        "stored_unit": "ml",
        "factor": 0
    }
    unit = next((unit for unit in units if unit["unit"] == unit_name), temporary_unit)

    return unit

def convert_ingredient_to_stored(ingredient, units):
    name = ingredient["name"]
    unit = find_unit_by_unit_name(units, ingredient["unit"])
    stored_ingredient = {
        "name": name,
        "quantity": float(ingredient["quantity"]) * unit["factor"],
        "unit": ingredient["unit"],
        "stored_unit": unit["stored_unit"]
    }
    return stored_ingredient

def parse_to_float(value):
    try:
        number = float(value)
    except (ValueError, TypeError, KeyError):
        number = 0
    return number

def prepare_recipes(merged_df, units):
    df = capitalize_column(merged_df, "ingredient")
    df = replace_nan_with_none(df)

    recipes = []
    for recipe_name, group in df.groupby("name"):
        ingredients = [
            convert_ingredient_to_stored({
            "name": row["ingredient"],
            "quantity": parse_to_float(row["quantity"]),
            "unit": row["unit"]
            }, units)


            for _, row in group.iterrows()
        ]
        recipe_obj = {
            "name": recipe_name,
            "garnish": group["garnish"].iloc[0],
            "method": group["method"].iloc[0],
            "ingredients": ingredients,
        }
        recipes.append(recipe_obj)
    return recipes

def apply_unit_conversions(df, conversions_df):
    df = df.copy()
    conversions_map = conversions_df.set_index("unit").to_dict(orient="index")

    def convert(row):
        conv = conversions_map.get(row["unit"])
        if conv:
            row["stored_unit"] = conv["stored_unit"]
            row["factor"] = conv["factor"]
        else:
            row["stored_unit"] = row["unit"]
            row["factor"] = 1
        return row

    return df.apply(convert, axis=1)


def main():
    ingredients_raw_df = pd.read_csv(INGREDIENTS_CSV)
    cocktails_raw_df = pd.read_csv(COCKTAILS_CSV)
    conversions_df = pd.read_csv(CONVERSIONS_CSV)
    stored_units_df = pd.read_csv(STORED_UNITS_CSV)


    ingredients_df = filter_columns(ingredients_raw_df, ["name", "quantity", "unit", "ingredient"])
    cocktails_df = filter_columns(cocktails_raw_df, ["name", "method", "garnish"])
    
    merged_df = merge_data(ingredients_df, cocktails_df)
    units = prepare_units(merged_df, conversions_df, stored_units_df)
    recipes = prepare_recipes(merged_df, units)

    write_json(units, PROCESSED_DIR / "units.json")
    write_json(recipes, PROCESSED_DIR / "recipes.json")


if __name__ == "__main__":
    main()
