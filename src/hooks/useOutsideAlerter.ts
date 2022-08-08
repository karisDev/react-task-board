// thanks to https://stackoverflow.com/a/42234988/14555418
// hook helps us to detect click outside any component
import { useEffect } from "react";

export function useOutsideAlerter(
  ref: React.RefObject<HTMLElement> | null,
  callback: () => void
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref && ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
}
