import mongoose from 'mongoose';

const ingredientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Ingredient name is required'],
      trim: true,
      unique: true,
    },
    stored_unit: {
      type: String,
      required: [true, 'Stored unit is required'],
      trim: true,
    }
  }
);

export default mongoose.model('Ingredient', ingredientSchema);
