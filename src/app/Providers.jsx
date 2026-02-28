import { CssBaseline, ThemeProvider } from "@mui/material";

import useToggleTheme from "../features/theme/hooks/useToggleTheme";
import getAppTheme from "../features/theme/index";
// =================================================================================

function Providers({ children }) {
  const { mode } = useToggleTheme();
  const theme = getAppTheme(mode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default Providers;
