import cl from "./SignIn.module.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import Carousel from "../../components/UI/Carousel/Carousel";
import { Button, CircularProgress, TextField } from "@mui/material";
import { ArrowForwardIos } from "@mui/icons-material";
import { doSignInWithEmailAndPassword } from "../../firebase/Auth";
import Checkmark from "../../components/UI/Animated/Checkmark";

interface SignInProps {
  onAuth: () => void;
}

const SignIn: React.FC<SignInProps> = ({ onAuth }) => {
  const { t } = useTranslation();
  const [firebaseErrorText, setFirebaseErrorText] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setFirebaseErrorText("");

    const { signin_email, signin_password } = e.target as HTMLFormElement;
    if (!signin_email.value || !signin_password.value) {
      setFirebaseErrorText("signin_error_empty_fields");
    } else {
      try {
        await doSignInWithEmailAndPassword(
          signin_email.value,
          signin_password.value
        );
        setCurrentPage(1);
        onAuth();
      } catch (error: any) {
        const errorText = error.message.substring(
          error.message.indexOf("(auth/") + 6,
          error.message.indexOf(")")
        );
        switch (errorText) {
          case "user-not-found":
            setFirebaseErrorText("signin_error_user_not_found");
            break;
          case "invalid-email":
            setFirebaseErrorText("signin_error_invalid_email");
            break;
          case "wrong-password":
            setFirebaseErrorText("signin_error_wrong_password");
            break;
          case "internal-error":
            setFirebaseErrorText("signin_error_no_password");
            break;
          default:
            setFirebaseErrorText("signin_unknown_error");
            break;
        }
      }
    }
    setLoading(false);
  };
  return (
    <div className={cl.signin}>
      <Carousel currentPage={currentPage}>
        <form className={cl.signin__page1} onSubmit={(e) => handleSignIn(e)}>
          <h1>{t("signin_welcome")}</h1>
          {firebaseErrorText ? (
            <h2>
              <span>{t(firebaseErrorText)}</span>
            </h2>
          ) : (
            <h2>{t("signin_write_email_and_password")}</h2>
          )}
          <div className={cl.signin__input_fields}>
            <TextField
              id="signin_email"
              error={firebaseErrorText !== ""}
              label={t("email")}
              disabled={loading}
              type="email"
              autoComplete="email"
            />
            <TextField
              id="signin_password"
              error={firebaseErrorText !== ""}
              label={t("password")}
              disabled={loading}
              type="password"
              autoComplete="password"
            />
          </div>
          <div className={cl.signin__horizontal_flex}>
            <Link to="/signup">{t("signin_no_account")}</Link>
            <div className={cl.signin__submit}>
              {loading && <CircularProgress size={35} />}
              <Button
                disabled={loading}
                type="submit"
                size="large"
                variant="contained"
                endIcon={<ArrowForwardIos />}
              >
                {t("signin_submit")}
              </Button>
            </div>
          </div>
        </form>
        <div className={cl.signin__page2}>
          {currentPage === 1 && <Checkmark size={50} />}
          <h1>{t("signin_success")}</h1>
        </div>
      </Carousel>
    </div>
  );
};

export default SignIn;
