import * as unitRepository from './unit.repository.js';


export const getAllUnits = async () => {
  return await unitRepository.getAll();
};


export const getAllUnitNames = async () => {
  return await unitRepository.getAllNames();
};


export const getFactorByUnit = async (unit) => {
  if (!unit) throw new Error('Unit name is required');
  return await unitRepository.getFactorByUnit(unit);
};



export const getStoredUnitByUnit = async (unit) => {
  if (!unit) throw new Error('Unit name is required');
  return await unitRepository.getStoredUnitByUnit(unit);
};