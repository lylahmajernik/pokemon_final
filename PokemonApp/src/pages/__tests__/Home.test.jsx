import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Home from "../Home";

describe("Home Page", () => {
  it("should render the home page with hero component", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    expect(screen.getByText("Welcome to PokeDex Arena")).toBeInTheDocument();
  });
});
