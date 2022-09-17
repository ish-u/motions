import { invoke } from "@tauri-apps/api";
import { BaseDirectory, createDir } from "@tauri-apps/api/fs";
import { useEffect, useRef, useState } from "react";
import { appDir, join } from "@tauri-apps/api/path";
import { v4 as uuidv4 } from "uuid";
import { convertFileSrc } from "@tauri-apps/api/tauri";

interface devicesInterface {
  deviceId: string;
  label: string;
}

const Camera = () => {
  const [devices, setDevices] = useState<devicesInterface[]>([]);
  const [deviceId, setDeviceId] = useState<string | undefined>(undefined);
  const videoRef = useRef<HTMLVideoElement>(null);
  const photoRef = useRef<HTMLCanvasElement>(null);
  const [index, setIndex] = useState(0);
  const [disbale, setDisable] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [videoURL, setVideoURL] = useState("");

  const loadFile = async () => {
    const appDirPath = await appDir();
    const filePath = await join(appDirPath, "motions/video.mp4");
    console.log(filePath);
    const assetUrl = convertFileSrc(filePath);
    setVideoURL(assetUrl);
    setShowVideo(true);
  };

  const getDevices = async () => {
    // navigator.mediaDevices.getUserMedia({ video: true });
    const availableDevices = await navigator.mediaDevices.enumerateDevices();
    availableDevices.forEach((device) => {
      if (device.deviceId !== "") {
        setDevices((prev) => {
          if (prev.findIndex((x) => x.deviceId === device.deviceId) === -1) {
            return [
              ...prev,
              { deviceId: device.deviceId, label: device.label },
            ];
          }
          return prev;
        });
      }
    });
  };

  const getVideo = async () => {
    if (deviceId !== undefined) {
      navigator.mediaDevices
        .getUserMedia({
          video: {
            width: 1920,
            height: 1080,
            deviceId: deviceId,
          },
        })
        .then((stream) => {
          let video = videoRef.current;
          if (video) {
            video.srcObject = stream;
            video.play();
          }
        })
        .catch((err) => console.error(err));
    }
  };

  const getPhoto = async () => {
    setDisable(true);
    const width = 1920;
    const height = 1080;

    const video = videoRef.current;
    const photo = photoRef.current;

    if (photo && video) {
      photo.width = width;
      photo.height = height;

      let ctx = photo.getContext("2d");
      ctx?.drawImage(video, 0, 0, photo.width, photo.height);

      const path = await appDir();
      // await createDir("motions", { dir: BaseDirectory.App });
      console.log(path + "motions");

      const imageData = photo.toDataURL();
      const base64Data = imageData.replace(/^data:image\/png;base64,/, "");

      await invoke("image_data", {
        data: base64Data,
        path: path + "motions/image" + index + ".png",
      });
      setIndex((prev) => prev + 1);
      setDisable(false);
      const appDirPath = await appDir();
      const filePath = await join(appDirPath, "motions/video.mp4");
      setVideoURL(filePath);
      setShowVideo(true);
    }
  };

  useEffect(() => {
    getDevices();
  }, []);

  useEffect(() => {
    getVideo();
  }, [videoRef, deviceId]);

  return (
    <div>
      <div className="camera">
        <video className="h-screen w-screen" ref={videoRef}></video>
      </div>
      <div className="photo fixed top-0 flex justify-center h-64 w-64">
        <canvas className="" ref={photoRef}></canvas>
      </div>
      {showVideo && (
        <div className="z-50">
          <video src={videoURL} autoPlay loop></video>
        </div>
      )}
      <div className="click flex w-full justify-center items-center absolute bottom-8">
        <button
          onClick={() => {
            getPhoto();
          }}
          className="m-2 border border-lime-600 w-fit text-2xl p-2 rounded-xl font-bold bg-lime-400 hover:bg-lime-500"
          disabled={disbale}
        >
          click
        </button>
        <button
          onClick={async () => {
            setShowVideo(false);
            await invoke("make_video", { path: await appDir() });
            setShowVideo(true);
          }}
          className="m-2 border border-lime-600 w-fit text-2xl p-2 rounded-xl font-bold bg-lime-400 hover:bg-lime-500"
        >
          make video
        </button>
        <button
          onClick={async () => {
            loadFile();
          }}
          className="m-2 border border-lime-600 w-fit text-2xl p-2 rounded-xl font-bold bg-lime-400 hover:bg-lime-500"
        >
          load
        </button>
        <select
          className="h-10 m-2"
          id="device"
          name="device"
          defaultValue={"DEFAULT"}
          onChange={(e) => setDeviceId(e.target.value)}
        >
          <option value="DEFAULT" disabled>
            Choose Camera
          </option>
          {devices.map((device) => (
            <option key={device.deviceId} value={device.deviceId}>
              {device.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Camera;
