import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import EateryCard from './EateryCard';
import type { Eatery } from '../models/Eatery';

type Props = {
  eateries: Eatery[];
};

export default function EateriesList({ eateries }: Props) {
  return (
    <>
      <Stack spacing={2}>
        {eateries.map((eatery) => (
          <EateryCard key={eatery._id} eatery={eatery} />
        ))}
      </Stack>
      {!eateries.length &&
        <Backdrop
          open={!eateries.length}
          sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      }
    </>
  )
}