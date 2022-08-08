import { Button, CircularProgress } from "@mui/material";
import { ChangeEvent, ChangeEventHandler, FormEvent, useState } from "react";
import { createNewTask } from "../../../firebase/Firestore";
import InputBase from "../Inputs/InputBase";
import cl from "./NewTaskCard.module.css";

export const EditTaskCard = ({
  updateCallback,
  cancelCallback,
  currentTitle,
  currentBody,
}: {
  updateCallback: (title: string, body: string) => Promise<void>;
  cancelCallback: () => void;
  currentTitle: string;
  currentBody?: string;
}) => {
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
      <input
        className={[cl.title, titleError ? cl.error : null].join(" ")}
        placeholder="Title"
        value={title}
        disabled={loading}
        onFocus={() => setTitleError(false)}
        onChange={(e) => {
          setTitle(e.currentTarget.value);
        }}
      />
      <textarea
        className={cl.description}
        disabled={loading}
        onChange={(e) => {
          setBody(e.target.value);
          updateHeight(e);
        }}
        placeholder="Description"
        value={body}
      />
      <div className={cl.controls}>
        <Button onClick={cancelCallback} size="large" variant="outlined">
          Cancel
        </Button>
        <Button
          disabled={loading}
          type="submit"
          size="large"
          variant="contained"
        >
          {loading ? <CircularProgress size={25} /> : "Update"}
        </Button>
      </div>
    </form>
  );
};
