import { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import type { GridValueGetter } from '@mui/x-data-grid';

export default function RestaurantsTable() {
  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Restaurant',

      renderCell: (params) => {
        const link = params.row?.link;
        const name = params.row?.name;
        return link ? (
          <a href={link} target="_blank" rel="noopener noreferrer">
            {name}
          </a>
        ) : (
          name
        );
      },
    },    
    { field: 'menuType', headerName: 'Vegan?' },
    { field: 'neighborhood', headerName: 'Where?' },
    {
      field: 'isFoodCart',
      headerName: 'Cart?',
      valueGetter: (params: GridValueGetter) => (params.row?.isFoodCart ? 'Yes' : 'No'),
    },
    {
      field: 'hasBrunch',
      headerName: 'Brunch?',
      valueGetter: (params: GridValueGetter) => (params.row?.hasBrunch ? 'Yes' : 'No')
    },
    { field: 'cuisineType', headerName: 'Cuisine'},
    { field: 'favoriteDish', headerName: 'Favorite '},
    { field: 'notes', headerName: 'Notes '},
  ]

  type Restaurant = {
    _id: string;
    name: string;
    cuisineType?: string;
    favoriteDish?: string;
    hasBrunch?: boolean;
    haveVisited?: boolean;
    isFoodCart?: boolean;
    isClosed?: boolean;
    menuType?: string;
    neighborhood?: string;
    notes?: string;
    link?: string;
  };
    
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  
  useEffect(() => {
    fetch('/.netlify/functions/get-restaurants')
      .then(res => res.json())
      .then((data: Restaurant[]) => {
        const widthIds = data.map(r => ({ ...r, id: r._id }));
        
        const sortedAndFiltered = widthIds
          .filter(r => r.isClosed === false)
          .sort((a, b) => a.name.localeCompare(b.name));
        
        setRestaurants(sortedAndFiltered);
      })
      .catch(err => console.error(err));
  }, []);
  
  console.log('restaurants', restaurants)

  return (
    <Paper sx={{ width: '100%' }}>
      <DataGrid
        rows={restaurants}
        columns={columns}
      />
    </Paper>
  )
}