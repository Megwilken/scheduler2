import { useState } from "react";

// take in the initial mode and return an object with the mode and the transition function
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

// transition to a new mode and add it to the history
  function transition(newMode, replace = false) {
    if (replace) {
      setHistory(prev => [...prev.slice(0, prev.length - 1), newMode]);
    } else {
      setHistory(prev => [...prev, newMode]);
    }
    setMode(newMode);
  };

// transition to the previous mode and remove it from the history if there is a previous mode
  function back() {
    setMode(initial);
    if (history.length > 1) {
      const newHistory = history.slice(0, history.length - 1);
      setHistory(newHistory);
      setMode(newHistory[newHistory.length - 1]);
    }
    };

  return { mode, transition, back };
}

