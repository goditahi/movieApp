import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "dark",   // Set the initial color mode to dark
  useSystemColorMode: false,  // Disable system color mode
};

const styles = {
  global: {
    body: {
      bg: "black",  // Set background color to black
      color: "white",  // Set text color to white
       fontFamily: "Roboto, sans-serif"
    },
    "*": {
      color: "white",  // Ensure all text is white by default
    },
  },
};

const theme = extendTheme({ config, styles });

export default theme;
