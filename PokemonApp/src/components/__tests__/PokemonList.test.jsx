import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import PokemonList from "../PokemonList";

describe("PokemonList Component", () => {
  const mockRemove = () => {};

  it("should render title when list has data", () => {
    const mockPokemon = [
      { id: 1, name: "Pikachu", sprite: "https://example.com/pikachu.png" }
    ];
    render(
      <BrowserRouter>
        <PokemonList title="My Team" pokemonList={mockPokemon} />
      </BrowserRouter>
    );
    expect(screen.getByText("My Team")).toBeInTheDocument();
  });

  it("should render empty message when list is empty", () => {
    render(
      <BrowserRouter>
        <PokemonList
          title="Favorites"
          pokemonList={[]}
          emptyMessage="No favorites yet"
        />
      </BrowserRouter>
    );
    expect(screen.getByText("No favorites yet")).toBeInTheDocument();
  });

  it("should render pokemon cards when list has data", () => {
    const mockPokemon = [
      { id: 1, name: "Pikachu", sprite: "https://example.com/pikachu.png" }
    ];
    render(
      <BrowserRouter>
        <PokemonList title="Team" pokemonList={mockPokemon} />
      </BrowserRouter>
    );
    expect(screen.getByText("PIKACHU")).toBeInTheDocument();
  });
});
