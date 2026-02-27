import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import MyTeam from "../MyTeam";

describe("MyTeam Page", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should render My Team title when team has data", () => {
    const mockTeam = [{ id: 1, name: "Pikachu", sprite: "https://example.com/pikachu.png" }];
    localStorage.setItem("myTeam", JSON.stringify(mockTeam));
    render(
      <BrowserRouter>
        <MyTeam />
      </BrowserRouter>
    );
    expect(screen.getByText("My Team")).toBeInTheDocument();
  });

  it("should show empty message when no team", () => {
    localStorage.setItem("myTeam", JSON.stringify([]));
    render(
      <BrowserRouter>
        <MyTeam />
      </BrowserRouter>
    );
    expect(screen.getByText(/no pokemon in your team yet/i)).toBeInTheDocument();
  });
});
