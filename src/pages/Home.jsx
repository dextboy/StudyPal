import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import BasicTabs from "../components/Tabs";
import TODO from "../components/ToDo";
import "../pages/Home.css";
import { Paper } from "@mui/material";

function Home() {
  const { user } = useAuth();
  const [list, setlist] = useState([]);
  const [input, setInput] = useState("");

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh", // Take full height of the viewport
          padding: "20px",
        }}
      >
        <div className="tabs">
          <div className="container">
            <BasicTabs />
          </div>
        </div>
        <div className="todolist">
          <div className="container">
            <Paper elevation={3}>
              <TODO />
            </Paper>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
