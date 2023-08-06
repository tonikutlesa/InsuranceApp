import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setInsurancesState } from '../api';
import { resetCurrentInsurance } from '../store/slices/currentInsuranceSlice';
import InsuranceTable from '../components/InsuranceTable';

const InsuranceListPage = (): JSX.Element => {
  const dispatch = useDispatch();

  const setInsurancesStateCallback = useCallback(() => {
    setInsurancesState(dispatch);
  }, [dispatch]);

  const resetCurrentInsuranceCallback = useCallback(() => {
    dispatch(resetCurrentInsurance());
  }, [dispatch]);

  useEffect(() => {
    resetCurrentInsuranceCallback;
    setInsurancesStateCallback();
  }, [setInsurancesStateCallback, resetCurrentInsuranceCallback]);

  return <InsuranceTable />;
};

export default InsuranceListPage;
