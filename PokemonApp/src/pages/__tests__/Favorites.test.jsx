import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Favorites from "../Favorites";
import { AuthProvider } from "../../context/AuthContext";
import { AppProvider } from "../../context/AppContext";

describe("Favorites Page", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should render Favorites title when list has data", () => {
    const mockFavorites = [{ id: 1, name: "Pikachu", sprite: "https://example.com/pikachu.png" }];
    localStorage.setItem("favorites", JSON.stringify(mockFavorites));
    render(
      <AuthProvider>
        <AppProvider>
          <BrowserRouter>
            <Favorites />
          </BrowserRouter>
        </AppProvider>
      </AuthProvider>
    );
    expect(screen.getByText("Favorites")).toBeInTheDocument();
  });

  it("should show empty message when no favorites", () => {
    localStorage.setItem("favorites", JSON.stringify([]));
    render(
      <AuthProvider>
        <AppProvider>
          <BrowserRouter>
            <Favorites />
          </BrowserRouter>
        </AppProvider>
      </AuthProvider>
    );
    expect(screen.getByText(/no favorite pokemon yet/i)).toBeInTheDocument();
  });

  it("should allow removing a favorite", async () => {
    const mockFavorites = [{ id: 1, name: "Pikachu", sprite: "https://example.com/pikachu.png" }];
    localStorage.setItem("favorites", JSON.stringify(mockFavorites));
    render(
      <AuthProvider>
        <AppProvider>
          <BrowserRouter>
            <Favorites />
          </BrowserRouter>
        </AppProvider>
      </AuthProvider>
    );
    const removeButton = screen.getByRole("button", { name: /remove/i });
    expect(removeButton).toBeInTheDocument();
    const userEvent = require('@testing-library/user-event').default;
    await userEvent.click(removeButton);
    // after click, the card should be removed
    expect(screen.queryByText(/pikachu/i)).not.toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem("favorites"))).toEqual([]);
  });

  it("should allow adding favorite to team and show message", async () => {
    const mockFavorites = [{ id: 1, name: "Pikachu", sprite: "https://example.com/pikachu.png" }];
    localStorage.setItem("favorites", JSON.stringify(mockFavorites));
    // tests operate as guest user, so set the teams map under 'userTeams' with guest key
    localStorage.setItem("userTeams", JSON.stringify({ guest: [] }));
    render(
      <AuthProvider>
        <AppProvider>
          <BrowserRouter>
            <Favorites />
          </BrowserRouter>
        </AppProvider>
      </AuthProvider>
    );
    const addButton = screen.getByRole("button", { name: /add to team/i });
    const userEvent = require('@testing-library/user-event').default;
    await userEvent.click(addButton);
    expect(screen.getByText(/pikachu added to team/i)).toBeInTheDocument();
    const teams = JSON.parse(localStorage.getItem("userTeams"));
    const team = teams && teams.guest ? teams.guest : [];
    expect(team).toHaveLength(1);
    expect(team[0].id).toBe(1);
  });

  it("should show 'Already on team' when adding duplicate", async () => {
    const mockFavorites = [{ id: 1, name: "Pikachu", sprite: "https://example.com/pikachu.png" }];
    localStorage.setItem("favorites", JSON.stringify(mockFavorites));
    localStorage.setItem("userTeams", JSON.stringify({ guest: [mockFavorites[0]] }));
    render(
      <AuthProvider>
        <AppProvider>
          <BrowserRouter>
            <Favorites />
          </BrowserRouter>
        </AppProvider>
      </AuthProvider>
    );
    const addButton = screen.getByRole("button", { name: /add to team/i });
    const userEvent = require('@testing-library/user-event').default;
    await userEvent.click(addButton);
    expect(screen.getByText(/already on team/i)).toBeInTheDocument();
  });

  it("should show 'Team full' when six already in team", async () => {
    const mockFavorites = [{ id: 2, name: "Charmander", sprite: "https://example.com/charmander.png" }];
    const fullTeam = Array.from({ length: 6 }, (_, i) => ({ id: i+10, name: `Poke${i}`, sprite: "" }));
    localStorage.setItem("favorites", JSON.stringify(mockFavorites));
    localStorage.setItem("userTeams", JSON.stringify({ guest: fullTeam }));
    render(
      <AuthProvider>
        <AppProvider>
          <BrowserRouter>
            <Favorites />
          </BrowserRouter>
        </AppProvider>
      </AuthProvider>
    );
    const addButton = screen.getByRole("button", { name: /add to team/i });
    const userEvent = require('@testing-library/user-event').default;
    await userEvent.click(addButton);
    expect(screen.getByText(/team full/i)).toBeInTheDocument();
  });
});
