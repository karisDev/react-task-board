import BoardCard from "../../components/UI/Cards/BoardCard";
import { IBoard } from "../../interfaces/appInterfaces";
import cl from "./MainPage.module.css";

interface DashboardPageProps {
  boards: IBoard[];
}

const DashboardPage: React.FC<DashboardPageProps> = ({
  boards,
}: DashboardPageProps) => {
  return (
    <div className={cl.dashboard}>
      <h1>Dashboard</h1>
      <div className={cl.dashboard__items}>
        {boards.map((board, index) => (
          <BoardCard key={index} board={board} />
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
