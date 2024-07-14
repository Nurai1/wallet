import { createContext, useState } from 'react';

export const ThemeContext = createContext({
  colors: {
    primary: {
      0: '#F9FAFF',
      50: '#FAF7FC',
      100: '#F5EFF8',
      200: '#EBDDF1',
      300: '#DCC2E5',
      400: '#C79DD5',
      500: '#AD76BF',
      600: '#8A539A',
      700: '#794685',
      800: '#643B6D',
      900: '#5B3167',
      950: '#34143E',
    },
    secondary: {
      50: 'FFF8EB',
      100: '#FEECC7',
      200: '#FDD78A',
      300: '#FCB63C',
      400: '#FBA324',
      500: '#F5800B',
      600: '#D95C06',
      700: '#B43D09',
      800: '#922F0E',
      900: '#78270F',
      950: '#451103',
    },
    neutral: {
      0: '#ffffff',
      50: '#FAFAFF',
      100: '#F2F6FC',
      200: '#E1E7F1',
      300: '#C3CEDE',
      400: '#99AAC1',
      500: '#8091B1',
      600: '#6E7CA2',
      700: '#626D93',
      800: '#535B7A',
      900: '#464C62',
      950: '#2D303E',
    },
    error: {
      50: '#FFF1F3',
      100: '#FFE4E6',
      200: '#FECDD3',
      500: '#F43F5E',
      600: '#E11D48',
      700: '#BE123C',
    },
    success: {
      50: '#F0FDF5',
      100: '#DCFCE7',
      200: '#BBF7D0',
      500: '#22C55E',
      600: '#16A34A',
      700: '#15803D',
    },
    warning: {
      50: '#FEFAE8',
      100: '#FEF9C3',
      200: '#FEF08A',
      500: '#FACC15',
      600: '#F59E0B',
      700: '#B45309',
    },
    info: {
      50: '#EFF5FF',
      100: '#DBEAFE',
      200: '#BFDBFE',
      500: '#3B82F6',
      600: '#2563EB',
      700: '#4338CA',
    },
  },
  p: {
    4: '16px',
    8: '32px',
  },
});

// export const ThemeProvider = ({ children }) => {
//   const state = useState();

//   return (
//     <ThemeContext.Provider value={{ theme: state[0], setTheme: state[1] }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };
