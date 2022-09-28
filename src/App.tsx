import { Link, Route } from "wouter";
import Camera from "./pages/Camera";
import Project from "./pages/Project";
import Start from "./pages/Start";

function App() {
  return (
    <div className="">
      <div className="z-50 p-4 w-2/6 flex justify-between">
        <Link href="/">Start</Link>
        <Link href="/project">Project</Link>

        <Link href="/camera">Camera</Link>
      </div>

      <Route path="/" component={Start} />
      <Route path="/project" component={Project} />
      <Route path="/camera" component={Camera} />
    </div>
  );
}

export default App;
