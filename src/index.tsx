import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import localization from "./assets/localization/localization.json";

i18n // app localization should be added in bundle
  .use(initReactI18next)
  .init(localization); // please use the same capitalization

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);
