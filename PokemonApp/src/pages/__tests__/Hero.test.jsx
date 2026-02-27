import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Hero from "../../components/Hero";

describe("Hero Component", () => {
  it("should render the main title", () => {
    render(
      <BrowserRouter>
        <Hero />
      </BrowserRouter>
    );
    expect(screen.getByText("Welcome to PokeDex Arena")).toBeInTheDocument();
  });

  it("should render the subtitle", () => {
    render(
      <BrowserRouter>
        <Hero />
      </BrowserRouter>
    );
    expect(screen.getByText("Explore, Collect, and Battle Pokemon")).toBeInTheDocument();
  });

  it("should render all feature cards", () => {
    render(
      <BrowserRouter>
        <Hero />
      </BrowserRouter>
    );
    expect(screen.getByText("Explore Pokemon")).toBeInTheDocument();
    expect(screen.getByText("Build Your Team")).toBeInTheDocument();
    expect(screen.getByText("Save Favorites")).toBeInTheDocument();
    expect(screen.getByText("Battle Arena")).toBeInTheDocument();
  });

  it("should render action buttons", () => {
    render(
      <BrowserRouter>
        <Hero />
      </BrowserRouter>
    );
    expect(screen.getByRole("link", { name: /start exploring/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /go to battle arena/i })).toBeInTheDocument();
  });
});
