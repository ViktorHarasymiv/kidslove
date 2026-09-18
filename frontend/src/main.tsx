import { createRoot } from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "./ui/SnackbarProvider/SnackbarProvider.tsx";
import { ModalPortal } from "./ui/ModalPortal/ModalPortal.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ModalPortal />
      <SnackbarProvider />
      <App />
    </BrowserRouter>
  </QueryClientProvider>,
);
