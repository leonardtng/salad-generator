import {
  Dispatch,
  FC,
  HTMLAttributes,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence } from "framer-motion";
import ReactFocusLock from "react-focus-lock";
import Backdrop from "./Backdrop";
import ModalContent from "./ModalContent";

interface Props extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  handleClose: () => void;
  hideCloseButton?: boolean;
  backdropDismiss?: boolean;
  onExitComplete?: [string, Dispatch<SetStateAction<string>>];
  ariaLabel?: string;
  blurHigh?: boolean;
}

const Modal: FC<Props> = ({
  children,
  className,
  isOpen,
  handleClose,
  hideCloseButton,
  backdropDismiss = true,
  onExitComplete,
  ariaLabel,
  blurHigh = false,
}: Props) => {
  const [trigger, setTrigger] = onExitComplete ?? [undefined, undefined];
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isOpen || event.key !== "Escape") return;

      handleClose();
    },
    [handleClose, isOpen]
  );

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown, isOpen]);

  const [isBrowser, setIsBrowser] = useState(false);
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (!isBrowser) return <></>;

  return createPortal(
    <AnimatePresence
      initial={false}
      exitBeforeEnter={true}
      onExitComplete={() =>
        setTrigger && trigger === "fired" && setTrigger("completed")
      }
    >
      {isOpen && (
        <Backdrop
          handleClose={backdropDismiss ? handleClose : undefined}
          blurHigh={blurHigh}
        >
          <ReactFocusLock>
            <ModalContent
              className={className}
              handleClose={hideCloseButton ? undefined : handleClose}
              ariaLabel={ariaLabel}
            >
              {children}
            </ModalContent>
          </ReactFocusLock>
        </Backdrop>
      )}
    </AnimatePresence>,
    document.getElementById("modal-portal")!
  );
};

export default Modal;
