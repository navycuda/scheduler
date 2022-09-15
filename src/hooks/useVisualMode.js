// src/hooks/useVisualMode.js
import { useState } from "react";

export default function useVisualMode(initial){
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (destination) => {
    //setMode(destination);
    setHistory((current) => [...current, destination]);
  };
  const back = () => {
    setHistory((previous) => {
      if (previous.length < 2) {
        return previous;
      } else {
        return previous.slice(0, previous.length - 1);
        
      }
    });
  }

  return { mode:history[history.length - 1], transition, back };
};