import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import BasicTabs from "../components/Tabs";
import TODO from "../components/ToDo";
import "../pages/Home.css";


function Home () {
  const { user } = useAuth();
  const [list, setlist] = useState([]);
  const [input, setInput] = useState("");
  
  return (
    <>
    <div>
      <div className="tabs">
        <div className="container">
        <BasicTabs/>
        </div>
        
      </div>
      <div className="todolist">
        <div className="container">
        <TODO/>
        </div>
      </div>
    </div>
    </>
  );
};

export default Home;
