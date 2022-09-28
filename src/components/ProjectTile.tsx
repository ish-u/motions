import { useLocation } from "wouter";
import fallback_URL from "../assets/fallback_project.jpg";

const ProjectTile = ({ name }: { name: string }) => {
  const [location, setLocation] = useLocation();
  return (
    <div
      className="w-1/4 h-64  flex justify-center items-center"
      onClick={(e) => {
        setLocation(`/project/${name}`);
      }}
    >
      <div className="w-5/6 h-5/6 flex flex-col border-2 border-red-700 rounded-md p-2 bg-red-500/75">
        <div className="h-5/6">
          <img
            className="object-cover object-bottom h-full w-full overflow-hidden p-2 rounded-sm"
            src={fallback_URL}
            alt="project"
          />
        </div>
        <div className="h-1/6 flex items-center px-2 text-lg font-semibold">
          {name}
        </div>
      </div>
    </div>
  );
};

export default ProjectTile;
