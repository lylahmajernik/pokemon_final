import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
// AI used to clean and format code, as well as debug

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [myTeam, setMyTeam] = useState([]);

  const { user } = useAuth();

  const TEAMS_KEY = 'userTeams';

  function loadTeamsMap() {
    try {
      return JSON.parse(localStorage.getItem(TEAMS_KEY) || '{}');
    } catch (e) {
      return {};
    }
  }

  function saveTeamsMap(map) {
    try { localStorage.setItem(TEAMS_KEY, JSON.stringify(map)); } catch (e) {}
  }

  useEffect(() => {
    const savedFavs = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavs);

    // load the team for the current user (or guest)
    const map = loadTeamsMap();
    const key = user && user.username ? user.username : 'guest';
    const savedTeam = map[key] || [];
    setMyTeam(savedTeam);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // when auth user changes, load their team
    const map = loadTeamsMap();
    const key = user && user.username ? user.username : 'guest';
    const savedTeam = map[key] || [];
    setMyTeam(savedTeam);
  }, [user]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    // persist current user's team (or guest) into the teams map
    const map = loadTeamsMap();
    const key = user && user.username ? user.username : 'guest';
    map[key] = myTeam;
    saveTeamsMap(map);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myTeam, user]);

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
