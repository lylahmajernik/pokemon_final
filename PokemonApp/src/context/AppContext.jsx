import React, { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [myTeam, setMyTeam] = useState([]);

  useEffect(() => {
    const savedFavs = JSON.parse(localStorage.getItem("favorites")) || [];
    const savedTeam = JSON.parse(localStorage.getItem("myTeam")) || [];
    setFavorites(savedFavs);
    setMyTeam(savedTeam);
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("myTeam", JSON.stringify(myTeam));
  }, [myTeam]);

  const addFavorite = (pokemon) => {
    if (!favorites.some((p) => p.id === pokemon.id)) {
      setFavorites((prev) => [...prev, pokemon]);
      return true;
    }
    return false;
  };

  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((p) => p.id !== id));
  };

  const addToTeam = (pokemon) => {
    if (myTeam.some((p) => p.id === pokemon.id)) return { ok: false, reason: "already" };
    if (myTeam.length >= 6) return { ok: false, reason: "full" };
    setMyTeam((prev) => [...prev, pokemon]);
    return { ok: true };
  };

  const removeFromTeam = (id) => {
    setMyTeam((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <AppContext.Provider value={{ favorites, myTeam, addFavorite, removeFavorite, addToTeam, removeFromTeam }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within AppProvider");
  return ctx;
}

export default AppContext;
