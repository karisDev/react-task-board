import ButtonBase from "../../components/UI/Buttons/ButtonBase";
import LanguageChangeButton from "../../components/UI/Buttons/LanguageChangeButton";
import ThemeChangeButton from "../../components/UI/Buttons/ThemeChangeButton";
import SettingsDropdown from "../../components/UI/Dropdowns/SettingsDropdown";
import { doSignOut } from "../../firebase/Auth";
import cl from "./SettingsPage.module.css";

const SettingsPage = () => {
  const logout = () => {
    doSignOut();
  };
  return (
    <div className={cl.container}>
      <SettingsDropdown>
        <LanguageChangeButton />
        <ThemeChangeButton />
        <ButtonBase onClick={logout}>Выход</ButtonBase>
      </SettingsDropdown>
    </div>
  );
};

export default SettingsPage;
