import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Vazirmatn, Arial",
    allVariants: {
      fontFamily: "Vazirmatn, Arial",
    },
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontFamily: "Vazirmatn, Arial",
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          fontFamily: "Vazirmatn, Arial",
        },
      },
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          fontFamily: "Vazirmatn, Arial",
        },
      },
    },
  },
});

export default theme;
