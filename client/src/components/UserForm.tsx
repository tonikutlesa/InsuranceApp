import { useState } from 'react';
import { resetCurrentInsurance, selectCurrentInsurance } from '../store/slices/currentInsuranceSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Container, Box, Grid, TextField, Typography, InputAdornment, Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { setCurrentInsuranceStateOnCreate, updateCurrentInsuranceState } from '../api';
import { selectCurrentSelectedDiscounts, selectCurrentSelectedSurcharges, selectCurrentSelectedCoverages } from '../store/slices/currentInsuranceSlice';
import PriceList from './PriceDetails';

interface StyledInputWithLabel {
  label: string;
  name: string;
  type?: string;
  isPriceField?: boolean;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  error: string | false | undefined;
}

const StyledInputWithLabel: React.FC<StyledInputWithLabel> = ({ label, name, type = 'text', isPriceField, value, onChange, onBlur, error }): JSX.Element => (
  <Grid item xs={12} display="flex" flexDirection="row" mb={1}>
    <Typography width={120} mt={1}>
      {label}:
    </Typography>
    <TextField
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      sx={{ width: 180 }}
      name={name}
      type={type}
      size="small"
      error={!!error}
      helperText={error}
      InputProps={{
        endAdornment: isPriceField ? <InputAdornment position="end">EUR</InputAdornment> : null
      }}
    />
  </Grid>
);

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  birthdate: yup.date().required('Birthdate is required'),
  city: yup.string().required('City is required'),
  vehiclePower: yup
    .number()
    .required('Vehicle power is required')
    .test('min', 'Vehicle power cannot be 0', (value) => value >= 1),
  voucher: yup.number(),
  priceMatch: yup.number()
});

const UserForm = (): JSX.Element => {
  const dispatch = useDispatch();
  const currentInsurance = useSelector(selectCurrentInsurance);
  const currentSelectedDiscounts = useSelector(selectCurrentSelectedDiscounts);
  const currentSelectedSurcharges = useSelector(selectCurrentSelectedSurcharges);
  const currentSelectedCoverages = useSelector(selectCurrentSelectedCoverages);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isExistingInsurance = currentInsurance._id;

  const handleAddNewInsuranceButtonClick = () => {
    dispatch(resetCurrentInsurance());
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      name: currentInsurance.name,
      birthdate: currentInsurance.birthdate?.slice(0, 10),
      city: currentInsurance.city,
      vehiclePower: currentInsurance.vehiclePower,
      voucher: currentInsurance.voucher || '',
      priceMatch: currentInsurance.priceMatch || ''
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);

      if (currentInsurance._id) {
        updateCurrentInsuranceState(dispatch, {
          _id: currentInsurance._id,
          name: values.name,
          birthdate: values.birthdate,
          city: values.city,
          vehiclePower: values.vehiclePower,
          voucher: values.voucher ? Number(values.voucher) : null,
          priceMatch: values.priceMatch ? Number(values.priceMatch) : null,
          discounts: currentSelectedDiscounts,
          surcharges: currentSelectedSurcharges,
          coverages: currentSelectedCoverages
        });
      } else {
        await setCurrentInsuranceStateOnCreate(dispatch, {
          name: values.name,
          birthdate: values.birthdate,
          city: values.city,
          vehiclePower: values.vehiclePower,
          voucher: values.voucher ? Number(values.voucher) : null,
          priceMatch: values.priceMatch ? Number(values.priceMatch) : null,
          discounts: [],
          surcharges: [],
          coverages: []
        });
      }
      setIsLoading(false);
    }
  });

  return (
    <Container sx={{ mt: 3 }}>
      <Typography mb={3} fontSize={26}>
        <b>User data</b>
      </Typography>
      <Box component="form" autoComplete="off">
        <Grid container>
          <StyledInputWithLabel label="Name" name="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.name && formik.errors.name} />
          <StyledInputWithLabel
            label="Birthdate"
            name="birthdate"
            type="date"
            value={formik.values.birthdate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.birthdate && formik.errors.birthdate}
          />
          <StyledInputWithLabel label="City" name="city" value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.city && formik.errors.city} />
          <StyledInputWithLabel
            label="Vehicle Power"
            name="vehiclePower"
            type="number"
            value={formik.values.vehiclePower}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.vehiclePower && formik.errors.vehiclePower}
          />
          <StyledInputWithLabel
            label="Voucher"
            name="voucher"
            type="number"
            isPriceField
            value={formik.values.voucher}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.voucher && formik.errors.voucher}
          />
          <StyledInputWithLabel
            label="Price match"
            name="priceMatch"
            type="number"
            isPriceField
            value={formik.values.priceMatch}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.priceMatch && formik.errors.priceMatch}
          />
        </Grid>
        <LoadingButton
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            formik.handleSubmit();
          }}
          disabled={Object.keys(formik.touched).length === 0 || Object.keys(formik.errors).length > 0}
          variant="contained"
          loading={isLoading}
          sx={{ marginLeft: '120px' }}
        >
          Save
        </LoadingButton>
      </Box>
      {isExistingInsurance && (
        <>
          <PriceList />
          <Button variant="outlined" onClick={handleAddNewInsuranceButtonClick} sx={{ marginTop: 4 }}>
            Add new insurance
          </Button>
        </>
      )}
    </Container>
  );
};

export default UserForm;
