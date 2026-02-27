import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Favorites from "../Favorites";

describe("Favorites Page", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should render Favorites title when list has data", () => {
    const mockFavorites = [{ id: 1, name: "Pikachu", sprite: "https://example.com/pikachu.png" }];
    localStorage.setItem("favorites", JSON.stringify(mockFavorites));
    render(
      <BrowserRouter>
        <Favorites />
      </BrowserRouter>
    );
    expect(screen.getByText("Favorites")).toBeInTheDocument();
  });

  it("should show empty message when no favorites", () => {
    localStorage.setItem("favorites", JSON.stringify([]));
    render(
      <BrowserRouter>
        <Favorites />
      </BrowserRouter>
    );
    expect(screen.getByText(/no favorite pokemon yet/i)).toBeInTheDocument();
  });

  it("should allow removing a favorite", async () => {
    const mockFavorites = [{ id: 1, name: "Pikachu", sprite: "https://example.com/pikachu.png" }];
    localStorage.setItem("favorites", JSON.stringify(mockFavorites));
    render(
      <BrowserRouter>
        <Favorites />
      </BrowserRouter>
    );
    const removeButton = screen.getByRole("button", { name: /remove/i });
    expect(removeButton).toBeInTheDocument();
    removeButton.click();
    // after click, the card should be removed
    expect(screen.queryByText(/pikachu/i)).not.toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem("favorites"))).toEqual([]);
  });

  it("should allow adding favorite to team and show message", () => {
    const mockFavorites = [{ id: 1, name: "Pikachu", sprite: "https://example.com/pikachu.png" }];
    localStorage.setItem("favorites", JSON.stringify(mockFavorites));
    localStorage.setItem("myTeam", JSON.stringify([]));
    render(
      <BrowserRouter>
        <Favorites />
      </BrowserRouter>
    );
    const addButton = screen.getByRole("button", { name: /add to team/i });
    addButton.click();
    expect(screen.getByText(/pikachu added to team/i)).toBeInTheDocument();
    const team = JSON.parse(localStorage.getItem("myTeam"));
    expect(team).toHaveLength(1);
    expect(team[0].id).toBe(1);
  });

  it("should show 'Already on team' when adding duplicate", () => {
    const mockFavorites = [{ id: 1, name: "Pikachu", sprite: "https://example.com/pikachu.png" }];
    localStorage.setItem("favorites", JSON.stringify(mockFavorites));
    localStorage.setItem("myTeam", JSON.stringify([mockFavorites[0]]));
    render(
      <BrowserRouter>
        <Favorites />
      </BrowserRouter>
    );
    const addButton = screen.getByRole("button", { name: /add to team/i });
    addButton.click();
    expect(screen.getByText(/already on team/i)).toBeInTheDocument();
  });

  it("should show 'Team full' when six already in team", () => {
    const mockFavorites = [{ id: 2, name: "Charmander", sprite: "https://example.com/charmander.png" }];
    const fullTeam = Array.from({ length: 6 }, (_, i) => ({ id: i+10, name: `Poke${i}`, sprite: "" }));
    localStorage.setItem("favorites", JSON.stringify(mockFavorites));
    localStorage.setItem("myTeam", JSON.stringify(fullTeam));
    render(
      <BrowserRouter>
        <Favorites />
      </BrowserRouter>
    );
    const addButton = screen.getByRole("button", { name: /add to team/i });
    addButton.click();
    expect(screen.getByText(/team full/i)).toBeInTheDocument();
  });
});
