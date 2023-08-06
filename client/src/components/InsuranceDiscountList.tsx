import { Container, Checkbox, FormControlLabel, Typography } from '@mui/material';

const InsuranceDiscountList = (): JSX.Element => {
  const checkboxItems = [{ label: 'Commercial discount' }, { label: 'Agent discount' }, { label: 'Summer discount' }, { label: 'Strong car surcharge' }];

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
      {checkboxItems.map((item) => (
        <FormControlLabel key={item.label} control={<Checkbox />} label={item.label} sx={{ mr: 5 }} />
      ))}
      <Typography mt={0.8} fontSize={22}>
        Total price: <b>42</b>
      </Typography>
    </Container>
  );
};

export default InsuranceDiscountList;
