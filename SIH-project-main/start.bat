@echo off
echo Starting MysticSikkim Application...

echo Starting Backend Server...
start "Backend" cmd /k "cd SIH\backend && npm start"

timeout /t 3 /nobreak >nul

echo Starting Frontend Server...
start "Frontend" cmd /k "cd SIH\frontend\MysticSikkim && npm run dev"

echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
pause