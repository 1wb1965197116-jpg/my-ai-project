Write-Host "FULL BUILD + DEPLOY"

pip install -r backend/requirements.txt

python backend/auto_fix.py

git add .
git commit -m "Full build"
git push origin main

Write-Host "DONE"
