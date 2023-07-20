import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import { useAuth } from "../context/AuthProvider";
import { Card } from "react-bootstrap";

const Analytics = () => {
  const { user } = useAuth();
  const [startTime, setStartTime] = useState(new Date());
  const [totalDays, setTotalDays] = useState(0);
  const [totalHours, setTotalHours] = useState(0);
  const [totalMinutes, setTotalMinutes] = useState(0);

  const startSession = () => {
    setStartTime(new Date());
  };

  useEffect(() => {
    startSession();

    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = ""; // This is required for browser compatibility
      endSession();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      endSession(); // Call endSession function before unmounting the component
    };
  }, []);

  const calculateDuration = (endTime, startTime) => {
    const sessionDuration = Math.floor((endTime - startTime) / 1000); // Duration in seconds
    const totalDurationSeconds =
      totalDays * 86400 +
      totalHours * 3600 +
      totalMinutes * 60 +
      sessionDuration;
    const totalDurationDays = Math.floor(totalDurationSeconds / 86400); // Number of days
    const totalDurationHours = Math.floor(
      (totalDurationSeconds % 86400) / 3600
    ); // Remaining hours
    const totalDurationMinutes = Math.floor((totalDurationSeconds % 3600) / 60); // Remaining minutes

    setTotalDays(totalDurationDays);
    setTotalHours(totalDurationHours);
    setTotalMinutes(totalDurationMinutes);
  };

  const endSession = async () => {
    const endTime = new Date();
    calculateDuration(endTime, startTime);

    // Insert a new session row with the session duration
    try {
      await supabase.from("user_sessions").insert([
        {
          user_id: user?.id,
          duration: Math.floor((endTime - startTime) / 1000),
        },
      ]);
    } catch (error) {
      console.log("Error creating session:", error);
    }

    setStartTime(new Date());
    setTotalDays(0);
    setTotalHours(0);
    setTotalMinutes(0);
  };

  useEffect(() => {
    const fetchSessionDetails = async () => {
      const { data, error } = await supabase
        .from("user_sessions")
        .select("duration")
        .eq("user_id", user?.id);

      if (data) {
        // Calculate the total duration by summing up all the durations
        const totalDurationSeconds = data.reduce(
          (sum, row) => sum + row.duration,
          0
        );
        const totalDurationDays = Math.floor(totalDurationSeconds / 86400); // Number of days
        const totalDurationHours = Math.floor(
          (totalDurationSeconds % 86400) / 3600
        ); // Remaining hours
        const totalDurationMinutes = Math.floor(
          (totalDurationSeconds % 3600) / 60
        ); // Remaining minutes

        setTotalDays(totalDurationDays);
        setTotalHours(totalDurationHours);
        setTotalMinutes(totalDurationMinutes);
      }

      if (error) {
        console.log("Error fetching session details:", error);
      }
    };

    fetchSessionDetails();
  }, [user?.id]);

  return (
    <>
      <Card style={{ width: "18rem" }} className="text-center">
        <Card.Header as="h5">Analytics</Card.Header>
        <Card.Body>
          <Card.Text>
            <h6
              style={{
                marginBottom: "10px",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              Total Time on App:
            </h6>
            <p style={{ fontSize: "20px" }}>
              {totalDays} days {totalHours} hours {totalMinutes} minutes
            </p>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default Analytics;
