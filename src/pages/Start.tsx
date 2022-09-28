import { useEffect, useState } from "react";
import CreateProjectTile from "../components/CreateProjectTile";
import ProjectTile from "../components/ProjectTile";
import { readDir, BaseDirectory } from "@tauri-apps/api/fs";

const Start = () => {
  const [projects, setProjects] = useState<string[]>([]);

  useEffect(() => {
    const getDirectories = async () => {
      const directories = (await readDir("", { dir: BaseDirectory.App }))
        .map((dir) => (dir.name && dir.children ? dir.name : ""))
        .filter((dir) => dir !== "");
      console.log(directories);
      setProjects(directories);
    };
    getDirectories();
  }, []);

  return (
    <div className="w-full h-full overflow-hidden bg-red-500/50 text-white">
      <div className="flex flex-wrap overflow-y-scroll max-h-full p-8">
        <CreateProjectTile projects={projects} />
        {projects.map((project, idx) => (
          <ProjectTile name={project} key={idx} />
        ))}
      </div>
    </div>
  );
};

export default Start;
