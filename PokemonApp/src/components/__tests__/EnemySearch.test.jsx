import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import EnemySearch from "../EnemySearch";

describe("EnemySearch Component", () => {
  const mockCallback = () => {};

  it("should render Find an Opponent heading", () => {
    render(<EnemySearch onEnemyFetch={mockCallback} />);
    expect(screen.getByText("Find an Opponent")).toBeInTheDocument();
  });

  it("should render search input", () => {
    render(<EnemySearch onEnemyFetch={mockCallback} />);
    const input = screen.getByPlaceholderText(/search by pokemon/i);
    expect(input).toBeInTheDocument();
  });

  it("should render Search button", () => {
    render(<EnemySearch onEnemyFetch={mockCallback} />);
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
  });

  it("should render Random button", () => {
    render(<EnemySearch onEnemyFetch={mockCallback} />);
    expect(screen.getByRole("button", { name: /random/i })).toBeInTheDocument();
  });
});
