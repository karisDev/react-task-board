import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useOutsideAlerter } from "../../../hooks/useOutsideAlerter";
import ButtonBase from "../Buttons/ButtonBase";
import cl from "./SettingsDropdown.module.css";

interface SettingsDropdownProps {
  children: JSX.Element | JSX.Element[];
  className?: string;
}

const SettingsDropdown: React.FC<SettingsDropdownProps> = ({
  children,
  className,
}) => {
  const [expanded, setExpanded] = useState(false);
  const { t } = useTranslation();
  const dropdown = useRef(null);
  useOutsideAlerter(dropdown, () => setExpanded(false));

  return (
    <div
      className={[cl.container, className, expanded ? cl.expanded : null].join(
        " "
      )}
      ref={dropdown}
    >
      <ButtonBase
        className={cl.expandButton}
        onClick={() => setExpanded(!expanded)}
      >
        <span>{t("settings")}</span>
        {expanded ? <ArrowDropUp /> : <ArrowDropDown />}
      </ButtonBase>
      <div className={cl.dropdown}>{expanded && children}</div>
    </div>
  );
};

export default SettingsDropdown;
