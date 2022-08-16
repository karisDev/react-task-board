import {
  ChevronLeftRounded,
  ChevronRightRounded,
  HomeRounded,
  SettingsRounded,
} from "@mui/icons-material";
import { Button, IconButton, useMediaQuery } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { AuthUserContext } from "../../../firebase/AuthUserContext";
import { IBoard } from "../../../interfaces/appInterfaces";
import { PrivatePages as appPages } from "../../../pages/MainPages/MainPage";
import ThemeChangeButton from "../Buttons/ThemeChangeButton";
import BoardsDropdown from "./BoardsDropdown";
import cl from "./Navbar.module.css";

interface NavbarProps {
  boards?: IBoard[];
  name: string;
  page: appPages;
}

const Navbar: React.FC<NavbarProps> = ({ boards, name, page }) => {
  const { t } = useTranslation();
  const [isHidden, setIsHidden] = useState(false);
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:650px)");
  const authUser = useContext(AuthUserContext);

  const hideNavOnMobile = () => {
    if (isMobile) {
      setIsHidden(true);
    }
  };

  useEffect(() => {}, [authUser]);

  return (
    <>
      <nav className={[cl.nav, isHidden ? cl.nav__hidden : null].join(" ")}>
        <div className={cl.nav__scrollable_overflow}>
          <div className={cl.nav__scrollable}>
            <div className={cl.nav__header}>
              <h1>{t("nav_welcome_back")}</h1>
              <h1>{name}</h1>
            </div>
            <div className={cl.nav__actions}>
              <Button
                className={[
                  cl.nav__btn_standart,
                  page == appPages.dashboard ? cl.active : null,
                ].join(" ")}
                startIcon={<HomeRounded />}
                onClick={() => {
                  hideNavOnMobile();
                  navigate("/dashboard");
                }}
              >
                {t("dashboard")}
              </Button>
              <Button
                startIcon={<SettingsRounded />}
                className={[
                  cl.nav__btn_standart,
                  page == appPages.settings ? cl.active : null,
                ].join(" ")}
                onClick={() => {
                  hideNavOnMobile();
                  navigate("/settings");
                }}
              >
                {t("settings")}
              </Button>
            </div>
            <BoardsDropdown onBoardClick={hideNavOnMobile} boards={boards} />
          </div>
        </div>
        <button
          className={cl.nav__hide_btn}
          onClick={() => setIsHidden(!isHidden)}
        >
          <ChevronLeftRounded />
        </button>
      </nav>
      <div
        className={[
          cl.nav__width_measurer,
          isHidden ? cl.nav__hidden : null,
        ].join(" ")}
      />
    </>
  );
};

export default Navbar;
