import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

type Props = {
  children: React.ReactNode;
};

export type ModalHandle = {
  open: () => void;
  close: () => void;
};

const Modal = forwardRef<ModalHandle, Props>(({ children }, ref) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => ({
    open: () => {
      if (dialogRef.current && !dialogRef.current.open)
        dialogRef.current.showModal();
    },
    close: () => {
      if (dialogRef.current && dialogRef.current.open)
        dialogRef.current.close();
    },
  }));

  const modalContainer = document.getElementById("modal");
  if (!modalContainer) return;

  return createPortal(
    <dialog
      ref={dialogRef}
      className="h-screen w-full fixed inset-0 flex justify-center items-center bg-black/50 z-50"
    >
      <div className="w-fit border-2 border-black p-4 rounded-lg bg-white">
        {children}
      </div>
    </dialog>,
    modalContainer
  );
});

export default Modal;
