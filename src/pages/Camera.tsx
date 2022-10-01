import { useEffect, useRef, useState } from "react";
import { useRoute } from "wouter";
import { invoke } from "@tauri-apps/api";
import { appDir, BaseDirectory } from "@tauri-apps/api/path";
import { readTextFile, writeTextFile } from "@tauri-apps/api/fs";
import OnionLayerSlider from "../components/OnionLayerSlider";
import { ClickButton } from "../components/Buttons";

interface devicesInterface {
  deviceId: string;
  label: string;
}

const Camera = () => {
  const [match, params] = useRoute("/camera/:name");
  const [projectName, setProjectName] = useState("");
  const [devices, setDevices] = useState<devicesInterface[]>([]);
  const [deviceId, setDeviceId] = useState<string | undefined>(undefined);
  const [index, setIndex] = useState(0);
  const [disableShutter, setDisableShutter] = useState(false);
  const cameraRef = useRef<HTMLVideoElement>(null);
  const photoRef = useRef<HTMLCanvasElement>(null);
  const [opacity, setOpacity] = useState(100);

  const initCamera = async () => {
    if (deviceId !== undefined) {
      await navigator.mediaDevices
        .getUserMedia({
          video: {
            width: 1920,
            height: 1080,
            deviceId: deviceId,
          },
        })
        .then((stream) => {
          let video = cameraRef.current;
          if (video) {
            video.srcObject = stream;
            video.play();
          }
        })
        .catch((err) => console.error(err));
    }
  };

  const getDevices = async () => {
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

  const getPhoto = async () => {
    setDisableShutter(true);

    const width = 1920;
    const height = 1080;

    const camera = cameraRef.current;
    const photo = photoRef.current;

    if (camera && photo && deviceId) {
      photo.width = width;
      photo.height = height;

      let ctx = photo.getContext("2d");
      ctx?.drawImage(camera, 0, 0, photo.width, photo.height);

      const path = await appDir();

      const imageData = photo.toDataURL();
      const base64Data = imageData.replace(/^data:image\/png;base64,/, "");

      await invoke("image_data", {
        data: base64Data,
        path: path + projectName + "/image" + index + ".png",
      });
      await writeTextFile(
        projectName + "\\" + projectName + ".json",
        JSON.stringify({ frames: index }),
        {
          dir: BaseDirectory.App,
        }
      );
      setIndex((prev) => prev + 1);
    }
    setDisableShutter(false);
  };

  const getFrames = async (project: string) => {
    console.log(project);
    const content = await readTextFile(project + "\\" + project + ".json", {
      dir: BaseDirectory.App,
    });
    const settings = JSON.parse(content);
    setIndex((settings?.frames as number) + 1);
  };

  useEffect(() => {
    setProjectName(params?.name.replaceAll("%20", " ") || "");
    getDevices();
    getFrames(params?.name.replaceAll("%20", " ") || "");
  }, []);

  useEffect(() => {
    initCamera();
  }, [deviceId]);

  return (
    <div className="relative h-full  text-white">
      <div className="relative z-10 flex h-full justify-evenly">
        <video
          className={`w-10/12`}
          style={{
            opacity: opacity / 100,
          }}
          ref={cameraRef}
        ></video>
        <div className="absolute top-0 left-0 -z-10 flex h-full items-center justify-evenly">
          <canvas className=" w-10/12" ref={photoRef}></canvas>
          <div className="  w-1/12 "></div>
        </div>

        <div className=" flex w-1/12 flex-col items-center justify-center align-middle">
          <div className="flex h-1/6 items-center">
            <div
              onClick={() => {
                if (!disableShutter) {
                  getPhoto();
                }
              }}
            >
              <ClickButton />
            </div>
          </div>
          <div className="min-w-14 flex h-14 items-center justify-center rounded-md bg-slate-800 p-4 text-4xl font-bold">
            {index}
          </div>
          <div className="h-3/6 w-2/3">
            <OnionLayerSlider setOpacity={setOpacity} />
          </div>
        </div>
      </div>
      <select
        className="absolute bottom-0 left-8 z-50 m-2 h-fit rounded-md bg-slate-600 p-2 text-xl font-semibold outline-none"
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
  );
};

export default Camera;
