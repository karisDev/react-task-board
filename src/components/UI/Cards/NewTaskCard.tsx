import { Button, CircularProgress } from "@mui/material";
import { ChangeEvent, ChangeEventHandler, FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { createNewTask } from "../../../firebase/Firestore";
import InputBase from "../Inputs/InputBase";
import TextAreaBase from "../Inputs/TextAreaBase";
import cl from "./NewTaskCard.module.css";

export const NewTaskCard = ({
  createTaskCallback,
}: {
  createTaskCallback: (title: string, body: string) => Promise<void>;
}) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [loading, setLoading] = useState(false);

  const isEmptyOrWhiteSpace = (str: string) =>
    str === null || str.match(/^ *$/) !== null;

  const clearFields = () => {
    setTitle("");
    setBody("");
  };

  const createTask = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (isEmptyOrWhiteSpace(title)) {
      setTitleError(true);
    } else {
      await createTaskCallback(title, body);
      clearFields();
    }
    setLoading(false);
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
        disabled={loading}
        onChange={(e) => {
          setBody(e.target.value);
        }}
        placeholder={t("task_description")}
        value={body}
      />
      <div className={cl.controls}>
        <Button
          disabled={title == "" && body == ""}
          onClick={clearFields}
          size="large"
          variant="outlined"
        >
          {t("task_clear")}
        </Button>
        <Button
          disabled={loading}
          type="submit"
          size="large"
          variant="contained"
        >
          {loading ? <CircularProgress size={25} /> : t("task_create")}
        </Button>
      </div>
    </form>
  );
};
