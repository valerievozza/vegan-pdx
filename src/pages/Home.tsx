import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>Vegan & vegan-friendly restaurants in Portland.</h1>
      <Button
        component={Link}
        to="/restaurants"
        variant="contained"
        color="primary"
      >
        Go
      </Button>
    </div>
  )
}