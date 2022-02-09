import { useSelector } from "react-redux";

export const useDarkMode = () => {
  const { darkMode } = useSelector((state) => state.UI);

  return darkMode;
};
