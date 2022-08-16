import cl from "./SignPage.module.css";
import LoadingPage from "../../components/UI/Animated/LoadingPage";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import LanguageChangeButton from "../../components/UI/Buttons/LanguageChangeButton";
import Carousel from "../../components/UI/Carousel/Carousel";
import SettingsDropdown from "../../components/UI/Dropdowns/SettingsDropdown";
import ThemeChangeButton from "../../components/UI/Buttons/ThemeChangeButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  signUp?: boolean;
}

export const SignPage: React.FC<Props> = ({ signUp }) => {
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const authSuccess = () => {
    setTimeout(() => {
      setSuccess(true);
    }, 2000);
    setTimeout(() => {
      navigate("/dashboard");
    }, 3000);
  };

  return (
    <>
      <LoadingPage />
      <div className={[cl.container, success ? cl.success : null].join(" ")}>
        <div
          className={[cl.transitionZone, success ? cl.success : null].join(" ")}
        >
          <SettingsDropdown className={cl.settingsDropdown}>
            <LanguageChangeButton />
            <ThemeChangeButton />
          </SettingsDropdown>
          <Carousel currentPage={signUp ? 1 : 0} vertical>
            <SignIn onAuth={authSuccess} />
            <SignUp onAuth={authSuccess} />
          </Carousel>
        </div>
      </div>
    </>
  );
};
