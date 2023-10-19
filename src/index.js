import { createRoot } from "react-dom/client";
import { ReactFlowProvider } from "reactflow";
import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <ReactFlowProvider>
    <App />
  </ReactFlowProvider>
);
