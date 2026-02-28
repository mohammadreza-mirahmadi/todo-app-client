import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  InputAdornment,
  TextField,
  useTheme,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router";
import { registerThunk } from "../authThunks";
import { resetAuthState } from "../authSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthStatus } from "../authSelectors";

function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector(selectAuthStatus);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  const onSubmit = async (data) => {
    const { confirmPassword, ...registerData } = data;
    const result = await dispatch(registerThunk(registerData));

    // اگر محتوای ریزالت با ثانک در حالت موفقیت‌آمیز مطابقت داشت، وضعیت احراز هویت را ریست کن و به صفحه ورود هدایت کن
    if (registerThunk.fulfilled.match(result)) {
      dispatch(resetAuthState());
      navigate("/login");
    }
  };

  const theme = useTheme();
  const paperColor = theme.palette.background.paper;
  const textColor = theme.palette.text.primary;

  const inputStyles = {
    height: { xs: 34, md: 40 },
    bgcolor: "background.paper",
    "& .MuiOutlinedInput-notchedOutline": { borderColor: "primary.main" },
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
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Username */}
      <Controller
        name="username"
        control={control}
        rules={{
          required: { value: true, message: "Username is required." },
          minLength: { value: 3, message: "Use at least 3 characters." },
          maxLength: { value: 20, message: "No more than 20 characters." },
        }}
        render={({ field, fieldState }) => (
          <FormControl fullWidth sx={{ mb: { xs: 1.5, md: 2 } }}>
            <FormLabel
              sx={{ fontSize: "0.9rem", color: "text.primary", mb: 0.5 }}
            >
              Username
            </FormLabel>
            <TextField
              {...field}
              error={!!fieldState.error}
              placeholder="Choose a username"
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

      {/* Email */}
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
          <FormControl fullWidth sx={{ mb: { xs: 1.5, md: 2 } }}>
            <FormLabel
              sx={{ fontSize: "0.9rem", color: "text.primary", mb: 0.5 }}
            >
              Email
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
          <FormControl fullWidth sx={{ mb: { xs: 1.5, md: 2 } }}>
            <FormLabel
              sx={{ fontSize: "0.9rem", color: "text.primary", mb: 0.5 }}
            >
              Password
            </FormLabel>
            <TextField
              {...field}
              type={showPassword ? "text" : "password"}
              error={!!fieldState.error}
              placeholder="Create a password"
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

      {/* Confirm Password */}
      <Controller
        name="confirmPassword"
        control={control}
        rules={{
          required: {
            value: true,
            message: "Please confirm your password.",
          },
          validate: (value) => value === password || "Passwords do not match.",
        }}
        render={({ field, fieldState }) => (
          <FormControl fullWidth sx={{ mb: 2.5 }}>
            <FormLabel
              sx={{ fontSize: "0.9rem", color: "text.primary", mb: 0.5 }}
            >
              Confirm Password
            </FormLabel>
            <TextField
              {...field}
              type={showConfirmPassword ? "text" : "password"}
              error={!!fieldState.error}
              placeholder="Repeat your password"
              slotProps={{
                input: {
                  sx: inputStyles,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        edge="end"
                      >
                        {showConfirmPassword ? (
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

      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={status === "loading"}
        sx={{ py: { xs: 0.6, md: 1 }, fontSize: "0.9rem" }}
      >
        {status === "loading" ? "Creating account..." : "Sign Up"}
      </Button>
    </form>
  );
}

export default RegisterForm;
