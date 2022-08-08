import { useContext } from "react";
import { ThemeContext } from "../../theme/ThemeWrapper";
import ButtonBase from "./ButtonBase";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const ThemeChangeButton = () => {
  const themeContext = useContext(ThemeContext);

  return (
    <ButtonBase onClick={themeContext.switchTheme}>
      {themeContext.darkTheme ? <LightModeIcon /> : <DarkModeIcon />}
    </ButtonBase>
  );
};

export default ThemeChangeButton;
