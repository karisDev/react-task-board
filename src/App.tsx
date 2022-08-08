import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { AuthUserProvider } from "./firebase/AuthUserContext";
import { PrivateRoute } from "./firebase/PrivateRoute";
import { PrivatePages, MainPage } from "./pages/MainPages/MainPage";
import { SignPage } from "./pages/SignPage/SignPage";
import "./App.css";
import ThemeWrapper from "./components/theme/ThemeWrapper";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

function App() {
  const t = useTranslation().i18n;

  useEffect(() => {
    const localLanguage = localStorage.getItem("language");
    if (localLanguage) {
      t.changeLanguage(localLanguage);
    } else {
      localStorage.setItem("language", "en");
    }
  }, []);
  return (
    <ThemeWrapper>
      <AuthUserProvider>
        <Router>
          <Routes>
            <Route path="/signin" element={<SignPage />} />
            <Route path="/signup" element={<SignPage signUp />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <MainPage page={PrivatePages.dashboard} />
                </PrivateRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <PrivateRoute>
                  <MainPage page={PrivatePages.settings} />
                </PrivateRoute>
              }
            />
            <Route
              path="/board/:id"
              element={
                <PrivateRoute>
                  <MainPage page={PrivatePages.board} />
                </PrivateRoute>
              }
            ></Route>
            <Route path="/*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </Router>
      </AuthUserProvider>
    </ThemeWrapper>
  );
}

export default App;
