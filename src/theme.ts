import { Rajdhani } from '@next/font/google';
import { createTheme } from '@mui/material/styles';
import { red, grey } from '@mui/material/colors';

export const rajdhani = Rajdhani({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: grey.A700,
    },
    error: {
      main: red.A400,
    },
  },
  spacing: [0, 4, 8, 16, 32, 64],
  typography: {
    fontFamily: rajdhani.style.fontFamily,
  },
});
theme.spacing(2)
export default theme;
