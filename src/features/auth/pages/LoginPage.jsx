import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginThunk } from "../authThunks";
import { selectAuthError, selectAuthStatus } from "../authSelectors";
import { resetAuthState } from "../authSlice";
import ForgotPasswordDialog from "../components/ForgotPasswordDialog";
import { useTheme } from "@mui/system";
// =================================================================================

// ── Login Page ────────────────────────────────────────────────────────────────────
function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector(selectAuthStatus);
  const error = useSelector(selectAuthError);

  const [showPassword, setShowPassword] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);

  const { control, handleSubmit } = useForm({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data) => {
    const result = await dispatch(loginThunk(data));
    console.log("result:", result); // ← اضافه کن
    console.log("error state:", error);

    // اگر محتوای ریزالت با loginThunk.fulfilled مطابقت داشت یعنی لاگین موفق بوده و به صفحه اصلی هدایت میشیم
    if (loginThunk.fulfilled.match(result)) {
      navigate("/");
    }
  };

  const theme = useTheme();
  const paperColor = theme.palette.background.paper;
  const textColor = theme.palette.text.primary;

  const inputStyles = {
    height: { xs: 34, md: 40 },
    bgcolor: "background.paper",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "primary.main",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "primary.main",
      borderWidth: 2,
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderWidth: 2 },
    "& input:-webkit-autofill": {
      WebkitBoxShadow: `0 0 0 1000px ${paperColor} inset`,
      WebkitTextFillColor: `${textColor}`,
    },
    "& input:-webkit-autofill:focus": {
      WebkitBoxShadow: `0 0 0 1000px ${paperColor} inset`,
    },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "420px",
          bgcolor: "background.paper",
          borderRadius: "8px",
          p: 4,
          boxShadow: "rgba(0,0,0,0.08) 0px 4px 24px",
          mx: 2,
        }}
      >
        {/* Header */}
        <Typography
          variant="h2"
          component="h1"
          color="text.primary"
          align="center"
          sx={{ mb: 0.5 }}
        >
          TO-DO LIST
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          align="center"
          sx={{ mb: { xs: 2, md: 4 } }}
        >
          Sign in to your account
        </Typography>

        {/* Error section */}
        {error && (
          <Box
            sx={{
              bgcolor: "error.light",
              color: "error.dark",
              borderRadius: "4px",
              px: 2,
              py: 1,
              mb: 3,
            }}
          >
            <Typography variant="body1">
              {error.message || "Login failed."}
            </Typography>
          </Box>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <Controller
            name="email"
            control={control}
            rules={{
              required: { value: true, message: "Email is required." },
              minLength: { value: 3, message: "Use at least 3 characters." },
            }}
            render={({ field, fieldState }) => (
              <FormControl fullWidth sx={{ mb: { xs: 1.5, md: 2.5 } }}>
                <FormLabel
                  sx={{ fontSize: "0.9rem", color: "text.primary", mb: 0.5 }}
                >
                  Email
                </FormLabel>
                <TextField
                  {...field}
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

          {/* Password */}
          <Controller
            name="password"
            control={control}
            rules={{
              required: { value: true, message: "Password is required." },
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters.",
              },
            }}
            render={({ field, fieldState }) => (
              <FormControl fullWidth sx={{ mb: 1 }}>
                <FormLabel
                  sx={{ fontSize: "0.9rem", color: "text.primary", mb: 0.5 }}
                >
                  Password
                </FormLabel>
                <TextField
                  {...field}
                  type={showPassword ? "text" : "password"}
                  error={!!fieldState.error}
                  placeholder="Enter your password"
                  slotProps={{
                    input: {
                      sx: inputStyles,
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword((prev) => !prev)}
                            edge="end"
                          >
                            {showPassword ? (
                              <VisibilityOff fontSize="small" />
                            ) : (
                              <Visibility fontSize="small" />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />
                {fieldState.error && (
                  <FormHelperText error sx={{ fontWeight: "bold" }}>
                    {fieldState.error.message}
                  </FormHelperText>
                )}
              </FormControl>
            )}
          />

          {/* Forgot Password*/}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mb: { xs: 1.5, md: 2.5 },
            }}
          >
            <Typography
              component="span"
              variant="body2"
              onClick={() => {
                dispatch(resetAuthState());
                setForgotPasswordOpen(true);
              }}
              sx={{
                color: "primary.main",
                cursor: "pointer",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Forgot password?
            </Typography>
          </Box>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={status === "loading"}
            sx={{ py: { xs: 0.6, md: 1 }, fontSize: "0.9rem" }}
          >
            {status === "loading" ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        {/* Footer */}
        <Typography
          variant="body1"
          color="text.secondary"
          align="center"
          sx={{ mt: { xs: 1.5, md: 3 } }}
        >
          Don't have an account?{" "}
          <Typography
            component={Link}
            to="/register"
            onClick={() => dispatch(resetAuthState())}
            variant="body1"
            sx={{
              color: "primary.main",
              fontWeight: 600,
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Sign Up
          </Typography>
        </Typography>
      </Box>

      {/* دیالوگ برای گزینه فراموشی رمز عبور */}
      <ForgotPasswordDialog
        forgotPasswordOpen={forgotPasswordOpen}
        onClose={() => setForgotPasswordOpen(false)}
      />
    </Box>
  );
}

export default LoginPage;
