import { Button, Checkbox, CircularProgress, IconButton } from "@mui/material";
import { ITask } from "../../../interfaces/appInterfaces";
import cl from "./TaskCard.module.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { useContext, useState } from "react";
import { deleteTask, updateTask } from "../../../firebase/Firestore";
import { AuthUserContext } from "../../../firebase/AuthUserContext";
import { EditTaskCard } from "./EditTaskCard";
import { useTranslation } from "react-i18next";

interface TaskCardProps {
  task: ITask;
  boardId: number;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, boardId }) => {
  const { t } = useTranslation();
  const [confirmDeleteMode, setConfirmDeleteMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [updatingCompletion, setUpdatingCompletion] = useState(false);
  const [complete, setComplete] = useState(task.isFinnished ? true : false);
  const authContext = useContext(AuthUserContext);

  const doDeleteTask = async () => {
    setDeleting(true);
    await deleteTask(task.id!, boardId);
    await authContext?.updateDb();
    setConfirmDeleteMode(false);
  };

  const updateCompletion = async () => {
    setUpdatingCompletion(true);

    task.isFinnished = !complete;
    setComplete(!complete);
    await updateTask(boardId, task);
    await authContext?.updateDb();
  };

  const updateText = async (title: string, body: string) => {
    task.title = title;
    task.body = body;
    await updateTask(boardId, task);
    await authContext?.updateDb();
    setEditMode(false);
  };

  return editMode ? (
    <EditTaskCard
      currentBody={task.body}
      currentTitle={task.title}
      cancelCallback={() => setEditMode(false)}
      updateCallback={updateText}
    />
  ) : confirmDeleteMode ? (
    <div className={cl.confirm_box}>
      <h2>{t("task_delete_ask")}</h2>
      <div className={cl.confirm_box__controls}>
        <Button
          disabled={deleting}
          onClick={() => setConfirmDeleteMode(false)}
          variant="outlined"
        >
          {t("task_delete_cancel")}
        </Button>
        <Button disabled={deleting} onClick={doDeleteTask} variant="contained">
          {deleting ? <CircularProgress size={26} /> : t("task_delete_confirm")}
        </Button>
      </div>
    </div>
  ) : (
    <div className={cl.container}>
      <div className={cl.checkbox_holder}>
        <Checkbox
          disabled={updatingCompletion}
          checked={complete}
          onClick={updateCompletion}
          sx={{
            "&.Mui-checked": { color: "#7ac142" },
            "& .MuiSvgIcon-root": { fontSize: 35 },
          }}
        />
      </div>
      <div className={cl.content_holder}>
        <div
          className={[
            cl.title,
            task.body ? cl.title__small_margin : cl.title__big_margin,
          ].join(" ")}
        >
          <h2>{task.title}</h2>
        </div>
        <h3 className={cl.description}>{task.body}</h3>
      </div>
      <div className={cl.task_controls}>
        <IconButton onClick={() => setEditMode(true)}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => setConfirmDeleteMode(true)}>
          <DeleteOutlineIcon />
        </IconButton>
      </div>
    </div>
  );
};
