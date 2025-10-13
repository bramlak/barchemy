import mongoose from 'mongoose';

const ingredientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Ingredient name is required'],
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, 'Ingredient quantity is required'],
      trim: true,
    },
    unit: {
      type: String,
      required: [true, 'Ingredient unit is required'],
      trim: true,
    },
    stored_unit: {
      type: String,
      required: [true, 'Ingredient stored unit is required'],
      trim: true,
    },
  },
  { _id: false }
);

const recipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Recipe name is required'],
      trim: true,
      unique: true,
    },
    garnish: {
      type: String,
      default: null,
      trim: true,
    },
    method: {
      type: String,
      default: null,
      trim: true,
    },
    ingredients: {
      type: [ingredientSchema],
      validate: [
        (v) => Array.isArray(v) && v.length > 0,
        'At least one ingredient is required',
      ],
    },
  }
);

export default mongoose.model('Recipe', recipeSchema);
