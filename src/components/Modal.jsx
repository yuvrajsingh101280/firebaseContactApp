import { createPortal } from "react-dom";
import { IoMdClose } from "react-icons/io";

const Modal = ({ onClose, isOpen, children }) => {
  return createPortal(
    <>
      {isOpen && (
        <>
          <div className=" z-[100] m-auto relative min-h-[200px] max-w-[80%]  bg-white">
            <div className="flex justify-end p-4">
              <IoMdClose
                onClick={onClose}
                className="text-2xl cursor-pointer"
              />
            </div>
            {children}
          </div>
          <div
            onClick={onClose}
            className="h-screen w-screen backdrop-blur absolute top-0 z-[80]"
          />
        </>
      )}
    </>,
    document.getElementById("modal-root")
  );
};

export default Modal;
