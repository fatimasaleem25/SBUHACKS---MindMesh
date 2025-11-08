from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Allow requests from the frontend dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI 🚀"}

class IdeaIn(BaseModel):
    text: str

@app.post("/cluster")
def cluster(idea: IdeaIn):
    # placeholder: respond with received text as nodes/links demo
    text = idea.text or ""
    ideas = [s.strip() for s in text.split("\n") if s.strip()]
    # tiny mock graph
    nodes = [{"id": f"Idea {i+1}", "text": it} for i, it in enumerate(ideas)]
    links = []
    if len(nodes) >= 2:
        links = [{"source": nodes[0]["id"], "target": nodes[i]["id"]} for i in range(1, len(nodes))]
    return {"nodes": nodes, "links": links}

