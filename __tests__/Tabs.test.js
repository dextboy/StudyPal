import React from "react";
import { render, screen } from "@testing-library/react";
import BasicTabs from "../src/components/Tabs.jsx";
import "@testing-library/jest-dom/extend-expect";

describe("BasicTabs", () => {
  test("renders tabs correctly", () => {
    // Render the component
    render(<BasicTabs />);

    // Get tab elements
    const calendarTab = screen.getByRole("tab", { name: /calendar/i });
    const pomodoroTab = screen.getByRole("tab", { name: /pomodoro timer/i });
    const itemThreeTab = screen.getByRole("tab", { name: /item three/i });

    // Check if the tabs are rendered
    expect(calendarTab).toBeInTheDocument();
    expect(pomodoroTab).toBeInTheDocument();
    expect(itemThreeTab).toBeInTheDocument();
  });
});
