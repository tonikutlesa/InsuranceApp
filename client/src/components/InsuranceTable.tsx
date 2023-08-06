import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function createData(
  name: string,
  birthdate: Date,
  city: string,
  vehiclePower: number,
  voucher: number,
  priceMatch: number | null,
  discounts: string[],
  surcharges: string[],
  coverages: string[],
  basePrice: number,
  totalPrice: number
) {
  return { name, birthdate, city, vehiclePower, voucher, priceMatch, discounts, surcharges, coverages, basePrice, totalPrice };
}

const rows = [createData('Toni Kutlesa', new Date(), 'Split', 60, 20, null, ['VIP discount,', 'Commercial discount'], [], [], 400, 700)];

export default function InsuranceTable() {
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
              <TableCell align="center">{row.birthdate.toISOString()}</TableCell>
              <TableCell align="center">{row.city}</TableCell>
              <TableCell align="center">{row.vehiclePower}</TableCell>
              <TableCell align="center">{row.voucher ? row.voucher : '-'}</TableCell>
              <TableCell align="center">{row.priceMatch ? row.priceMatch : '-'}</TableCell>
              <TableCell align="center">{row.discounts.length ? row.discounts : '-'}</TableCell>
              <TableCell align="center">{row.surcharges.length ? row.surcharges : '-'}</TableCell>
              <TableCell align="center">{row.coverages.length ? row.coverages : '-'}</TableCell>
              <TableCell align="center">{row.basePrice}</TableCell>
              <TableCell align="center">{row.totalPrice}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
