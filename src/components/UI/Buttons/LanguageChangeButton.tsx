import React, { useEffect, useState } from "react";
import cl from "./LanguageChangeButton.module.css";
import en from "../../../assets/images/flags/en.png";
import ru from "../../../assets/images/flags/ru.png";
import { useTranslation } from "react-i18next";
import ButtonBase from "./ButtonBase";

// create dropdown for language change
const LanguageChangeButton: React.FC<
  React.HTMLAttributes<HTMLUListElement>
> = () => {
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const t = useTranslation();

  useEffect(() => {
    setCurrentLanguage(t.i18n.language);
    localStorage.setItem("language", currentLanguage);
  }, [t]);

  const languages: any = {
    en: {
      name: "English",
      flag: en,
    },
    ru: {
      name: "Русский",
      flag: ru,
    },
  };

  const changeLanguage = () => {
    const newLanguage = currentLanguage === "en" ? "ru" : "en";
    t.i18n.changeLanguage(newLanguage);
    setCurrentLanguage(newLanguage);
  };

  return (
    <ButtonBase className={cl.container} onClick={changeLanguage}>
      <img
        src={languages[currentLanguage].flag}
        alt={languages[currentLanguage].name}
      />
    </ButtonBase>
  );
};

export default LanguageChangeButton;
