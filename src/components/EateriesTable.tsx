import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import type { EateryWithId } from '../models/Eatery';

type Props = {
  eateries: EateryWithId[];
};

export default function EateriesTable({ eateries }: Props) {
  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Eatery',
      flex: 1,
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
    {
      field: 'menuType',
      headerName: 'Vegan?',
      flex: 1,
    },
    {
      field: 'neighborhood',
      headerName: 'Where?',
      flex: 1,
    },
    {
      field: 'isFoodCart',
      headerName: 'Cart?',
      flex: 1,
      valueGetter: (params: { row: EateryWithId }) => (params.row?.isFoodCart ? 'Yes' : 'No'),
    },
    {
      field: 'hasBrunch',
      headerName: 'Brunch?',
      flex: 1,
      valueGetter: (params: { row: EateryWithId }) => (params.row?.hasBrunch ? 'Yes' : 'No')
    },
    {
      field: 'cuisineType',
      headerName: 'Cuisine',
      flex: 1,
    },
    {
      field: 'favoriteDish',
      headerName: 'Favorites',
      flex: 1,
    },
    {
      field: 'notes',
      headerName: 'Notes',
      flex: 1,
    },
  ]

  return (
    <Paper sx={{ width: '100%' }}>
      <DataGrid
        rows={eateries}
        columns={columns}
      />
    </Paper>
  )
}