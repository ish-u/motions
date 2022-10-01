import { Link, Route } from "wouter";
import { WindowControlButtons } from "./components/Buttons";
import Camera from "./pages/Camera";
import Project from "./pages/Project";
import Start from "./pages/Start";

function App() {
  return (
    <div className="h-screen w-screen bg-slate-500 px-16 py-8">
      <WindowControlButtons />
      <Route path="/" component={Start} />
      <Route path="/project/:name" component={Project} />
      <Route path="/camera/:name" component={Camera} />
    </div>
  );
}

export default App;
