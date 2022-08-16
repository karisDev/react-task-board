import { useContext, useEffect, useState } from "react";
import Navbar from "../../components/UI/Navbars/Navbar";
import cl from "./MainPage.module.css";
import { AuthUserContext } from "../../firebase/AuthUserContext";
import { IBoard } from "../../interfaces/appInterfaces";
import DashboardPage from "./DashboardPage";
import { BoardPage } from "./BoardPage";
import { useLocation } from "react-router-dom";
import SettingsPage from "./SettingsPage";

export enum PrivatePages {
  "dashboard",
  "settings",
  "board",
}

interface MainPageProps {
  page: PrivatePages;
  boardId?: number;
}

export const MainPage = ({ page, boardId }: MainPageProps) => {
  const authUser = useContext(AuthUserContext);
  const [name, setName] = useState("");
  const [boards, setBoards] = useState<IBoard[]>([]);
  const location = useLocation();

  const renderPage = () => {
    switch (page) {
      case PrivatePages.dashboard:
        return <DashboardPage boards={boards} />;
      case PrivatePages.board:
        return <BoardPage board={getBoardByUrl()} />;
      case PrivatePages.settings:
        return <SettingsPage />;
    }
  };

  const getBoardByUrl = () => {
    const id = Number(window.location.href.split("/")[4]);
    const board = boards.find((board) => {
      return board.id == id;
    });
    return board;
  };

  useEffect(() => {
    const getDb = () => {
      if (authUser) {
        setName(authUser.settings!.name);
        setBoards(authUser.boards?.boards ? authUser.boards.boards : []);
      }
    };
    getDb();
  }, [authUser]);

  useEffect(() => {}, [location]);

  return (
    <div className={cl.container}>
      <Navbar boards={boards} name={name} page={page} />
      <div className={cl.container__main_content}>{renderPage()}</div>
    </div>
  );
};
