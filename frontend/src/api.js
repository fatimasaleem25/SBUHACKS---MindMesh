const API_BASE = "http://127.0.0.1:8000";

export async function getRoot() {
  const res = await fetch(`${API_BASE}/`);
  if (!res.ok) throw new Error("Network response not ok");
  return res.json();
}

export async function postCluster(text) {
  const res = await fetch(`${API_BASE}/cluster`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  if (!res.ok) throw new Error("Cluster request failed");
  return res.json();
}

