import React, { useState, useEffect } from "react";

export default function Clock({ darkMode }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return (
    <div
      style={{
        padding: "4px 12px",
        borderRadius: "8px",
        backgroundColor: darkMode ? "#343a40" : "#f0f0f0",
        color: darkMode ? "#fff" : "#333",
        fontFamily: "monospace",
        fontWeight: 600,
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        minWidth: "100px",
        textAlign: "center",
      }}
    >
      {formattedTime}
    </div>
  );
}
