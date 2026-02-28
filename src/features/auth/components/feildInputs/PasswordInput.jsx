import {
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function PasswordInput({ control, password, inputStyles }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <>
      <Controller
        name="password"
        control={control}
        rules={{
          required: { value: true, message: "Password is required." },
          minLength: { value: 8, message: "At least 8 characters." },
          validate: (value) =>
            (/[a-z]/.test(value) &&
              /[A-Z]/.test(value) &&
              /\d/.test(value) &&
              /[@$!%*?&#]/.test(value)) ||
            "Must contain uppercase, lowercase, number and special character.",
        }}
        render={({ field: f, fieldState }) => (
          <FormControl fullWidth sx={{ mb: 2 }}>
            <FormLabel
              sx={{
                fontSize: "0.9rem",
                color: "text.primary",
                mb: 0.5,
              }}
            >
              New Password
            </FormLabel>
            <TextField
              {...f}
              type={showPassword ? "text" : "password"}
              error={!!fieldState.error}
              placeholder="Enter new password"
              slotProps={{
                input: {
                  sx: inputStyles,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((p) => !p)}
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
        render={({ field: f, fieldState }) => (
          <FormControl fullWidth sx={{ mb: 2 }}>
            <FormLabel
              sx={{
                fontSize: "0.9rem",
                color: "text.primary",
                mb: 0.5,
              }}
            >
              Confirm Password
            </FormLabel>
            <TextField
              {...f}
              type={showConfirmPassword ? "text" : "password"}
              error={!!fieldState.error}
              placeholder="Repeat new password"
              slotProps={{
                input: {
                  sx: inputStyles,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirmPassword((p) => !p)}
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
    </>
  );
}

export default PasswordInput;
