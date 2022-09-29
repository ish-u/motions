import { Link, Route } from "wouter";
import Camera from "./pages/Camera";
import Project from "./pages/Project";
import Start from "./pages/Start";

function App() {
  return (
    <div className="h-screen w-screen bg-slate-500 px-16 py-8">
      <div
        className="fixed top-0 left-0 bg-black/50 p-2 text-white"
        onClick={() => {
          console.log("CLICK");
          window.history.back();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
          />
        </svg>
      </div>
      <Route path="/" component={Start} />
      <Route path="/project/:name" component={Project} />
      <Route path="/camera/:name" component={Camera} />
    </div>
  );
}

export default App;
