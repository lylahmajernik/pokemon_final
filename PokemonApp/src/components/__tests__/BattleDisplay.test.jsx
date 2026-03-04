import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import BattleDisplay from "../BattleDisplay";

describe("BattleDisplay Component", () => {
  const mockFight = () => {};

  it("should render Battle Arena title", () => {
    render(
      <BattleDisplay
        selectedPokemon={null}
        selectedData={null}
        enemy={null}
        result=""
        onFight={mockFight}
      />
    );
    expect(screen.getByText("Battle Arena")).toBeInTheDocument();
  });

  it("should render prompt when no pokemon selected", () => {
    render(
      <BattleDisplay
        selectedPokemon={null}
        selectedData={null}
        enemy={null}
        result=""
        onFight={mockFight}
      />
    );
    expect(screen.getByText("Add Pokemon to your team to start")).toBeInTheDocument();
  });

  it("should render Fight button", () => {
    render(
      <BattleDisplay
        selectedPokemon={null}
        selectedData={null}
        enemy={null}
        result=""
        onFight={mockFight}
      />
    );
    expect(screen.getByRole("button", { name: /fight/i })).toBeInTheDocument();
  });

  it("should display result when provided", () => {
    render(
      <BattleDisplay
        selectedPokemon={null}
        selectedData={null}
        enemy={null}
        result="Pikachu wins!"
        onFight={mockFight}
      />
    );
    expect(screen.getByText("Pikachu wins!")).toBeInTheDocument();
  });
});
