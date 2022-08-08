import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  doCreateUserWithEmailAndPassword,
  doSignInWithEmailAndPassword,
} from "../../firebase/Auth";
import Carousel from "../../components/UI/Carousel/Carousel";
import cl from "./SignUp.module.css";
import { createUserSettings } from "../../firebase/Firestore";
import { Language } from "../../interfaces/appInterfaces";
import Checkmark from "../../components/UI/Animated/Checkmark";

interface SignUpProps {
  onAuth: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onAuth }) => {
  const [name, setName] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const mobile = useMediaQuery("(max-width:650px)");
  // errors
  const [emptyName, setEmptyName] = useState(false);
  const [passwordsDontMatch, setPasswordsDontMatch] = useState(false);
  const [passwordTooWeak, setPasswordTooWeak] = useState(false);
  const [tooLongName, setTooLongName] = useState(false);
  const [firebaseErrorText, setFirebaseErrorText] = useState("");

  const isEmptyOrWhiteSpace = (str: string) =>
    str === null || str.match(/^ *$/) !== null;

  // function switches page after name is entered
  const validateAndSwitchPage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // first we update validations
    setTooLongName(name.length > 15);
    setEmptyName(isEmptyOrWhiteSpace(name));
    // second we switch page if everything is ok
    if (name.length <= 15 && !isEmptyOrWhiteSpace(name)) {
      setCurrentPage(1);
      setTimeout(() => {
        document.getElementById("signup_email")?.focus();
      }, 500);
    }
  };
  // function requests to create user in firebase
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // getting each input field from page 2
    const { signup_email, signup_password, signup_repeat_password } =
      e.target as HTMLFormElement;

    setFirebaseErrorText(""); // delete previous error messages

    const re = /^(?=.*[A-Za-z])[A-Za-z\d]{8,}$/; // 8+ characters and at least 1 latin letter
    const passwordValid = re.test(signup_password.value);
    setPasswordTooWeak(!passwordValid);
    setPasswordsDontMatch(
      signup_password.value !== signup_repeat_password.value
    );
    if (
      signup_password.value !== signup_repeat_password.value ||
      !passwordValid
    ) {
      signup_password.focus();
      return;
    }

    setLoading(true);
    try {
      // no catch means registration success
      await doCreateUserWithEmailAndPassword(
        signup_email.value,
        signup_password.value
      );
      createUserSettings(name, Language.en);
      await doSignInWithEmailAndPassword(
        signup_email.value,
        signup_password.value
      );

      setCurrentPage(2);
      onAuth();
    } catch (error: any) {
      const errorText = error.message.substring(
        error.message.indexOf("(auth/") + 6,
        error.message.indexOf(")")
      );
      switch (errorText) {
        case "email-already-in-use":
          setFirebaseErrorText("signup_email_already_in_use");
          break;
        case "missing-email":
          setFirebaseErrorText("signup_missing_email");
          break;
        default:
          setFirebaseErrorText("signup_unknown_error");
          break;
      }
    }
    setLoading(false);
  };

  return (
    <div className={cl.signup}>
      <Carousel currentPage={currentPage}>
        <form
          className={cl.signup__page1}
          onSubmit={(e) => validateAndSwitchPage(e)}
        >
          <div className={cl.page1__name_header}>
            <h1>{t("signup_welcome")}</h1>
            {tooLongName ? (
              <h2>
                <span>{t("signup_long_name")}</span>
              </h2>
            ) : (
              <h2>
                {t("signup_set_name")}&nbsp;
                <span>{emptyName ? t("signup_name_required") : null}</span>
              </h2>
            )}
          </div>
          <TextField
            label={t("signup_choose_name")}
            disabled={currentPage !== 0}
            value={name}
            error={emptyName}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            InputProps={{ style: { fontSize: 30 } }}
            InputLabelProps={{ style: { fontSize: 20 } }}
          />
          <div className={cl.signup__horizontal_flex}>
            <Link to="/signin">{t("signup_have_account")}</Link>
            <Button
              type="submit"
              size="large"
              variant="contained"
              endIcon={<ArrowForwardIos />}
            >
              {t("continue")}
            </Button>
          </div>
        </form>
        <form
          className={cl.signup__page2}
          onSubmit={(e) => {
            handleSignUp(e);
          }}
        >
          <h1>
            {t("signup_greeting")} {name}
          </h1>
          {firebaseErrorText !== "" ? (
            <h2>
              {t("signup_unable_because")} <span>{t(firebaseErrorText)}</span>
            </h2>
          ) : passwordTooWeak ? (
            <h2>
              <span>{t("signup_password_weak")}</span>
            </h2>
          ) : passwordsDontMatch ? (
            <h2>
              <span>{t("signup_passwords_dont_match")}</span>
            </h2>
          ) : (
            <h2>{t("signup_write_email_and_password")}</h2>
          )}
          <TextField
            label={t("email")}
            disabled={loading}
            id="signup_email"
            type="email"
            autoComplete="email"
            margin={mobile ? "dense" : "normal"}
          />
          <div className={cl.signup__horizontal_flex}>
            <TextField
              label={t("password")}
              disabled={loading}
              id="signup_password"
              type="password"
              autoComplete="new-password"
              error={passwordsDontMatch || passwordTooWeak}
              margin={mobile ? "dense" : "normal"}
            />
            <TextField
              label={t("signup_repeat_password")}
              disabled={loading}
              id="signup_repeat_password"
              autoComplete="new-password"
              type="password"
              error={passwordsDontMatch}
              margin={mobile ? "dense" : "normal"}
            />
          </div>
          <div className={cl.signup__horizontal_flex}>
            <Button
              size="large"
              disabled={loading}
              startIcon={<ArrowBackIos />}
              onClick={() => setCurrentPage(0)}
            >
              {t("back")}
            </Button>
            <div className={cl.signup__submit}>
              {loading && (
                <CircularProgress
                  className={cl.submit__progress_icon}
                  size={35}
                />
              )}
              <Button
                disabled={loading}
                size="large"
                variant="contained"
                type="submit"
              >
                {t("signup_submit")}
              </Button>
            </div>
          </div>
        </form>
        <div className={cl.signup__page3}>
          {currentPage === 2 && <Checkmark size={50} />}
          <h2>{t("signup_congradulations")}</h2>
        </div>
      </Carousel>
    </div>
  );
};

export default SignUp;
