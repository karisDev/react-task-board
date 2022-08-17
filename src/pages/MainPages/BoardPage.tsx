import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import BoardTitle from "../../components/UI/Cards/BoardTitle";
import { NewTaskCard } from "../../components/UI/Cards/NewTaskCard";
import { TaskCard } from "../../components/UI/Cards/TaskCard";
import { AuthUserContext } from "../../firebase/AuthUserContext";
import {
  createNewTask,
  deleteBoard,
  updateBoardTitle,
} from "../../firebase/Firestore";
import { IBoard } from "../../interfaces/appInterfaces";
import cl from "./BoardPage.module.css";

interface BoardPageProps {
  board: IBoard | undefined;
}

export const BoardPage = ({ board }: BoardPageProps) => {
  const { t } = useTranslation();
  const authContext = useContext(AuthUserContext);

  const createTask = async (title: string, body: string) => {
    await createNewTask(board!.id, title, body);
    await authContext?.updateDb();
  };

  const onBoardDelete = async () => {
    await deleteBoard(board!.id);
    await authContext?.updateDb();
  };

  const onBoardRename = async (newTitle: string) => {
    await updateBoardTitle(board!.id, newTitle);
    await authContext?.updateDb();
  };

  return board == undefined ? (
    <Navigate to={"/dashboard"} />
  ) : (
    <div className={cl.container}>
      <div className={cl.container_title}>
        <BoardTitle
          title={board.title}
          onBoardDelete={onBoardDelete}
          onBoardRename={onBoardRename}
        />
      </div>
      <div className={cl.tasks}>
        <h2 className={cl.tasks__header}>{t("board_create")}</h2>
        <div className={cl.tasks_section}>
          <NewTaskCard createTaskCallback={createTask} />
        </div>
        <h2 className={cl.tasks__header}>{t("board_current")}</h2>
        <div className={cl.tasks_section}>
          {board.tasks?.map(
            (task, index) =>
              !task.isFinnished && (
                <TaskCard boardId={board.id} task={task} key={index} />
              )
          )}
        </div>
        <h2 className={cl.tasks__header}>{t("board_finished")}</h2>
        <div className={cl.tasks_section}>
          {board.tasks?.map(
            (task, index) =>
              task.isFinnished && (
                <TaskCard boardId={board.id} task={task} key={index} />
              )
          )}
        </div>
      </div>
    </div>
  );
};
