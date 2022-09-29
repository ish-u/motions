import { useState } from "react";
import Loader from "./Loader";
import Modal from "./Modal";
import { BaseDirectory } from "@tauri-apps/api/path";
import { createDir, writeTextFile } from "@tauri-apps/api/fs";
import { useLocation } from "wouter";

const CreateProjectTile = ({ projects }: { projects: string[] }) => {
  const [location, setLocation] = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [loading, setLoading] = useState(false);
  const [exists, setExists] = useState(false);

  const createProject = async () => {
    if (!projects.includes(projectName)) {
      setLoading(true);
      await createDir(projectName, { dir: BaseDirectory.App });
      await writeTextFile(
        projectName + "\\" + projectName + ".json",
        JSON.stringify({ frames: 0 }),
        {
          dir: BaseDirectory.App,
        }
      );
      setIsModalOpen(false);
      setLoading(false);
      setLocation(`project/${projectName}`);
    }
  };

  return (
    <div
      className="flex h-64 w-1/4 items-center justify-center"
      onClick={() => {
        setIsModalOpen(true);
      }}
    >
      <div className="group flex h-5/6 w-5/6 items-center justify-center rounded-md border-2 border-red-700 bg-red-500/75 p-2 hover:cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-24 w-24 font-bold duration-150 group-hover:h-28 group-hover:w-28"
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
            <div className="my-2 text-3xl">Create Project</div>
            <div className="mt-6 font-semibold text-black">
              <input
                type="text"
                placeholder="Project Name"
                className={`h-10 w-full rounded-sm p-2 outline-none disabled:bg-white/75 ${
                  exists ? "border-2 border-red-500 " : ""
                }`}
                onChange={(e) => {
                  setProjectName(e.target.value);
                  setExists(projects.includes(e.target.value));
                }}
                disabled={loading}
              />
            </div>
            <div className="my-2 text-sm font-semibold">
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
                    className="my-2 mr-4 rounded-sm bg-emerald-700/75 p-2 text-lg font-semibold hover:bg-emerald-700 disabled:bg-emerald-600"
                  >
                    Create
                  </button>
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                    }}
                    className="my-2 mr-4 rounded-sm bg-red-500/75 p-2 text-lg font-semibold hover:bg-red-500"
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
