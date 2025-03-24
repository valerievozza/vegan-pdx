import { Stack } from '@mui/material';
import EateryCard from './EateryCard';
import type { Eatery } from '../models/Eatery';

type Props = {
  eateries: Eatery[];
};

export default function EateriesList({ eateries }: Props) {
  return (
    <Stack spacing={2}>
      {eateries.map((eatery) => (
        <EateryCard key={eatery._id} eatery={eatery} />
      ))}
    </Stack>
  )
}