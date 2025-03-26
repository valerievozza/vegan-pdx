import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import Divider from '@mui/material/Divider';
import Home from './pages/Home';
import Footer from './components/Footer';
import './App.css'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
      <Divider
        sx={{
          margin: '1rem',
        }}
      />
      <Footer />
    </ThemeProvider>
  )
}

export default App;
