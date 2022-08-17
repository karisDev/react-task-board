import { Button, CircularProgress, IconButton } from "@mui/material";
import cl from "./BoardTitle.module.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import InputBase from "../Inputs/InputBase";
import { Check, Close } from "@mui/icons-material";

interface BoardTitleProps {
  title: string;
  onBoardDelete: () => void;
  onBoardRename: (newTitle: string) => void;
}

const BoardTitle: React.FC<BoardTitleProps> = ({
  title: currentTitle,
  onBoardDelete,
  onBoardRename,
}) => {
  const { t } = useTranslation();
  const [edit, setEdit] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(currentTitle);

  const cancelEdit = () => {
    setEdit(false);
    setTitle(currentTitle);
  };
  // component rerender
  useEffect(() => {
    setEdit(false);
    setTitle(currentTitle);
    setLoading(false);
    setConfirmDelete(false);
  }, [currentTitle]);

  return edit ? (
    <div className={cl.edit}>
      <InputBase value={title} onChange={(e) => setTitle(e.target.value)} />
      <div className={cl.edit_controls}>
        <IconButton onClick={cancelEdit} disabled={loading}>
          <Close />
        </IconButton>
        <IconButton
          onClick={() => {
            setLoading(true);
            onBoardRename(title);
          }}
        >
          {loading ? <CircularProgress size={26} /> : <Check />}
        </IconButton>
      </div>
    </div>
  ) : confirmDelete ? (
    <div className={cl.delete}>
      <h2>
        "{title}" {t("board_will_be_deleted")}
      </h2>
      <div className={cl.delete_controls}>
        <Button
          disabled={loading}
          onClick={() => setConfirmDelete(false)}
          variant="outlined"
        >
          {t("task_delete_cancel")}
        </Button>
        <Button
          className={cl.error}
          disabled={loading}
          variant="contained"
          onClick={() => {
            setLoading(true);
            onBoardDelete();
          }}
        >
          {loading ? <CircularProgress size={26} /> : t("task_delete_confirm")}
        </Button>
      </div>
    </div>
  ) : (
    <div className={cl.container}>
      <h1>{currentTitle}</h1>
      <div className={cl.controls}>
        <IconButton onClick={() => setEdit(true)}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => setConfirmDelete(true)}>
          <DeleteOutlineIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default BoardTitle;
