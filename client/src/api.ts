import axios from 'axios';
import { API_URL } from './constants';
import { Dispatch } from '@reduxjs/toolkit';
import { setInsurances } from './store/slices/insurancesSlice';
import { Insurance } from './store/slices/insurancesSlice';
import { setCurrentInsurance } from './store/slices/currentInsuranceSlice';

const INSURANCES_URL = `${API_URL}/insurances`;

export const getAllInsurances = async () => {
  return await axios.get(INSURANCES_URL);
};

export const createNewInsurance = async (data: Partial<Insurance>) => {
  return await axios.put(INSURANCES_URL, data);
};

export const updateInsurance = async (data: Partial<Insurance>) => {
  return await axios.put(`${INSURANCES_URL}/${data._id}`, data);
};

export const setInsurancesState = async (dispatch: Dispatch) => {
  try {
    const insurancesList = await getAllInsurances();
    dispatch(setInsurances(insurancesList.data.insurances));
  } catch (error) {
    console.error('Error fetching insurances:', error);
  }
};

export const setCurrentInsuranceStateOnCreate = async (dispatch: Dispatch, data: Partial<Insurance>) => {
  try {
    const newInsurance = await createNewInsurance(data);
    dispatch(setCurrentInsurance(newInsurance.data.data));
  } catch (error) {
    console.error('Error fetching insurances:', error);
  }
};

export const updateCurrentInsuranceState = async (dispatch: Dispatch, data: Partial<Insurance>) => {
  try {
    const updatedInsurance = await updateInsurance(data);
    dispatch(setCurrentInsurance(updatedInsurance.data.data));
  } catch (error) {
    console.error('Error fetching insurances:', error);
  }
};
