import { createTheme } from "@mui/material/styles";
import { GlobalStyles } from "@mui/system";

const theme = createTheme({
  typography: {
    fontFamily: "'Raleway', 'Inter', sans-serif", // Set Raleway as the primary with Inter fallback
  },
  components: {
    MuiAutocomplete: {
      styleOverrides: {
        option: {
          fontSize: "14px",
          padding: "4px 8px",
          color: "#161616",
        },
      },
    },
  },
});

// Global styles should be placed outside of the theme
export const globalStyles = (
  <GlobalStyles
    styles={{
      "::-webkit-scrollbar": {
        width: "2px",
        height: "2px",
      },
      "::-webkit-scrollbar-thumb": {
        background: "#797971",
        borderRadius: "24px",
      },
      "::-webkit-scrollbar-track": {
        backgroundColor: "#f5f5f5",
        borderRadius: "inherit",
        margin: "5px", // Optional: Adjust to avoid overlap at the edges
      },
      "*": {
        boxSizing: "border-box", // Ensures padding and borders are included in element dimensions
      },
    }}
  />
);

export default theme;
