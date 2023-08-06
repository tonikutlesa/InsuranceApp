import axios from 'axios';
import { API_URL } from './constants';
import { Dispatch } from '@reduxjs/toolkit';
import { setInsurances } from './store/slices/insurancesSlice';

const INSURANCES_URL = `${API_URL}/insurances`;

export const getAllInsurances = async () => {
  return await axios.get(INSURANCES_URL);
};

export const setInsurancesState = async (dispatch: Dispatch) => {
  try {
    const insurancesList = await getAllInsurances();
    dispatch(setInsurances(insurancesList.data.insurances));
  } catch (error) {
    console.error('Error fetching insurances:', error);
  }
};
