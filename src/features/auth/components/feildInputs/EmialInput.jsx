import {
  FormControl,
  FormHelperText,
  FormLabel,
  TextField,
} from "@mui/material";
import { Controller } from "react-hook-form";

function EmailInput({ control, inputStyles }) {
  return (
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
      render={({ field: f, fieldState }) => (
        <FormControl fullWidth sx={{ mb: 2 }}>
          <FormLabel
            sx={{ fontSize: "0.9rem", color: "text.primary", mb: 0.5 }}
          >
            New Email
          </FormLabel>
          <TextField
            {...f}
            type="email"
            error={!!fieldState.error}
            placeholder="Enter new email"
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
  );
}

export default EmailInput;
