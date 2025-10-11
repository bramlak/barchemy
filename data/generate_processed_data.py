import pandas as pd
import json
from pathlib import Path

RAW_DIR = Path("raw")
PROCESSED_DIR = Path("processed")
PROCESSED_DIR.mkdir(exist_ok=True)

INGREDIENTS_CSV = RAW_DIR / "iba-cocktails-ingredients-web.csv"
COCKTAILS_CSV = RAW_DIR / "iba-cocktails-web.csv"


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


def prepare_units(merged_df):
    units = merged_df["unit"].dropna().unique().tolist()
    return [{"unit": u, "stored_unit": u, "factor": 1} for u in units]


def write_json(data, path):
    with open(path, "w") as f:
        json.dump(data, f, indent=4)


def prepare_recipes(merged_df):
    df = capitalize_column(merged_df, "ingredient")
    df = replace_nan_with_none(df)

    recipes = []
    for recipe_name, group in df.groupby("name"):
        ingredients = [
            {"name": row["ingredient"], "quantity": row["quantity"], "unit": row["unit"]}
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


def main():
    ingredients_raw_df = pd.read_csv(INGREDIENTS_CSV)
    cocktails_raw_df = pd.read_csv(COCKTAILS_CSV)

    ingredients_df = filter_columns(ingredients_raw_df, ["name", "quantity", "unit", "ingredient"])
    cocktails_df = filter_columns(cocktails_raw_df, ["name", "method", "garnish"])
    
    merged_df = merge_data(ingredients_df, cocktails_df)

    units = prepare_units(merged_df)
    recipes = prepare_recipes(merged_df)

    write_json(units, PROCESSED_DIR / "units.json")
    write_json(recipes, PROCESSED_DIR / "recipes.json")


if __name__ == "__main__":
    main()
