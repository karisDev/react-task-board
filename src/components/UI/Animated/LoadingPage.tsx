import { Skeleton } from "@mui/material";
import cl from "./LoadingPage.module.css";

const LoadingPage = () => {
  const SkeletonNavHeader = <Skeleton width="200px" height="70px" />;
  const SkeletonNavItem = <Skeleton height="66px" />;
  const SkeletonNavShort = <Skeleton width="150px" height="40px" />;
  const SkeletonNavBoard = <Skeleton height="70px" />;
  const SkeletonBoardsHeader = <Skeleton height="70px" />;
  const SkeletonBoardsItem = <Skeleton height="25em" width="auto" />;
  return (
    <div className={cl.container}>
      <div className={cl.nav}>
        {SkeletonNavHeader}
        <Skeleton width="150px" height="40px" />
        <br />
        {SkeletonNavItem}
        {SkeletonNavItem}
        <br />
        <br />
        {SkeletonNavShort}
        <br />
        {SkeletonNavBoard}
        {SkeletonNavBoard}
        {SkeletonNavBoard}
      </div>
      <div className={cl.boards}>
        {SkeletonBoardsHeader}
        <div className={cl.row}>
          {SkeletonBoardsItem}
          {SkeletonBoardsItem}
          {SkeletonBoardsItem}
          {SkeletonBoardsItem}
          {SkeletonBoardsItem}
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
