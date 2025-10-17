import { Routes, Route } from "react-router-dom";
import { createContext, useContext } from "react";
import Home from "./pages/Home";
import CreatePresentation from "./pages/CreatePresentation";
import ViewPresentation from "./pages/ViewPresentation/index.jsx";
import Dashboard from "./pages/Dashboard/index.jsx";
import { usePresentations } from "./hooks/usePresentations";

const PresentationsContext = createContext();

export const usePresentationsContext = () => {
  const context = useContext(PresentationsContext);
  if (!context) {
    throw new Error("usePresentationsContext must be used within PresentationsProvider");
  }
  return context;
};

function PresentationsProvider({ children }) {
  const presentationsData = usePresentations();
  return (
    <PresentationsContext.Provider value={presentationsData}>
      {children}
    </PresentationsContext.Provider>
  );
}

function App() {
  return (
    <PresentationsProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-presentation" element={<CreatePresentation />} />
        <Route path="/presentation/:id" element={<ViewPresentation />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </PresentationsProvider>
  );
}

export default App;
