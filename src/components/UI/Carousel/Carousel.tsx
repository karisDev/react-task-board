import { useEffect, useRef } from "react";
import cl from "./Carousel.module.css";

interface CarouselProps {
  children: JSX.Element[];
  currentPage: number;
  vertical?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
  children,
  currentPage,
  vertical,
}) => {
  const carousel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (carousel.current)
      carousel.current.style.transform = vertical
        ? `translateY(-${currentPage * 100}%)`
        : `translateX(-${currentPage * 100}%)`;
  }, [currentPage, vertical]);

  if (!children) {
    return null;
  }
  return (
    <div
      ref={carousel}
      className={[cl.carousel, vertical ? cl.vertical : null].join(" ")}
    >
      {children.map((child, index) => (
        <div key={index} className={cl.page}>
          {child}
        </div>
      ))}
    </div>
  );
};

export default Carousel;
