import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import PokemonCard from "../../components/PokemonCard";

describe("PokemonCard Component", () => {
  const mockPokemon = {
    id: 1,
    name: "Bulbasaur",
    sprite: "https://example.com/bulbasaur.png",
  };

  it("should render pokemon name", () => {
    render(
      <BrowserRouter>
        <PokemonCard pokemon={mockPokemon} />
      </BrowserRouter>
    );
    expect(screen.getByText("BULBASAUR")).toBeInTheDocument();
  });

  it("should render pokemon image", () => {
    render(
      <BrowserRouter>
        <PokemonCard pokemon={mockPokemon} />
      </BrowserRouter>
    );
    const img = screen.getByAltText("Bulbasaur");
    expect(img).toBeInTheDocument();
  });

  it("should have selected class when isSelected is true", () => {
    const { container } = render(
      <BrowserRouter>
        <PokemonCard pokemon={mockPokemon} isSelected={true} />
      </BrowserRouter>
    );
    const card = container.querySelector(".pokemon-card");
    expect(card).toHaveClass("selected");
  });

  it("should show remove button when showRemoveButton is true", () => {
    render(
      <BrowserRouter>
        <PokemonCard pokemon={mockPokemon} showRemoveButton={true} onRemove={() => {}} />
      </BrowserRouter>
    );
    expect(screen.getByRole("button", { name: /remove/i })).toBeInTheDocument();
  });

  it("should not show remove button when showRemoveButton is false", () => {
    render(
      <BrowserRouter>
        <PokemonCard pokemon={mockPokemon} showRemoveButton={false} />
      </BrowserRouter>
    );
    expect(screen.queryByRole("button", { name: /remove/i })).not.toBeInTheDocument();
  });
});
