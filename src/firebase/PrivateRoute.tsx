import { Auth, User } from "firebase/auth";
import React, { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { AuthUser } from "./AuthUserContext";

interface Props {
  children: ReactElement<any | null>;
}
export const PrivateRoute: React.FC<Props> = ({ children }) => {
  const user = AuthUser()!.auth;

  if (!user) {
    return <Navigate to="/signin" />;
  }

  return children;
};
