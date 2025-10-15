import { useState, useEffect } from "react";

const STORAGE_KEY = "presentations";

export function usePresentations() {
  const [presentations, setPresentations] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setPresentations(JSON.parse(stored));
      } catch (error) {
        console.error("Error parsing stored presentations:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(presentations));
  }, [presentations]);

  const createPresentation = async (presentationData) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const response = await fetch(`${backendUrl}/presentations`, {
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

  return {
    presentations,
    createPresentation,
    getPresentation,
    updatePresentation,
    deletePresentation,
  };
}
