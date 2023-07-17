import React from "react";
import { render, screen } from "@testing-library/react";
import BasicTabs from "../src/components/Tabs.jsx";
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
describe("BasicTabs", () => {
  test("renders tabs correctly", () => {
    // Render the component
    render(<BasicTabs />);

    // Get tab elements
    const calendarTab = screen.getByRole("tab", { name: /calendar/i });
    const pomodoroTab = screen.getByRole("tab", { name: /pomodoro timer/i });
    const analyticstab = screen.getByRole("tab", { name: /analytics/i });

    // Check if the tabs are rendered
    expect(calendarTab).toBeInTheDocument();
    expect(pomodoroTab).toBeInTheDocument();
    expect(analyticstab).toBeInTheDocument();
  });
});
