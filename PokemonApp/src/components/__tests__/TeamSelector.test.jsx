import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import TeamSelector from "../TeamSelector";

describe("TeamSelector Component", () => {
  const mockCallback = () => {};

  it("should render message when team is empty", () => {
    localStorage.setItem("myTeam", JSON.stringify([]));
    render(
      <BrowserRouter>
        <TeamSelector onPokemonSelect={mockCallback} />
      </BrowserRouter>
    );
    expect(screen.getByText(/no pokemon in your team/i)).toBeInTheDocument();
  });

  it("should render team heading when team exists", () => {
    const mockTeam = [
      { id: 1, name: "Bulbasaur", sprite: "https://example.com/1.png" }
    ];
    localStorage.setItem("myTeam", JSON.stringify(mockTeam));
    render(
      <BrowserRouter>
        <TeamSelector onPokemonSelect={mockCallback} />
      </BrowserRouter>
    );
    expect(screen.getByText("Your Team (Select One)")).toBeInTheDocument();
  });
});
