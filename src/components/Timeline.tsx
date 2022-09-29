import { convertFileSrc } from "@tauri-apps/api/tauri";

convertFileSrc;
const Timeline = ({
  images,
  setImage,
}: {
  images: string[];
  setImage: (path: string) => void;
}) => {
  return (
    <div className="flex h-1/4 w-full items-center overflow-x-scroll rounded-sm bg-slate-600/75">
      {images.map((image, idx) => {
        return (
          <img
            className="m-2 h-5/6"
            src={convertFileSrc(image)}
            key={idx}
            onClick={() => {
              setImage(convertFileSrc(image));
            }}
          />
        );
      })}
    </div>
  );
};

export default Timeline;
