import { useEffect, useState } from "react";
import { appDir, join } from "@tauri-apps/api/path";
import { convertFileSrc } from "@tauri-apps/api/tauri";
import { invoke } from "@tauri-apps/api/tauri";
import Loader from "./Loader";
const PreviewPlayer = ({ projectName }: { projectName: string }) => {
  const [videoURL, setVideoURL] = useState("");
  const [showVideo, setShowVideo] = useState(false);

  const loadFile = async () => {
    setShowVideo(false);
    await invoke("make_video", { path: (await appDir()) + projectName });
    const appDirPath = await appDir();
    const filePath = await join(appDirPath, projectName + "/video.mp4");
    const assetUrl = convertFileSrc(filePath);
    setVideoURL(assetUrl);
    setShowVideo(true);
  };

  useEffect(() => {
    loadFile();
  }, []);

  return (
    <div className="h-[50vh] w-[50vw] ">
      {showVideo ? (
        <video src={videoURL} autoPlay controls></video>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default PreviewPlayer;
