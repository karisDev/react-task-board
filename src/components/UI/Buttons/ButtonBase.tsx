import React from "react";
import cl from "./ButtonBase.module.css";

const ButtonBase = ({
  children,
  className,
  ...otherProps
}: {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}) => {
  return (
    <button className={[cl.container, className].join(" ")} {...otherProps}>
      {children}
    </button>
  );
};

export default ButtonBase;
