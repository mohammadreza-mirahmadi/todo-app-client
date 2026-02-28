import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/system";

function useIsMobile(breakpoint = "md") {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(breakpoint));
  return isMobile;
}

export default useIsMobile;
