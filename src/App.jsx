import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreatePresentation from "./pages/CreatePresentation";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-presentation" element={<CreatePresentation />} />
    </Routes>
  );
}

export default App;
