import { useState } from "react";
import Loader from "./Loader";
import Modal from "./Modal";
import { BaseDirectory } from "@tauri-apps/api/path";
import { createDir} from "@tauri-apps/api/fs";

const CreateProjectTile = ({ projects }: { projects: string[] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [loading, setLoading] = useState(false);
  const [exists, setExists] = useState(false);

  const createProject = async () => {
    if (!projects.includes(projectName)) {
      setLoading(true);
      await createDir(projectName, { dir: BaseDirectory.App });
      setIsModalOpen(false);
      setLoading(false);
    }
  };

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
        <>
          <div className="px-4">
            <div className="text-3xl my-2">Create Project</div>
            <div className="mt-6 text-black font-semibold">
              <input
                type="text"
                placeholder="Project Name"
                className={`w-full h-10 p-2 rounded-sm outline-none disabled:bg-white/75 ${
                  exists ? "border-red-500 border-2 " : ""
                }`}
                onChange={(e) => {
                  setProjectName(e.target.value);
                  setExists(projects.includes(e.target.value));
                }}
                disabled={loading}
              />
            </div>
            <div className="text-sm font-semibold my-2">
              {exists && "name exists"}
            </div>

            <div>
              {loading ? (
                <Loader />
              ) : (
                <>
                  <button
                    onClick={createProject}
                    disabled={projectName === "" || exists}
                    className="disabled:bg-emerald-600 bg-emerald-700/75 hover:bg-emerald-700 p-2 mr-4 my-2 font-semibold rounded-sm text-lg"
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
                </>
              )}
            </div>
          </div>
        </>
      </Modal>
    </div>
  );
};

export default CreateProjectTile;
