import { useDispatch, useSelector } from "react-redux";
import { toggleThemeAction } from "../themeSlice";

function useToggleTheme() {
  const dispatch = useDispatch();
  const mode = useSelector((store) => store.theme.mode);

  const toggleTheme = () => {
    dispatch(toggleThemeAction());
  };

  return { mode, toggleTheme };
}

export default useToggleTheme;
