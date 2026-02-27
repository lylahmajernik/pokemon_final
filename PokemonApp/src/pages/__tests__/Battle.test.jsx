import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Battle from "../Battle";

describe("Battle Page", () => {
  it("should render Battle Arena heading", () => {
    localStorage.setItem("myTeam", JSON.stringify([]));
    render(
      <BrowserRouter>
        <Battle />
      </BrowserRouter>
    );
    expect(screen.getByRole("heading", { level: 1, name: /battle arena/i })).toBeInTheDocument();
  });

  it("should render Find an Opponent section", () => {
    localStorage.setItem("myTeam", JSON.stringify([]));
    render(
      <BrowserRouter>
        <Battle />
      </BrowserRouter>
    );
    expect(screen.getByText("Find an Opponent")).toBeInTheDocument();
  });
});
