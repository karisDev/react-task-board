import { Button, CircularProgress } from "@mui/material";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { createNewTask } from "../../../firebase/Firestore";
import InputBase from "../Inputs/InputBase";
import TextAreaBase from "../Inputs/TextAreaBase";
import cl from "./NewTaskCard.module.css";

interface EditTaskCardProps {
  updateCallback: (title: string, body: string) => Promise<void>;
  cancelCallback: () => void;
  currentTitle: string;
  currentBody?: string;
}

export const EditTaskCard: React.FC<EditTaskCardProps> = ({
  updateCallback,
  cancelCallback,
  currentTitle,
  currentBody,
}) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState(currentTitle);
  const [body, setBody] = useState(currentBody ? currentBody : "");
  const [titleError, setTitleError] = useState(false);
  const [loading, setLoading] = useState(false);

  const isEmptyOrWhiteSpace = (str: string) =>
    str === null || str.match(/^ *$/) !== null;

  const createTask = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (isEmptyOrWhiteSpace(title)) {
      setTitleError(true);
    } else {
      await updateCallback(title, body);
    }
    setLoading(false);
  };

  const updateHeight = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.currentTarget.style.height = "auto";
    e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
  };

  return (
    <form onSubmit={createTask} className={cl.container}>
      <InputBase
        className={titleError ? cl.error : ""}
        placeholder={t("task_title")}
        value={title}
        disabled={loading}
        onFocus={() => setTitleError(false)}
        onChange={(e) => {
          setTitle(e.currentTarget.value);
        }}
      />
      <TextAreaBase
        className={cl.description}
        disabled={loading}
        onChange={(e) => {
          setBody(e.target.value);
          updateHeight(e);
        }}
        placeholder={t("task_description")}
        value={body}
      />
      <div className={cl.controls}>
        <Button onClick={cancelCallback} size="large" variant="outlined">
          {t("task_cancel")}
        </Button>
        <Button
          disabled={loading}
          type="submit"
          size="large"
          variant="contained"
        >
          {loading ? <CircularProgress size={25} /> : t("task_update")}
        </Button>
      </div>
    </form>
  );
};
