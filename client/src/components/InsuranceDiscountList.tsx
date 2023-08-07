import { Container, Checkbox, FormControlLabel, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCurrentSelectedDiscounts,
  selectCurrentSelectedSurcharges,
  addDiscount,
  removeDiscount,
  selectCurrentInsurance,
  addSurcharge,
  removeSurcharge,
  selectCurrentSelectedCoverages
} from '../store/slices/currentInsuranceSlice';
import { DISCOUNTS, SURCHARGES } from '../constants';
import { useEffect } from 'react';
import { updateCurrentInsuranceState } from '../api';

const InsuranceDiscountList: React.FC = () => {
  const dispatch = useDispatch();
  const currentInsurance = useSelector(selectCurrentInsurance);
  const currentSelectedDiscounts = useSelector(selectCurrentSelectedDiscounts);
  const currentSelectedSurcharges = useSelector(selectCurrentSelectedSurcharges);
  const currentSelectedCoverages = useSelector(selectCurrentSelectedCoverages);
  const selectedDiscounts = currentSelectedDiscounts.map((discount) => discount);
  const selectedSurcharges = currentSelectedSurcharges.map((surcharge) => surcharge);

  const handleDiscountToggle = (label: string) => {
    selectedDiscounts.includes(label) ? dispatch(removeDiscount(label)) : dispatch(addDiscount(label));
  };

  const handleSurchargeToggle = (label: string) => {
    selectedSurcharges.includes(label) ? dispatch(removeSurcharge(label)) : dispatch(addSurcharge(label));
  };

  useEffect(() => {
    updateCurrentInsuranceState(dispatch, {
      _id: currentInsurance._id,
      name: currentInsurance.name,
      birthdate: currentInsurance.birthdate,
      city: currentInsurance.city,
      vehiclePower: currentInsurance.vehiclePower,
      voucher: currentInsurance.voucher,
      priceMatch: currentInsurance.priceMatch,
      discounts: currentSelectedDiscounts,
      surcharges: currentSelectedSurcharges,
      coverages: currentSelectedCoverages
    });
  }, [
    currentSelectedDiscounts,
    currentSelectedSurcharges,
    currentSelectedCoverages,
    dispatch,
    currentInsurance._id,
    currentInsurance.name,
    currentInsurance.birthdate,
    currentInsurance.city,
    currentInsurance.vehiclePower,
    currentInsurance.voucher,
    currentInsurance.priceMatch
  ]);

  return (
    <Container
      sx={{
        mt: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        backgroundColor: 'lightgray'
      }}
    >
      {DISCOUNTS.map((discount) => (
        <FormControlLabel
          key={discount.label}
          control={<Checkbox checked={selectedDiscounts.includes(discount.label)} onChange={() => handleDiscountToggle(discount.label)} />}
          label={discount.label}
          sx={{ mr: 5 }}
        />
      ))}
      {SURCHARGES.map((surcharge) => (
        <FormControlLabel
          key={surcharge.label}
          control={<Checkbox checked={selectedSurcharges.includes(surcharge.label)} onChange={() => handleSurchargeToggle(surcharge.label)} />}
          label={surcharge.label}
          sx={{ mr: 5 }}
        />
      ))}
      <Typography mt={0.8} fontSize={22}>
        Total price: <b>{currentInsurance.totalPrice}</b>
      </Typography>
    </Container>
  );
};

export default InsuranceDiscountList;
