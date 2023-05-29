import React, { useState} from "react";
import { useAuth } from "../context/AuthProvider";
import BasicTabs from "../components/Tabs";
import TODO from "../components/ToDo";
import "../components/style/ToDostyle.css";


const Home = () => {
  const { user } = useAuth();
  const [list, setlist] = useState([]);
  const [input, setInput] = useState("");

  return (
    <>
      <div className="position-absolute bottom-50 start-0">
        <BasicTabs/>
      </div>
      <div>
        <TODO/>
      </div>
    </>
  );
};

export default Home;
