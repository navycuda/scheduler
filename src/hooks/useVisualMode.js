// src/hooks/useVisualMode.js
import { useState } from "react";

export default function useVisualMode(initial){
  const [history, setHistory] = useState([initial]);

  const transition = (destination, replace) => {
    setHistory((previous) => replace ? 
      [...previous.slice(0, previous.length - 1), destination] : 
      [...previous, destination]
    );
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