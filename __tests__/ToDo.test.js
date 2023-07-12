import React from "react";
import { render, screen } from "@testing-library/react";
import TODO from "../src/components/ToDo";
import "@testing-library/jest-dom/extend-expect"; // Import the extend-expect assertion

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

test("renders ToDo component", () => {
  render(<TODO />);
  const todoElement = screen.getByText(
    (content, element) => {
      // Use a custom matcher to match the text in a case-insensitive way
      const normalizedText = content.toLowerCase();
      const elementText = element.textContent.toLowerCase();
      return elementText.includes(normalizedText);
    },
    { selector: "h1" }
  ); // Use a specific selector for the heading element
  expect(todoElement).toBeInTheDocument();
});
