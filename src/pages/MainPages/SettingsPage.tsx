import { useTranslation } from "react-i18next";
import ButtonBase from "../../components/UI/Buttons/ButtonBase";
import LanguageChangeButton from "../../components/UI/Buttons/LanguageChangeButton";
import ThemeChangeButton from "../../components/UI/Buttons/ThemeChangeButton";
import SettingsDropdown from "../../components/UI/Dropdowns/SettingsDropdown";
import { doSignOut } from "../../firebase/Auth";
import cl from "./SettingsPage.module.css";

const SettingsPage = () => {
  const { t } = useTranslation();

  const logout = () => {
    doSignOut();
  };

  return (
    <div className={cl.settings}>
      <h1>{t("settings")}</h1>
      <SettingsDropdown>
        <LanguageChangeButton />
        <ThemeChangeButton />
        <ButtonBase onClick={logout}>Выход</ButtonBase>
      </SettingsDropdown>
    </div>
  );
};

export default SettingsPage;
