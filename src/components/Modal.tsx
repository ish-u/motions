import React from "react";

const Modal = ({
  isOpen,
  setIsOpen,
  children,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  children: React.ReactNode;
}) => {
  if (isOpen) {
    return (
      <div
        className="fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(false);
        }}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="w-2/6 max-h-4/6 border-2 rounded-md border-emerald-800 p-2 bg-emerald-500/90 px-4 py-6"
        >
          {children}
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default Modal;
