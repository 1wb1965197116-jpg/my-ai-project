import os
import shutil
import subprocess
import sys

# ---- CONFIG ----
REPO_ROOT = os.path.dirname(os.path.abspath(__file__))
BACKEND_FOLDER = "backend" if os.path.exists(os.path.join(REPO_ROOT, "backend")) else "Backend"
APP_FILE = "app.py"
REQUIREMENTS_FILE = "requirements.txt"
PORT = 10000
# ----------------

# Step 1: Ensure __init__.py exists
init_file = os.path.join(REPO_ROOT, BACKEND_FOLDER, "__init__.py")
if not os.path.exists(init_file):
    open(init_file, "w").close()
    print(f"Created {init_file}")

# Step 2: Install dependencies
if os.path.exists(os.path.join(REPO_ROOT, REQUIREMENTS_FILE)):
    print("Installing dependencies from requirements.txt...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", REQUIREMENTS_FILE])
else:
    print("requirements.txt not found, installing defaults...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "fastapi", "uvicorn", "pydantic", "gunicorn"])

# Step 3: Start the app with uvicorn
start_cmd = f"uvicorn {BACKEND_FOLDER}.app:app --host 0.0.0.0 --port {PORT}"
print(f"Starting app with: {start_cmd}")
subprocess.run(start_cmd, shell=True)
