import os

required = [
    "backend/app.py",
    "backend/requirements.txt",
    "backend/users.json",
    "backend/memory.json"
]

for f in required:
    if not os.path.exists(f):
        print("Missing:", f)

print("Auto-fix check complete")
