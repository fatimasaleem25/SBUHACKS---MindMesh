import { useEffect, useState } from "react";
import { getRoot, postCluster } from "./api";

export default function App() {
  const [msg, setMsg] = useState("");
  const [graph, setGraph] = useState(null);
  const [input, setInput] = useState("AI in education\nShared memory\nVoice notes");

  useEffect(() => {
    // test GET /
    getRoot()
      .then(data => setMsg(data.message))
      .catch(err => setMsg("Backend unreachable: " + err.message));
  }, []);

  const handleGenerate = async () => {
    try {
      const result = await postCluster(input);
      setGraph(result);
    } catch (e) {
      setGraph({ error: e.message });
    }
  };

  return (
    <div style={{ padding: 24, fontFamily: "Arial, sans-serif" }}>
      <h1>MindMesh — Frontend Test</h1>
      <p><strong>Backend says:</strong> {msg}</p>

      <div style={{ marginTop: 20 }}>
        <textarea
          rows={5}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ width: "100%", padding: 10 }}
        />
        <button onClick={handleGenerate} style={{ marginTop: 8, padding: "8px 12px" }}>
          Generate Mesh
        </button>
      </div>

      <div style={{ marginTop: 20 }}>
        <h3>Graph response</h3>
        <pre style={{ background: "#f4f4f4", padding: 12 }}>
          {graph ? JSON.stringify(graph, null, 2) : "No data yet"}
        </pre>
      </div>
    </div>
  );
}

