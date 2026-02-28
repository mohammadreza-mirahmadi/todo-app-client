import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectAuthError } from "../authSelectors";
import { resetAuthState } from "../authSlice";
import RegisterForm from "../components/RegisterForm";
// =================================================================================

function RegisterPage() {
  const dispatch = useDispatch();
  const error = useSelector(selectAuthError);

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
          p: { xs: 2, sm: 3 },
          boxShadow: "rgba(0,0,0,0.08) 0px 4px 24px",
          mx: 2,
          my: 3,
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
          sx={{ mb: { xs: 2, md: 3 } }}
        >
          Create your account
        </Typography>
        {/* Error message */}
        {error && (
          <Box
            sx={{
              bgcolor: "error.light",
              color: "error.dark",
              borderRadius: "4px",
              px: 2,
              py: 1,
              mb: 2,
              mt: { xs: 0, md: -2 },
            }}
          >
            <Typography variant="body1">
              {error.message || "Registration failed."}
            </Typography>
          </Box>
        )}
        <RegisterForm />
        {/* Link to Login */}
        <Typography
          variant="body1"
          color="text.secondary"
          align="center"
          sx={{ mt: { xs: 1.5, md: 2 } }}
        >
          Already have an account?{" "}
          <Typography
            component={Link}
            to="/login"
            onClick={() => dispatch(resetAuthState())}
            variant="body1"
            sx={{
              color: "primary.main",
              fontWeight: 600,
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Sign In
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
}

export default RegisterPage;
