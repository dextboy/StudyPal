import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import BasicTabs from "../components/Tabs";
import TODO from "../components/ToDo";
import "../components/style/Body.css";

const Home = () => {
  const { user } = useAuth();
  const [list, setlist] = useState([]);
  const [input, setInput] = useState("");

  return (
    <>
      <div className="position-absolute bottom-50 start-0 w-50">
        <BasicTabs />
      </div>
      <div className="position-absolute bottom-50 end-0">
        <TODO />
      </div>
    </>
  );
};

export default Home;
