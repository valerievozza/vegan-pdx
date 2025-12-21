# Vegan PDX

Vegan PDX is a React app for browsing vegan & vegan-friendly eateries in Portland, OR. It pulls a list of spots from MongoDB via a Netlify Function, filters out closed places, and displays results in a desktop table or mobile-friendly cards.

🌐 [Project Link](https://vegan-pdx.netlify.app/)

<!-- ## Screenshots

![Vegan PDX screenshot](ADD_SCREENSHOT_URL_HERE)

||||
|:---:|:---:|:---:|
| ![](ADD_URL_HERE) | ![](ADD_URL_HERE) | ![](ADD_URL_HERE) |
| ![](ADD_URL_HERE) | ![](ADD_URL_HERE) | ![](ADD_URL_HERE) | -->

## Tech Stack

**Client:** React, TypeScript, Vite, React Router, MUI (Material UI)

**Server:** Netlify Functions (TypeScript), MongoDB

**Dependencies:** @fontsource/roboto, @mui/icons-material, @mui/material, @mui/styled-engine-sc, @mui/x-data-grid, concurrently, cors, dotenv, express, mongodb, react, react-dom, react-router-dom, styled-components

## Features

- Fetches eateries from MongoDB via a Netlify Function (`/.netlify/functions/get-eateries`)
- Filters out closed spots (`isClosed === false`)
- Default sort: alphabetical by name
- Desktop view: DataGrid table with clickable website links
- Mobile view: card layout with chips (neighborhood, vegan menu type, food cart, brunch) + expandable details (recommended dishes + notes)
- Mobile sorting menu: sort by **Name** or **Neighborhood**
- Dark mode theme (MUI)

## Installation

Install with npm

```bash
npm install
```

Run locally (includes Netlify Functions):

```bash
npm run dev
```

(Optional) Run Vite only:

```bash
npm run vite
```

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file

### Database

`MONGODB_URI = <your MongoDB connection string>`

**Notes**
- The Netlify function connects to the `vegan-pdx` database and reads from the `eateries` collection.
- Each document should include fields like:
  - `name`, `link`, `menuType`, `neighborhood`, `isFoodCart`, `hasBrunch`, `cuisineType`, `favoriteDish`, `notes`, `isClosed`

## Optimizations

- Cached MongoDB database connection in the Netlify Function to reduce repeated connects.
- Responsive layout: DataGrid for desktop, cards for mobile.
- Client-side filtering and sorting to keep the default list clean and easy to scan.

**Planned Features & Improvements:**

- Add hours, map/directions, and reviews
- Add search + more filters (neighborhood, cuisine, brunch, carts, vegan vs vegan-friendly)
- Add a simple way to add/update eateries (admin UI or lightweight input flow)

## Other Examples of My Work

### Mailroom:
![Mailroom screenshot](https://user-images.githubusercontent.com/101529105/190074645-af766088-cf3d-4498-a887-2f661b650239.png)
https://github.com/valerievozza/mailroom

### Pocket:
![pocket](https://user-images.githubusercontent.com/101529105/195203986-95c3d4ef-54b7-40cf-bde7-a8708bb7f53a.png)
https://github.com/valerievozza/pocket

### Pictogram
![pictogram](https://user-images.githubusercontent.com/101529105/195203985-938d761f-2c6a-4bc7-9b08-1b32cc28b610.png)
https://github.com/valerievozza/pictogram
