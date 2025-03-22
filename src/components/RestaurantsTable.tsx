import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function RestaurantsTable() {
  type Restaurant = {
    _id: string;
    name: string;
    cuisineType?: string;
    favoriteDish?: string;
    hasBrunch?: boolean;
    haveVisited?: boolean;
    isFoodCart?: boolean;
    menuType?: string;
    neighborhood?: string;
    notes?: string;
    link?: string;
  };
    
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  
  useEffect(() => {
    fetch('http://localhost:5000/api/restaurants')
      .then(res => res.json())
      .then((data: Restaurant[]) => {
        setRestaurants(data);
      })
      .catch(err => console.error(err));
  }, []);
  
  console.log('restaurants', restaurants)

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 650 }}
        aria-label="restaurants table"
      >
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Brunch?</TableCell>
            <TableCell align="right">Food Cart?</TableCell>
            <TableCell align="right">Vegan?</TableCell>
            <TableCell align="right">Notes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {restaurants.map((restaurant) => (
            <TableRow
              key={restaurant.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                  {restaurant.name}
              </TableCell>
              <TableCell>{restaurant.hasBrunch ? 'Yes' : 'No'}</TableCell>
              <TableCell>{restaurant.isFoodCart ? 'Yes' : 'No' }</TableCell>
              <TableCell>{restaurant.menuType}</TableCell>
              <TableCell>{restaurant.notes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}