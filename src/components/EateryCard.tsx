import { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Stack from '@mui/material/Stack';

import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import BrunchDiningIcon from '@mui/icons-material/BrunchDining';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import RestaurantIcon from '@mui/icons-material/Restaurant';
// import AccessTimeIcon from '@mui/icons-material/AccessTime';

import { Eatery } from '../models/Eatery';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: 'rotate(0deg)',
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: 'rotate(180deg)',
      },
    },
  ]
}));

type Props = {
  eatery: Eatery;
}

export default function EateryCard({ eatery }: Props) {
  const [expanded, setExpanded] = useState(false);
  const theme = useTheme();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
    
  return (
    <Card sx={{ maxWidth: 500 }}>
      {/* TODO: include hours, map, reviews, etc. */}
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: theme.palette.secondary.main }}
            aria-label="eatery"
          >
            {eatery.name[0]}
          </Avatar>
        }
        action={
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        }        
        align="left"
        title={eatery.link ? <a href={eatery.link}>{eatery.name}</a> : eatery.name}
        subheader={eatery.cuisineType}
      />
      <CardContent>
        <Stack
          display="flex"
          flexWrap="wrap"
          direction="row"
          useFlexGap={true}
          spacing={1}
          sx={{ mt: 2 }}
        >
          {eatery.neighborhood &&
            <Chip
              label={eatery.neighborhood}
              icon={<LocationOnIcon />}
              size="small"
            />}
          <Chip
            label={eatery.menuType}
            icon={<RestaurantIcon />}
            size="small"
          />
          {eatery.isFoodCart &&
            <Chip
              label="Food Truck"
              icon={<AirportShuttleIcon />}
              size="small"
            />}
          {eatery.hasBrunch &&
            <Chip
              label="Brunch"
              icon={<BrunchDiningIcon />}
              size="small"
            />}
        </Stack>
      </CardContent>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <List dense={true}>
            {/* {eatery.hours &&
              <ListItem>
                <ListItemIcon>
                  <AccessTimeIcon />
                </ListItemIcon>
                <ListItemText primary="Hours" secondary="Hours here!" />
              </ListItem>} */}
            {eatery.favoriteDish &&
              <ListItem>
                <ListItemIcon>
                  <FavoriteIcon />
                </ListItemIcon>
                <ListItemText primary="Recommended Dishes" secondary={eatery.favoriteDish} />
              </ListItem>}
            {eatery.notes &&
              <ListItem>
                <ListItemIcon>
                  <InfoIcon />
                </ListItemIcon>
                <ListItemText primary="More Info" secondary={eatery.notes} />
              </ListItem>
            }
          </List>
          {!eatery.favoriteDish && !eatery.notes &&
          <a href={eatery.link} target="_blank" rel="noopener noreferrer">
            {eatery.link}
          </a>}
        </CardContent>
      </Collapse>
    </Card>
  )
}