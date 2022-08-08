import {
  AddRounded,
  ArrowDropDown,
  ArrowDropUp,
  CheckRounded,
  CloseRounded,
} from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import { useContext, useState } from "react";
import { AuthUserContext } from "../../../firebase/AuthUserContext";
import { createNewBoard } from "../../../firebase/Firestore";
import { IBoard } from "../../../interfaces/appInterfaces";
import cl from "./Navbar.module.css";
import ListIcon from "@mui/icons-material/List";
import { useNavigate } from "react-router-dom";

const BoardsDropdown = ({
  boards,
  onBoardClick,
}: {
  boards?: IBoard[];
  onBoardClick: () => void;
}) => {
  const [boardsExpanded, setBoardsExpanded] = useState(true);
  const [boardName, setBoardName] = useState("");
  const [createBoardExpanded, setCreateBoardExpanded] = useState(false);
  const authUser = useContext(AuthUserContext);
  const navigate = useNavigate();

  const expandBoards = () => {
    setCreateBoardExpanded(true);
    setTimeout(() => {
      (document.getElementById("boardNameInput") as HTMLInputElement)!.focus();
    }, 100);
  };

  const createNewBoardHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (boardName.length != 0) {
      const createdBoard = await createNewBoard(boardName);
      await authUser?.updateDb();
      setTimeout(() => {
        navigate("/board/" + createdBoard.id);
      }, 500);
    }
    setBoardName("");
    setCreateBoardExpanded(false);
  };

  return (
    <>
      <button
        onClick={() => setBoardsExpanded(!boardsExpanded)}
        className={cl.nav__boards_expand}
      >
        <h3>Your boards</h3>
        {boardsExpanded ? <ArrowDropUp /> : <ArrowDropDown />}
      </button>
      {boardsExpanded && (
        <div className={cl.nav__boards}>
          {createBoardExpanded ? (
            <form
              onSubmit={createNewBoardHandler}
              className={cl.boards__new_board}
            >
              <input
                id="boardNameInput"
                onChange={(e) => setBoardName(e.target.value)}
                value={boardName}
                placeholder="Write name here"
              />
              <IconButton type="submit">
                {boardName.length == 0 ? <CloseRounded /> : <CheckRounded />}
              </IconButton>
            </form>
          ) : (
            <Button
              onClick={expandBoards}
              startIcon={<AddRounded />}
              className={cl.nav__btn_standart}
            >
              Create new board
            </Button>
          )}
          {boards &&
            boards.map((board, index) => (
              <Button
                key={index}
                onClick={() => {
                  onBoardClick();
                  navigate("/board/" + board.id);
                }}
                startIcon={<ListIcon />}
                className={[
                  cl.nav__btn_standart,
                  window.location.href.split("/")[4] == board.id.toString()
                    ? cl.active
                    : null,
                ].join(" ")}
              >
                {board.title}
              </Button>
            ))}
        </div>
      )}
    </>
  );
};

export default BoardsDropdown;
