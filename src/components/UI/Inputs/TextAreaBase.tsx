import { ChangeEvent, TextareaHTMLAttributes, useEffect } from "react";
import cl from "./InputBase.module.css";

interface TextAreaBaseProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

const TextAreaBase: React.FC<TextAreaBaseProps> = ({ className, ...rest }) => {
  const updateHeight = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.currentTarget.style.height = "auto";
    e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
  };
  useEffect(() => {}, []);
  return (
    <textarea
      className={[cl.textarea_container, className ? className : ""].join(" ")}
      {...rest}
      onChange={(e) => {
        updateHeight(e);
        rest.onChange && rest.onChange(e);
      }}
    />
  );
};

export default TextAreaBase;
