import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: React.CSSProperties['color'];
    };
  }

  interface ThemeOptions {
    status: {
      danger: React.CSSProperties['color'];
    };
  }

  interface Palette {
    neutral: Palette['primary'];
  }

  interface PaletteOptions {
    neutral?: PaletteOptions['primary'];
  }

  interface PaletteColor {
    darker?: string;
  }

  interface SimplePaletteColorOptions {
    darker?: string;
  }
}

export const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#1890FF',
    },
    secondary: {
      main: 'rgba(0, 0, 0, 0.85)',
      contrastText: '#fff',
    },
    success: {
      main: '#52C41A',
    },
    error: {
      main: '#F5222D',
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
});
