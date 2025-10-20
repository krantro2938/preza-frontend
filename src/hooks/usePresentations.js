import { useState, useEffect } from "react";

const STORAGE_KEY = "presentations";

export function usePresentations() {
  const [presentations, setPresentations] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    console.log("Loading presentations from localStorage:", stored);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        console.log("Parsed presentations:", parsed);
        setPresentations(parsed);
      } catch (error) {
        console.error("Error parsing stored presentations:", error);
      }
    } else {
      console.log("No presentations found in localStorage");
    }
  }, []);

  useEffect(() => {
    console.log("Saving presentations to localStorage:", presentations);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(presentations));
  }, [presentations]);

  const createPresentation = async (presentationData) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const response = await fetch(`http://${backendUrl}/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(presentationData),
    });

    if (!response.ok) {
      throw new Error("Ошибка создания презентации");
    }

    const newPresentation = await response.json();
    setPresentations((prev) => [...prev, newPresentation]);
    console.log("added new presentation")
    return newPresentation;
  };

  const getPresentation = (id) => {
    return presentations.find((p) => p.id === id);
  };

  const updatePresentation = (id, updates) => {
    setPresentations((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    );
  };

  const deletePresentation = (id) => {
    setPresentations((prev) => prev.filter((p) => p.id !== id));
  };

  const addPresentation = (presentation) => {
    setPresentations((prev) => [presentation, ...prev])
  }

  return {
    presentations,
    createPresentation,
    getPresentation,
    updatePresentation,
    deletePresentation,
    addPresentation
  };
}
