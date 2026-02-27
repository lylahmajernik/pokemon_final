import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SearchBar from "../SearchBar";

describe("SearchBar Component", () => {
  it("should render the search input", () => {
    render(
      <BrowserRouter>
        <SearchBar />
      </BrowserRouter>
    );
    const input = screen.getByPlaceholderText("Search Pokemon by name or ID...");
    expect(input).toBeInTheDocument();
  });

  it("should render the search button", () => {
    render(
      <BrowserRouter>
        <SearchBar />
      </BrowserRouter>
    );
    const button = screen.getByRole("button", { name: /search/i });
    expect(button).toBeInTheDocument();
  });

  it("should have empty input by default", () => {
    render(
      <BrowserRouter>
        <SearchBar />
      </BrowserRouter>
    );
    const input = screen.getByPlaceholderText("Search Pokemon by name or ID...");
    expect(input).toHaveValue("");
  });
});
