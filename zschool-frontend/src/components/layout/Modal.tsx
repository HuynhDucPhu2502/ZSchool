import { createPortal } from "react-dom";

type Props = {
  children: React.ReactNode;
};

const Modal: React.FC<Props> = ({ children }) => {
  const modalContainer = document.getElementById("modal");
  if (!modalContainer) return;

  return createPortal(
    <dialog className="h-screen w-full fixed inset-0 flex justify-center items-center bg-black/50 z-50">
      <div className="w-fit border-2 border-black p-4 rounded-lg bg-white">
        {children}
      </div>
    </dialog>,
    modalContainer
  );
};

export default Modal;
