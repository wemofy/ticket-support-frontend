import { CssBaseline, ThemeProvider } from "@mui/material";
import { useRoutes } from "react-router-dom";
import Router from "./routes/Router";

import { baselightTheme } from "./theme/DefaultColors";
import { useEffect } from "react";
import { UseTicketContext } from "./context/TicketContext";
import { Toaster } from "react-hot-toast";

function App() {
  const routing = useRoutes(Router);
  const theme = baselightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {routing}
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
      ;
    </ThemeProvider>
  );
}

export default App;
