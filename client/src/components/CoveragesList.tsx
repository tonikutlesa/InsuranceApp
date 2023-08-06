import { Container, Checkbox, FormControlLabel, Typography } from '@mui/material';

type CoveragesListProps = {
  isSmallerScreen: boolean;
};

const CoveragesList: React.FC<CoveragesListProps> = ({ isSmallerScreen }): JSX.Element => {
  console.log(isSmallerScreen);
  const checkboxItems = [{ label: 'Bonus protection' }, { label: 'AO+' }, { label: 'Glass coverage' }];

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'lightgray',
        ml: isSmallerScreen ? 0 : 3,
        minWidth: 220
      }}
    >
      <Typography fontSize={26} mt={4}>
        <b>Coverages</b>
      </Typography>
      {checkboxItems.map((item) => (
        <FormControlLabel key={item.label} control={<Checkbox />} label={item.label} sx={{ mr: 5 }} />
      ))}
    </Container>
  );
};

export default CoveragesList;
