import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  handleClose?: () => void;
  anchor?: "left" | "right" | "center";
  blurHigh?: boolean;
}

const Backdrop = ({
  children,
  handleClose,
  anchor = "center",
  blurHigh = false,
}: Props) => (
  <div
    className={`
      z-50 fixed inset-0
      flex items-center ${
        anchor === "left"
          ? "justify-start"
          : anchor === "right"
          ? "justify-end"
          : "justify-center"
      }
      bg-backdrop backdrop-filter ${
        blurHigh ? "backdrop-blur-xl" : "backdrop-blur-sm"
      } backdrop-brightness-75
    `}
    onClick={handleClose}
  >
    {children}
  </div>
);

export default Backdrop;
