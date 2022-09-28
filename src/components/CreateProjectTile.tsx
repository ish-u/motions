import { useState } from "react";
import Modal from "./Modal";

const CreateProjectTile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState("");

  return (
    <div
      className="w-1/4 h-64 flex justify-center items-center"
      onClick={() => {
        setIsModalOpen(true);
      }}
    >
      <div className="w-5/6 h-5/6 flex justify-center items-center border-2 border-red-700 rounded-md p-2 bg-red-500/75 group hover:cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-24 h-24 group-hover:w-28 group-hover:h-28 duration-150 font-bold"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </div>

      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        <div className="px-4">
          <div className="text-3xl my-2">Create Project</div>
          <div className="my-6 text-black font-semibold">
            <input
              type="text"
              placeholder="Project Name"
              className="w-full h-10 p-2 rounded-sm outline-none"
              onChange={(e) => {
                setProjectName(e.target.value);
              }}
            />
          </div>
          <div>
            <button
              disabled={projectName === ""}
              className="disabled:bg-emerald-900 bg-emerald-700/75 hover:bg-emerald-700 p-2 mr-4 my-2 font-semibold rounded-sm text-lg"
            >
              Create
            </button>
            <button
              onClick={() => {
                setIsModalOpen(false);
              }}
              className="bg-red-500/75 hover:bg-red-500 p-2 mr-4 my-2 font-semibold rounded-sm text-lg"
            >
              Discard
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CreateProjectTile;
