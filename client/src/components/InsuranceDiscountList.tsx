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
import { DISCOUNT_CHECKBOX_LABELS, SURCHARGE_CHECKBOX_LABELS, DISCOUNTS, SURCHARGES } from '../constants';
import { useEffect, useCallback } from 'react';
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

  const checkCheckboxDependencies = useCallback(() => {
    const hasStrongCarSurcharge = currentSelectedSurcharges.includes(SURCHARGES.STRONG_CAR_SURCHARGE);
    if (currentInsurance.vehiclePower > 100 && !hasStrongCarSurcharge) {
      dispatch(addSurcharge(SURCHARGES.STRONG_CAR_SURCHARGE));
    } else if (currentInsurance.vehiclePower <= 100 && hasStrongCarSurcharge) {
      dispatch(removeSurcharge(SURCHARGES.STRONG_CAR_SURCHARGE));
    }

    if (currentSelectedDiscounts.includes(DISCOUNTS.VIP_DISCOUNT) && currentInsurance.vehiclePower <= 80) {
      dispatch(removeDiscount(DISCOUNTS.VIP_DISCOUNT));
    }

    if (currentSelectedDiscounts.includes(DISCOUNTS.ADVISER_DISCOUNT) && currentSelectedCoverages.length < 2) {
      dispatch(removeDiscount(DISCOUNTS.ADVISER_DISCOUNT));
    }
  }, [dispatch, currentSelectedSurcharges, currentInsurance.vehiclePower, currentSelectedDiscounts, currentSelectedCoverages.length]);

  useEffect(() => {
    checkCheckboxDependencies();
  }, [checkCheckboxDependencies]);

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
      {DISCOUNT_CHECKBOX_LABELS.map((discount) => (
        <FormControlLabel
          key={discount.label}
          disabled={(discount.label === DISCOUNTS.ADVISER_DISCOUNT && currentSelectedCoverages.length < 2) || (discount.label === DISCOUNTS.VIP_DISCOUNT && currentInsurance.vehiclePower <= 80)}
          control={<Checkbox checked={selectedDiscounts.includes(discount.label)} onChange={() => handleDiscountToggle(discount.label)} />}
          label={discount.label}
          sx={{ mr: 5 }}
        />
      ))}
      {SURCHARGE_CHECKBOX_LABELS.map((surcharge) => (
        <FormControlLabel
          key={surcharge.label}
          disabled={surcharge.label === SURCHARGES.STRONG_CAR_SURCHARGE ? true : false}
          control={<Checkbox checked={selectedSurcharges.includes(surcharge.label)} onChange={() => handleSurchargeToggle(surcharge.label)} />}
          label={surcharge.label}
          sx={{ mr: 5 }}
        />
      ))}
      <Typography mt={0.8} fontSize={22}>
        Total price: <b>{currentInsurance.totalPrice >= 0 ? currentInsurance.totalPrice : 0}</b>
      </Typography>
    </Container>
  );
};

export default InsuranceDiscountList;
