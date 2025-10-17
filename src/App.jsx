import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreatePresentation from "./pages/CreatePresentation";
import ViewPresentation from "./pages/ViewPresentation/index.jsx";
import NotFoundPage from "./pages/Page404/index.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-presentation" element={<CreatePresentation />} />
      <Route path="/presentation/:id" element={<ViewPresentation />} />
      <Route path={"*"} element={<NotFoundPage/>}/>
    </Routes>
  );
}

export default App;
