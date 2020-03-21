import React, { useState } from "react";

export default function useVisualMode(initMode) {
  const [mode, setMode] = useState(initMode);
  const [history, setHistory] = useState([initMode])
  const transition = function (newMode, replace = false) {
    if (replace) {
      const newHist = history.slice(0, history.length - 1);
      setHistory([...newHist, newMode]);
    } else {
      setHistory(prev => ([...prev, newMode]));
    }
    setMode(newMode);
  }
  const back = function () {
    if (history.length > 1) {
      history.pop();
      setMode(history[history.length - 1])
    }
  }

  return {
    mode,
    transition,
    back
  }
}
