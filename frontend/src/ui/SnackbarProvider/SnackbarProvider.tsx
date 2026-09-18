// components/SnackbarProvider.tsx
import { Snackbar, Alert } from "@mui/material";
import { useSnackbarStore } from "../../store/snackbarStore";

export function SnackbarProvider() {
  const { open, message, severity, closeSnackbar } = useSnackbarStore();

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={closeSnackbar}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert
        onClose={closeSnackbar}
        severity={severity}
        variant="filled"
        sx={{
          ...(severity === "success" && {
            backgroundColor: "var(--head-background-color)", // твій колір success
            color: "#fff",
          }),
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
