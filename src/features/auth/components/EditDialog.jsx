import { useDispatch, useSelector } from "react-redux";
import { selectAuthError, selectAuthStatus } from "../authSelectors";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { resetAuthState } from "../authSlice";
import { updateProfileThunk } from "../authThunks";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import PasswordInput from "./feildInputs/PasswordInput";
import EmailInput from "./feildInputs/EmialInput";
import UsernameInput from "./feildInputs/UsernameInput";
import AvatarInput from "./feildInputs/AvatarInput";
import CloseIcon from "@mui/icons-material/Close";

const inputStyles = {
  bgcolor: "background.default",
  "& .MuiOutlinedInput-notchedOutline": { borderColor: "primary.main" },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "primary.main",
    borderWidth: 2,
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderWidth: 2 },
};

function EditDialog({ open, onClose, field, user }) {
  const dispatch = useDispatch();
  const status = useSelector(selectAuthStatus);
  const error = useSelector(selectAuthError);

  // state برای نمایش پیش‌نمایش عکس انتخاب‌شده
  const [avatarPreview, setAvatarPreview] = useState(null);
  // ref برای المان input type="file"
  const fileInputRef = useRef(null);

  const getDefaultValues = () => {
    if (field === "username") return { username: user?.username || "" };
    if (field === "email") return { email: user?.email || "" };
    if (field === "password") return { password: "", confirmPassword: "" };
    if (field === "avatar") return { avatar: "" };
    return {};
  };

  const { control, handleSubmit, watch, reset, setValue } = useForm({
    defaultValues: getDefaultValues(),
  });

  const password = watch("password");

  const handleClose = () => {
    reset();
    setAvatarPreview(null); // ریست پیش‌نمایش موقع بستن دیالوگ
    dispatch(resetAuthState());
    onClose();
  };

  // هندل کردن انتخاب فایل از کامپیوتر
  // فایل انتخاب‌شده به base64 تبدیل می‌شود تا به سرور ارسال شود
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) return;

    if (file.size > 2 * 1024 * 1024) return; // حداکثر 2MB

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64String = event.target.result;
      setAvatarPreview(base64String);
      setValue("avatar", base64String, { shouldValidate: true });
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data) => {
    let payload = {};
    if (field === "username") payload = { username: data.username };
    if (field === "email") payload = { email: data.email };
    if (field === "password") payload = { password: data.password };
    if (field === "avatar") payload = { avatar: data.avatar };

    const result = await dispatch(updateProfileThunk(payload));
    if (updateProfileThunk.fulfilled.match(result)) {
      handleClose();
    }
  };

  const titles = {
    username: "Change Username",
    email: "Change Email",
    password: "Change Password",
    avatar: "Change Profile Picture",
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="xs"
      slotProps={{ paper: { sx: { bgcolor: "background.paper" } } }}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        {titles[field]}
        <IconButton
          onClick={handleClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        {error && (
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
            <Typography variant="body1">
              {error.message || "Update failed."}
            </Typography>
          </Box>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Username */}
          {field === "username" && (
            <UsernameInput control={control} inputStyles={inputStyles} />
          )}

          {/* Email */}
          {field === "email" && (
            <EmailInput control={control} inputStyles={inputStyles} />
          )}

          {/* Password */}
          {field === "password" && (
            <PasswordInput
              control={control}
              password={password}
              inputStyles={inputStyles}
            />
          )}

          {/* Avatar - آپلود عکس از کامپیوتر به جای URL */}
          {field === "avatar" && (
            <AvatarInput
              control={control}
              avatarPreview={avatarPreview}
              fileInputRef={fileInputRef}
              handleFileChange={handleFileChange}
            />
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={status === "loading"}
            sx={{ mt: 1 }}
          >
            {status === "loading" ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditDialog;
