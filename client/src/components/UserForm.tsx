import { useState } from 'react';
import { Container, Box, Grid, TextField, Typography, InputAdornment } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

interface StyledInputWithLabel {
  label: string;
  name: string;
  type?: string;
  isPriceField?: boolean;
}

const StyledInputWithLabel: React.FC<StyledInputWithLabel> = ({ label, name, type = 'text', isPriceField }): JSX.Element => (
  <Grid item xs={12} display="flex" flexDirection="row" mb={1}>
    <Typography width={120} mt={1}>
      {label}:
    </Typography>
    <TextField
      sx={{ width: 180 }}
      name={name}
      type={type}
      size="small"
      InputProps={{
        endAdornment: isPriceField ? <InputAdornment position="end">EUR</InputAdornment> : null
      }}
    />
  </Grid>
);

const UserForm = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <Container sx={{ mt: 3 }}>
      <Typography mb={3} fontSize={26}>
        <b>User data</b>
      </Typography>
      <Box component="form" noValidate autoComplete="off">
        <Grid container>
          <StyledInputWithLabel label="Name" name="name" />
          <StyledInputWithLabel label="Birthdate" name="birthdate" type="date" />
          <StyledInputWithLabel label="City" name="city" />
          <StyledInputWithLabel label="Vehicle Power" name="vehiclePower" type="number" />
          <StyledInputWithLabel label="Voucher" name="voucher" type="number" isPriceField />
          <StyledInputWithLabel label="Price match" name="priceMatch" type="number" isPriceField />
        </Grid>
      </Box>
      <LoadingButton variant="outlined" loading={isLoading}>
        Save
      </LoadingButton>
    </Container>
  );
};

export default UserForm;
