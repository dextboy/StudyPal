import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../src/pages/Home";
import "@testing-library/jest-dom/extend-expect";

jest.mock("../src/supabase/client", () => {
  const projectURL = process.env.VITE_SUPABASE_PROJECT_URL;
  const projectKey = process.env.VITE_SUPABASE_PROJECT_KEY;

  return {
    supabase: {
      from: jest.fn(() => ({
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        then: jest.fn().mockResolvedValueOnce({ data: [] }),
      })),
      projectURL,
      projectKey,
    },
  };
});

test("renders Home component", () => {
  render(<Home />);

  // Check if the BasicTabs component is rendered
  const basicTabsElement = screen.getByRole("tabpanel");
  expect(basicTabsElement).toBeInTheDocument();

  // Check if the TODO component is rendered
  const todoInputElement = screen.getByRole("textbox", {
    className: "input form-control",
  });
  expect(todoInputElement).toBeInTheDocument();
});
