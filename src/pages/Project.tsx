import { BaseDirectory, readDir } from "@tauri-apps/api/fs";
import { convertFileSrc } from "@tauri-apps/api/tauri";
import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import {
  CameraButton,
  DemoButton,
  ExportButton,
  SettingButton,
} from "../components/Buttons";
import Modal from "../components/Modal";
import PreviewPlayer from "../components/PreviewPlayer";
import Timeline from "../components/Timeline";
const Project = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [match, params] = useRoute("/project/:name");
  const [projectName, setProjectName] = useState("");
  const [image, setImage] = useState("");
  const [images, setImages] = useState<string[]>([]);

  const getImages = async () => {
    const dirName = params?.name.replaceAll("%20", " ") || "";
    setProjectName(params?.name.replaceAll("%20", " ") || "");
    const dir = (await readDir(dirName, { dir: BaseDirectory.App }))
      .map((img) => img.path)
      .filter((img) => img.split(".").at(-1) === "png");
    dir.sort(function (a, b) {
      return a.localeCompare(b, undefined, {
        numeric: true,
        sensitivity: "base",
      });
    });

    setImages(dir);
    if (dir.length) {
      setImage(convertFileSrc(dir[0]));
    }
  };

  useEffect(() => {
    getImages();
  }, []);

  return (
    <div className="h-full w-full text-white">
      <div className="flex h-3/4 items-center justify-center">
        <div className="flex h-full w-1/6 flex-col items-center">
          <div
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            <DemoButton />
          </div>
          <ExportButton />
        </div>
        <img src={image} alt="" className="h-full grow p-4" />
        <div className="flex h-full w-1/6 flex-col items-center">
          <CameraButton projectName={projectName} />
          <SettingButton />
        </div>
      </div>
      <Timeline images={images} setImage={setImage} />
      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        <PreviewPlayer projectName={projectName} />
      </Modal>
    </div>
  );
};

export default Project;
