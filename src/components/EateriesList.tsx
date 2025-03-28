import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SortIcon from '@mui/icons-material/Sort';
import EateryCard from './EateryCard';
import type { Eatery } from '../models/Eatery';

type Props = {
  eateries: Eatery[];
};

export default function EateriesList({ eateries }: Props) {
  const [sortedEateries, setSortedEateries] = useState<Eatery[]>([]);
  
  const [nameSort, setNameSort] = useState<'up' | 'down' | null>(null);
  const [neighborhoodSort, setNeighborhoodSort] = useState<'up' | 'down' | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const sortMenuOpen = Boolean(anchorEl);
  const handleSortMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleSortMenuClose = () => {
    setAnchorEl(null);
  };
  
  useEffect(() => setSortedEateries(eateries), [eateries]);
  
  const sortByName = () => {
    if (nameSort === null) {
      setSortedEateries([...eateries].sort((a, b) => a.name.localeCompare(b.name)));
      setNameSort('down');
      setNeighborhoodSort(null);
    } else if (nameSort === 'down') {
      setSortedEateries([...eateries].sort((a, b) => b.name.localeCompare(a.name)));
      setNameSort('up')
      setNeighborhoodSort(null);
    } else if (nameSort === 'up') {
      setSortedEateries([...eateries]);
      setNameSort(null)
    }
  }

  const sortByNeighborhood = () => {
    if (neighborhoodSort === null) {
      setSortedEateries([...eateries].sort((a, b) => a.neighborhood.localeCompare(b.neighborhood)));
      setNeighborhoodSort('down');
      setNameSort(null);
    } else if (neighborhoodSort === 'down') {
      setSortedEateries([...eateries].sort((a, b) => b.neighborhood.localeCompare(a.neighborhood)));
      setNeighborhoodSort('up');
      setNameSort(null);
    } else if (neighborhoodSort === 'up') {
      setSortedEateries([...eateries]);
      setNeighborhoodSort(null);
    }
  }

  return (
    <>
      <Box display={'flex'} justifyContent={'center'} gap={1}>
        {/* SORT MENU */}
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSortMenuClick}>
          <SortIcon />
        </Button>
        <Menu
          id="sort-menu"
          anchorEl={anchorEl}
          open={sortMenuOpen}
          onClose={handleSortMenuClose}
        >
          <MenuItem onClick={sortByName}>
            Name {nameSort === 'up' ? <ArrowDropDownIcon /> : (nameSort === 'down' ? <ArrowDropUpIcon /> : '')}
          </MenuItem>
          <MenuItem onClick={sortByNeighborhood}>
            Neighborhood {neighborhoodSort === 'up' ? <ArrowDropDownIcon /> : (neighborhoodSort === 'down' ? <ArrowDropUpIcon /> : '')}
          </MenuItem>
        </Menu>
      </Box>
      <Stack spacing={2}>
      {sortedEateries.map((eatery) => (
          <EateryCard key={eatery._id} eatery={eatery} />
        ))}
      </Stack>
    </>
  )
}