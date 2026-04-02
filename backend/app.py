from fastapi import FastAPI
from pydantic import BaseModel
import json, os, uuid

# Auto-detect backend folder regardless of case
BACKEND_FOLDER = "backend" if os.path.exists("backend") else "Backend"

app = FastAPI()

USERS_FILE = os.path.join(BACKEND_FOLDER, "users.json")
MEMORY_FILE = os.path.join(BACKEND_FOLDER, "memory.json")

class InputData(BaseModel):
    text: str
    api_key: str = None

def load_json(file):
    if not os.path.exists(file):
        return []
    with open(file, "r") as f:
        return json.load(f)

def save_json(file, data):
    with open(file, "w") as f:
        json.dump(data, f)

@app.post("/signup")
def signup():
    users = load_json(USERS_FILE)
    api_key = str(uuid.uuid4())
    user = {"api_key": api_key, "usage": 0}
    users.append(user)
    save_json(USERS_FILE, users)
    return {"api_key": api_key}

@app.post("/predict")
def predict(data: InputData):
    users = load_json(USERS_FILE)
    memory = load_json(MEMORY_FILE)

    user = next((u for u in users if u["api_key"] == data.api_key), None)
    if not user:
        return {"error": "Invalid API key"}

    response_text = f"AI SaaS Response: {data.text}"
    user["usage"] += 1

    memory.append({"input": data.text, "output": response_text})
    save_json(MEMORY_FILE, memory)
    save_json(USERS_FILE, users)

    return {"response": response_text, "usage": user["usage"]}
