import Unit from './unit.model.js';


export const getAll = async () => {
  const units = await Unit.find().lean();
  return units;
};


export const getAllNames = async () => {
  const units = await Unit.find({}, { unit: 1, _id: 0 }).lean();
  return units.map((u) => u.unit);
};


export const getFactorByUnit = async (unitName) => {
  const unit = await Unit.findOne({ unit: unitName }).lean();
  return unit ? unit.factor : null;
};

export const getStoredUnitByUnit = async (unitName) => {
  const unit = await Unit.findOne({ unit: unitName }).lean();
  return unit ? unit.stored_unit : null;
};
