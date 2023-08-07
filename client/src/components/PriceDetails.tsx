import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectCurrentInsurance } from '../store/slices/currentInsuranceSlice';
import { Configuration } from '../store/slices/insurancesSlice';

function isConfiguration(obj: Configuration | string): obj is Configuration {
  return Boolean(obj && typeof obj === 'object' && 'name' in obj && 'amount' in obj);
}

const PriceList = (): JSX.Element => {
  const currentInsurance = useSelector(selectCurrentInsurance);

  return (
    <Box sx={{ mt: 5 }}>
      <Typography>
        <b>Base price:</b> {currentInsurance.basePrice}€
      </Typography>
      {currentInsurance.discounts.length > 0 && (
        <Typography sx={{ mt: 2 }}>
          <b>Discounts:</b> {currentInsurance.discounts.map((discount) => (isConfiguration(discount) ? `${discount.name} (${parseFloat(discount.amount.toFixed(2))}€)` : null)).join(', ')}
        </Typography>
      )}
      {currentInsurance.surcharges.length > 0 && (
        <Typography sx={{ mt: 2 }}>
          <b>Surcharges:</b> {currentInsurance.surcharges.map((surcharge) => (isConfiguration(surcharge) ? `${surcharge.name} (${parseFloat(surcharge.amount.toFixed(2))}€)` : null)).join(', ')}
        </Typography>
      )}
      {currentInsurance.coverages.length > 0 && (
        <Typography sx={{ mt: 2 }}>
          <b>Coverages:</b> {currentInsurance.coverages.map((coverage) => (isConfiguration(coverage) ? `${coverage.name} (${parseFloat(coverage.amount.toFixed(2))}€)` : null)).join(', ')}
        </Typography>
      )}
      <Typography sx={{ mt: 2 }}>
        <b>Total price:</b> {currentInsurance.totalPrice}€
      </Typography>
    </Box>
  );
};

export default PriceList;
