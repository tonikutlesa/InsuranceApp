import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setInsurancesState } from '../api';
import InsuranceTable from '../components/InsuranceTable';

const InsuranceListPage = (): JSX.Element => {
  const dispatch = useDispatch();

  const setInsurancesStateCallback = useCallback(() => {
    setInsurancesState(dispatch);
  }, [dispatch]);

  useEffect(() => {
    setInsurancesStateCallback();
  }, [setInsurancesStateCallback]);

  return <InsuranceTable />;
};

export default InsuranceListPage;
