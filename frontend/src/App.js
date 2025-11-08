import React, { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000")
      .then((res) => res.text())
      .then(setMessage)
      .catch(console.error);
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>MindMesh Frontend</h1>
      <p>Backend says: {message}</p>
    </div>
  );
}

export default App;

