import mongoose from 'mongoose';

const unitSchema = new mongoose.Schema(
  {
    unit: {
      type: String,
      required: [true, 'Unit name is required'],
      trim: true,
      unique: true,
    },
    stored_unit: {
      type: String,
      required: [true, 'Stored unit is required'],
      trim: true,
    },
    factor: {
      type: Number,
      required: [true, 'Conversion factor is required'],
      min: [0, 'Factor must be a positive number'],
    },
  }
);

export default mongoose.model('Unit', unitSchema);
