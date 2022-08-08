import { User } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import LoadingPage from "../components/UI/Animated/LoadingPage";
import {
  IDBUserBoardsStructure,
  IDBUserSettingsStructure,
} from "../interfaces/dbInterfaces";
import { auth } from "./firebaseConfig";
import { getUserBoards, getUserSettings } from "./Firestore";

export const AuthUserContext =
  React.createContext<AuthUserProviderContext | null>(null);

interface AuthUserProviderContext {
  auth: User | null;
  settings: IDBUserSettingsStructure | null;
  boards: IDBUserBoardsStructure | null;
  updateDb: () => Promise<void>;
}

export const AuthUserProvider = ({
  children,
}: {
  children: JSX.Element[] | JSX.Element;
}) => {
  const [currentUser, setCurrentUser] =
    useState<AuthUserProviderContext | null>(null);
  const [loading, setLoading] = useState(true);

  const updateDatabase = async () => {
    const boardsDb = await getUserBoards();
    const settingsDb = await getUserSettings();
    setCurrentUser({
      auth: auth.currentUser,
      settings: settingsDb,
      boards: boardsDb,
      updateDb: updateDatabase,
    });
  };

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      const boardsDb = await getUserBoards();
      const settingsDb = await getUserSettings();

      setCurrentUser({
        auth: user,
        settings: settingsDb,
        boards: boardsDb,
        updateDb: updateDatabase,
      });
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <AuthUserContext.Provider value={currentUser}>
      {children}
    </AuthUserContext.Provider>
  );
};

export const AuthUser = () => {
  return useContext(AuthUserContext);
};
