import lightTheme from "./lightTheme";
import darkTheme from "./darkTheme";

const getAppTheme = (mode) => {
  const theme = mode === "light" ? lightTheme : darkTheme;
  return theme;
};

export default getAppTheme;
