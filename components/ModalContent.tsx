import { FC, HTMLAttributes } from "react";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";

interface Props extends HTMLAttributes<HTMLDivElement> {
  handleClose?: () => void;
  ariaLabel?: string;
}

const ModalContent: FC<Props> = ({
  className,
  children,
  handleClose,
  ariaLabel,
}: Props) => (
  <motion.div
    tabIndex={-1}
    role="dialog"
    aria-modal={true}
    aria-label={ariaLabel}
    className={`relative ${
      className || "m-5 p-5 bg-darkModal rounded-lg shadow-lg"
    }`}
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{
      duration: 0.2,
      ease: [0, 0.71, 0.2, 1.01],
    }}
    exit="exit"
    onClick={(event) => event.stopPropagation()}
  >
    {children}
    {handleClose && (
      <motion.button
        whileHover={{
          scale: 1.2,
          transition: { duration: 0.3 },
        }}
        whileTap={{ scale: 0.9 }}
        className="absolute top-0 right-0 p-7"
        onClick={handleClose}
        aria-label={`Close ${ariaLabel || "dialog"}`}
      >
        <FaTimes />
      </motion.button>
    )}
  </motion.div>
);

export default ModalContent;
