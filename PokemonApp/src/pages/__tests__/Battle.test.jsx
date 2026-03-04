import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Battle from "../Battle";
import { AuthProvider } from "../../context/AuthContext";
import { AppProvider } from "../../context/AppContext";

describe("Battle Page", () => {
  it("should render Battle Arena heading", () => {
    localStorage.setItem("userTeams", JSON.stringify({ guest: [] }));
    render(
      <AuthProvider>
        <AppProvider>
          <BrowserRouter>
            <Battle />
          </BrowserRouter>
        </AppProvider>
      </AuthProvider>
    );
    expect(screen.getByRole("heading", { level: 1, name: /battle arena/i })).toBeInTheDocument();
  });

  it("should render Find an Opponent section", () => {
    localStorage.setItem("userTeams", JSON.stringify({ guest: [] }));
    render(
      <AuthProvider>
        <AppProvider>
          <BrowserRouter>
            <Battle />
          </BrowserRouter>
        </AppProvider>
      </AuthProvider>
    );
    expect(screen.getByText("Find an Opponent")).toBeInTheDocument();
  });
});
