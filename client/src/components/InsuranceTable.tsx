import { useSelector } from 'react-redux';
import { Insurance, selectInsurances } from '../store/slices/insurancesSlice';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Configuration } from '../store/slices/insurancesSlice';

const InsuranceTable = (): JSX.Element => {
  const insurances: Insurance[] = useSelector(selectInsurances);
  const rows = insurances.map((insurance) =>
    createData(
      insurance.name,
      insurance.birthdate,
      insurance.city,
      insurance.vehiclePower,
      insurance.voucher,
      insurance.priceMatch,
      insurance.discounts,
      insurance.surcharges,
      insurance.coverages,
      insurance.basePrice,
      insurance.totalPrice
    )
  );

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Birthdate</TableCell>
            <TableCell align="center">City</TableCell>
            <TableCell align="center">Vehicle power</TableCell>
            <TableCell align="center">Voucher</TableCell>
            <TableCell align="center">Price match</TableCell>
            <TableCell align="center">Discounts</TableCell>
            <TableCell align="center">Surcharges</TableCell>
            <TableCell align="center">Coverages</TableCell>
            <TableCell align="center">Base price</TableCell>
            <TableCell align="center">Total price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row" align="center">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.birthdate.slice(0, 10)}</TableCell>
              <TableCell align="center">{row.city}</TableCell>
              <TableCell align="center">{row.vehiclePower}</TableCell>
              <TableCell align="center">{row.voucher ? row.voucher : '-'}</TableCell>
              <TableCell align="center">{row.priceMatch ? row.priceMatch : '-'}</TableCell>
              <TableCell align="center">{row.discountNames.length ? row.discountNames : '-'}</TableCell>
              <TableCell align="center">{row.surchargeNames.length ? row.surchargeNames : '-'}</TableCell>
              <TableCell align="center">{row.coverageNames.length ? row.coverageNames : '-'}</TableCell>
              <TableCell align="center">{row.basePrice}</TableCell>
              <TableCell align="center">{row.totalPrice}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

function createData(
  name: string,
  birthdate: string,
  city: string,
  vehiclePower: number,
  voucher: number | null,
  priceMatch: number | null,
  discounts: Configuration[],
  surcharges: Configuration[],
  coverages: Configuration[],
  basePrice: number,
  totalPrice: number
) {
  const discountNames = discounts.map((discount) => discount.name).join(', ');
  const surchargeNames = surcharges.map((surcharge) => surcharge.name).join(', ');
  const coverageNames = coverages.map((coverage) => coverage.name).join(', ');
  return { name, birthdate, city, vehiclePower, voucher, priceMatch, discountNames, surchargeNames, coverageNames, basePrice, totalPrice };
}

export default InsuranceTable;
