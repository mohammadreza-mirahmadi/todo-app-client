import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { requestPasswordReset } from "../../../api/authApi";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const inputStyles = {
  height: { xs: 34, md: 42 },
  bgcolor: "background.paper",
  "& .MuiOutlinedInput-notchedOutline": { borderColor: "primary.main" },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "primary.main",
    borderWidth: 2,
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderWidth: 2 },
};

// ایمیل را میگیرد و یک پسورد موقت به ایمیل کاربر میفرستد
function ForgotPasswordDialog({ forgotPasswordOpen, onClose }) {
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const { control, handleSubmit, reset } = useForm({
    defaultValues: { email: "" },
  });

  const handleClose = () => {
    reset();
    setStatus("idle");
    setErrorMsg("");
    onClose();
  };

  const onSubmit = async (data) => {
    setStatus("loading");
    setErrorMsg("");
    try {
      await requestPasswordReset(data.email);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err.response?.data?.message || "Failed to send reset email. Try again.",
      );
    }
  };

  return (
    <Dialog
      open={forgotPasswordOpen}
      onClose={handleClose}
      fullWidth
      maxWidth="xs"
      slotProps={{ paper: { sx: { bgcolor: "background.paper" } } }}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        Forgot Password
        <IconButton
          onClick={handleClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        {/* نمایش پیام موفقیت */}
        {status === "success" ? (
          <Box sx={{ textAlign: "center", py: 2 }}>
            <Typography variant="h6" color="primary.main" sx={{ mb: 1 }}>
              Email Sent!
            </Typography>
            <Typography variant="body1" color="text.secondary">
              A temporary password has been sent to your email address. Please
              check your inbox and use it to log in.
            </Typography>
            <Button
              variant="contained"
              fullWidth
              onClick={handleClose}
              sx={{ mt: 3 }}
            >
              Back to Login
            </Button>
          </Box>
        ) : (
          <>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Enter your email address and we'll send you a temporary password.
            </Typography>

            {status === "error" && (
              <Box
                sx={{
                  bgcolor: "error.light",
                  color: "error.dark",
                  borderRadius: "4px",
                  px: 2,
                  py: 1,
                  mb: 2,
                }}
              >
                <Typography variant="body2">{errorMsg}</Typography>
              </Box>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: { value: true, message: "Email is required." },
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address.",
                  },
                }}
                render={({ field, fieldState }) => (
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <FormLabel
                      sx={{
                        fontSize: "0.9rem",
                        color: "text.primary",
                        mb: 0.5,
                      }}
                    >
                      Email Address
                    </FormLabel>
                    <TextField
                      {...field}
                      type="email"
                      error={!!fieldState.error}
                      placeholder="Enter your email"
                      slotProps={{ input: { sx: inputStyles } }}
                    />
                    {fieldState.error && (
                      <FormHelperText error sx={{ fontWeight: "bold" }}>
                        {fieldState.error.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={status === "loading"}
                sx={{ mt: 1 }}
              >
                {status === "loading"
                  ? "Sending..."
                  : "Send Temporary Password"}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default ForgotPasswordDialog;
