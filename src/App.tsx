import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";

import Camera from "./Camera";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <div className="bg-emerald-200 min-h-screen w-full">
      <Camera />
    </div>
  );
}

export default App;
