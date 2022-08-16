import { InputHTMLAttributes } from "react";
import cl from "./InputBase.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const InputBase: React.FC<InputProps> = ({ className, ...rest }) => {
  return (
    <input
      className={[cl.input_container, className ? className : ""].join(" ")}
      {...rest}
    />
  );
};

export default InputBase;
