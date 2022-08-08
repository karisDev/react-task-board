import { useNavigate } from "react-router-dom";
import { IBoard } from "../../../interfaces/appInterfaces";
import cl from "./BoardCard.module.css";

interface BoardCardProps {
  board: IBoard;
}

const BoardCard: React.FC<BoardCardProps> = ({ board }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/board/" + board.id)}
      className={cl.container}
    >
      <h2>{board.title}</h2>
    </div>
  );
};

export default BoardCard;
