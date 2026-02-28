import {
  FormControl,
  FormHelperText,
  FormLabel,
  TextField,
} from "@mui/material";
import { Controller } from "react-hook-form";

function UsernameInput({ control, inputStyles }) {
  return (
    <Controller
      name="username"
      control={control}
      rules={{
        required: { value: true, message: "Username is required." },
        minLength: { value: 3, message: "Use at least 3 characters." },
        maxLength: {
          value: 20,
          message: "No more than 20 characters.",
        },
        pattern: {
          value: /^[a-zA-Z0-9_]+$/,
          message: "Only letters, numbers and underscore allowed.",
        },
      }}
      render={({ field: f, fieldState }) => (
        <FormControl fullWidth sx={{ mb: 2 }}>
          <FormLabel
            sx={{ fontSize: "0.9rem", color: "text.primary", mb: 0.5 }}
          >
            New Username
          </FormLabel>
          <TextField
            {...f}
            error={!!fieldState.error}
            placeholder="Enter new username"
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

export default UsernameInput;
