import { Container, Checkbox, FormControlLabel, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { COVERAGE_CHECKBOX_LABELS } from '../constants';
import { addCoverage, removeCoverage, selectCurrentSelectedCoverages } from '../store/slices/currentInsuranceSlice';

type CoveragesListProps = {
  isSmallerScreen: boolean;
};

const CoveragesList: React.FC<CoveragesListProps> = ({ isSmallerScreen }): JSX.Element => {
  const dispatch = useDispatch();
  const currentSelectedCoverages = useSelector(selectCurrentSelectedCoverages);
  const selectedCoverages = currentSelectedCoverages.map((coverage) => coverage);

  const handleCoverageToggle = (label: string) => {
    selectedCoverages.includes(label) ? dispatch(removeCoverage(label)) : dispatch(addCoverage(label));
  };

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
      {COVERAGE_CHECKBOX_LABELS.map((coverage) => (
        <FormControlLabel
          key={coverage.label}
          control={<Checkbox checked={selectedCoverages.includes(coverage.label)} onChange={() => handleCoverageToggle(coverage.label)} />}
          label={coverage.label}
          sx={{ mr: 5 }}
        />
      ))}
    </Container>
  );
};

export default CoveragesList;
