import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import EateriesTable from "./EateriesTable";
import EateriesList from "./EateriesList";
import type { Eatery, EateryWithId } from "../models/Eatery";

export default function Eateries() {
  const [eateries, setEateries] = useState<EateryWithId[]>([]);
  const isMobile = useMediaQuery('(max-width: 1000px)');
  
  useEffect(() => {
    fetch('/.netlify/functions/get-eateries')
      .then(res => res.json())
      .then((data: Eatery[]) => {
        const withIds = data.map(r => ({
          ...r,
          id: r._id.toString()
        }));
        
        const sortedAndFiltered = withIds
          .filter(r => r.isClosed === false)
          .sort((a, b) => a.name.localeCompare(b.name));
        
        setEateries(sortedAndFiltered);
      })
      .catch(err => console.error(err));
  }, []);
  
  // console.log('eateries', eateries)
  
  return (
    <>
      <h1>Vegan & vegan-friendly eateries in Portland.</h1>
      {isMobile ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          sx={{
            width: '100%',
            minHeight: '100vh',
            backgroundColor: theme => theme.palette.background.default,
            overflowX: 'hidden',
          }}
        gap={2}>
          <EateriesList eateries={eateries} />
        </Box>
      ) : (
        <EateriesTable eateries={eateries} />
      )}
    </>
  )
}
