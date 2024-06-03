import { CssBaseline, ThemeProvider } from "@mui/material";
import { useParams, useRoutes } from "react-router-dom";
import Router from "./routes/Router";

import { baselightTheme } from "./theme/DefaultColors";
import { Toaster } from "react-hot-toast";
import React from "react";
import { useQuery } from "@tanstack/react-query";

function App() {
  const routing = useRoutes(Router);
  const theme = baselightTheme;
  const url = process.env.REACT_APP_BASE_URL;

  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      try {
        const res = await fetch(`${url}/users/all`);
        const data = await res.json();

        if (data.error) return null;
        if (!res.status === 200) {
          throw new Error(data.error || "Something went wrong");
        }
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    retry: false,
  });

  const { data: tickets } = useQuery({
    queryKey: ["tickets"],
    queryFn: async () => {
      try {
        const res = await fetch(`${url}/ticket/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });
        const data = await res.json();

        if (data.error) return null;
        if (!res.status === 200) {
          throw new Error(data.error || "Something went wrong");
        }
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    retry: false,
  });

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
