import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import TeamSelector from "../TeamSelector";
import { AuthProvider } from "../../context/AuthContext";
import { AppProvider } from "../../context/AppContext";

describe("TeamSelector Component", () => {
  const mockCallback = () => {};

  it("should render message when team is empty", () => {
    localStorage.setItem("userTeams", JSON.stringify({ guest: [] }));
    render(
      <AuthProvider>
        <AppProvider>
          <BrowserRouter>
            <TeamSelector onPokemonSelect={mockCallback} />
          </BrowserRouter>
        </AppProvider>
      </AuthProvider>
    );
    expect(screen.getByText(/no pokemon in your team/i)).toBeInTheDocument();
  });

  it("should render team heading when team exists", () => {
    const mockTeam = [
      { id: 1, name: "Bulbasaur", sprite: "https://example.com/1.png" }
    ];
    localStorage.setItem("userTeams", JSON.stringify({ guest: mockTeam }));
    render(
      <AuthProvider>
        <AppProvider>
          <BrowserRouter>
            <TeamSelector onPokemonSelect={mockCallback} />
          </BrowserRouter>
        </AppProvider>
      </AuthProvider>
    );
    expect(screen.getByText("Your Team (Select One)")).toBeInTheDocument();
  });
});
