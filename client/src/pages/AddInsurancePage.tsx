import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentInsurance } from '../store/slices/currentInsuranceSlice';
import InsuranceDiscountList from '../components/InsuranceDiscountList';
import CoveragesList from '../components/CoveragesList';
import UserForm from '../components/UserForm';
import { Container, Box, Grid } from '@mui/material';

const AddInsurancePage = (): JSX.Element => {
  const currentInsurance = useSelector(selectCurrentInsurance);
  const isExistingInsurance = currentInsurance._id;

  const breakpoint = 650;
  const [isSmallerScreen, setIsSmallerScreen] = useState<boolean>(window.innerWidth < breakpoint);

  const handleResize = () => {
    setIsSmallerScreen(window.innerWidth < breakpoint);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {isExistingInsurance && <InsuranceDiscountList />}
      {isSmallerScreen ? (
        <Grid container spacing={2} direction={isSmallerScreen ? 'column-reverse' : 'row'}>
          <Grid item xs={12} md={6}>
            <UserForm />
          </Grid>
          {isExistingInsurance && (
            <Grid item xs={12} md={6}>
              <CoveragesList isSmallerScreen={isSmallerScreen} />
            </Grid>
          )}
        </Grid>
      ) : (
        <Container
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: isSmallerScreen ? 'column-reverse' : 'row',
            maxWidth: '100%'
          }}
        >
          <Box>
            <UserForm />
          </Box>
          {isExistingInsurance && (
            <Box>
              <CoveragesList isSmallerScreen={isSmallerScreen} />
            </Box>
          )}
        </Container>
      )}
    </>
  );
};

export default AddInsurancePage;
