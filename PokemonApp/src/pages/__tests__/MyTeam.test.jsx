import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import MyTeam from "../MyTeam";
import { AuthProvider } from "../../context/AuthContext";
import { AppProvider } from "../../context/AppContext";

describe("MyTeam Page", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should render My Team title when team has data", () => {
    const mockTeam = [{ id: 1, name: "Pikachu", sprite: "https://example.com/pikachu.png" }];
    localStorage.setItem("userTeams", JSON.stringify({ guest: mockTeam }));
    render(
      <AuthProvider>
        <AppProvider>
          <BrowserRouter>
            <MyTeam />
          </BrowserRouter>
        </AppProvider>
      </AuthProvider>
    );
    expect(screen.getByText("My Team")).toBeInTheDocument();
  });

  it("should show empty message when no team", () => {
    localStorage.setItem("userTeams", JSON.stringify({ guest: [] }));
    render(
      <AuthProvider>
        <AppProvider>
          <BrowserRouter>
            <MyTeam />
          </BrowserRouter>
        </AppProvider>
      </AuthProvider>
    );
    expect(screen.getByText(/no pokemon in your team yet/i)).toBeInTheDocument();
  });
});
