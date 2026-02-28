import {
  Avatar,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Stack,
  Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PersonIcon from "@mui/icons-material/Person";
import { Controller } from "react-hook-form";

function AvatarInput({
  control,
  avatarPreview,
  fileInputRef,
  handleFileChange,
}) {
  return (
    <Controller
      name="avatar"
      control={control}
      rules={{
        required: { value: true, message: "Please select an image." },
      }}
      render={({ field: f, fieldState }) => (
        <FormControl fullWidth sx={{ mb: 2 }}>
          <FormLabel sx={{ fontSize: "0.9rem", color: "text.primary", mb: 1 }}>
            Profile Picture
          </FormLabel>

          {/* پیش‌نمایش آواتار */}
          <Stack alignItems="center" spacing={2} sx={{ mb: 2 }}>
            <Avatar
              src={avatarPreview || undefined}
              sx={{ width: 96, height: 96, bgcolor: "grey.300" }}
            >
              {/* اگر هیچ عکسی انتخاب نشده، آیکون پیش‌فرض نمایش داده می‌شود */}
              {!avatarPreview && (
                <PersonIcon sx={{ fontSize: 56, color: "grey.500" }} />
              )}
            </Avatar>
          </Stack>

          {/* اینپوت مخفی فایل */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />

          {/* دکمه‌ای که اینپوت مخفی را باز می‌کند */}
          <Button
            variant="outlined"
            startIcon={<CloudUploadIcon />}
            onClick={() => fileInputRef.current?.click()}
            sx={{ mb: 1 }}
          >
            Choose from Computer
          </Button>

          {avatarPreview && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Image selected ✓
            </Typography>
          )}

          {fieldState.error && (
            <FormHelperText error sx={{ fontWeight: "bold" }}>
              {fieldState.error.message}
            </FormHelperText>
          )}

          <input {...f} type="hidden" />
        </FormControl>
      )}
    />
  );
}

export default AvatarInput;
