import { useEffect, useState } from "react";
import CreateProjectTile from "../components/CreateProjectTile";
import ProjectTile from "../components/ProjectTile";
import { readDir, BaseDirectory, exists, createDir } from "@tauri-apps/api/fs";

const Start = () => {
  const [projects, setProjects] = useState<string[]>([]);

  useEffect(() => {
    const getDirectories = async () => {
      const check = (await exists("", { dir: BaseDirectory.App })) as unknown;
      if (check === false) {
        await createDir("", { dir: BaseDirectory.App });
      }
      const directories = (await readDir("", { dir: BaseDirectory.App }))
        .map((dir) => (dir.name && dir.children ? dir.name : ""))
        .filter((dir) => dir !== "");
      console.log(directories);
      setProjects(directories);
      await navigator.mediaDevices.getUserMedia({ video: true });
    };
    getDirectories();
  }, []);

  return (
    <div className="h-full w-full overflow-hidden bg-red-500/50 text-white">
      <div className="flex max-h-full flex-wrap overflow-y-scroll p-8">
        <CreateProjectTile projects={projects} />
        {projects.map((project, idx) => (
          <ProjectTile name={project} key={idx} />
        ))}
      </div>
    </div>
  );
};

export default Start;
