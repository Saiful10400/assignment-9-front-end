import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import store from "./Redux/Store.ts";
import { RouterProvider } from "react-router-dom";
import routes from "./Routes/Routes.tsx";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import theme from "./Them.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./Components/Ui/Loading.tsx";
import {NextUIProvider} from '@nextui-org/react'
createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NextUIProvider>
      <RouterProvider router={routes} />
      <Loading/>
      </NextUIProvider>
      <ToastContainer />
    </ThemeProvider>
  </Provider>
);
