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
        className="fixed top-0 left-0 flex h-screen w-screen items-center justify-center bg-black/50"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(false);
        }}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="max-h-full max-w-full rounded-md border-2 border-emerald-800 bg-emerald-500/90 p-2 px-4 py-6"
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
