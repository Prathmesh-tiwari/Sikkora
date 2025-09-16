@echo off
echo Restarting MysticSikkim Application...

echo Killing existing processes...
taskkill /f /im node.exe >nul 2>&1
timeout /t 2 /nobreak >nul

echo Starting Backend Server...
start "Backend Server" cmd /k "cd SIH\backend && npm start"

echo Waiting 5 seconds for backend to start...
timeout /t 5 /nobreak >nul

echo Starting Frontend Server...
start "Frontend Server" cmd /k "cd SIH\frontend\MysticSikkim && npm run dev"

echo.
echo ========================================
echo   MysticSikkim is restarting!
echo ========================================
echo   Backend:  http://localhost:5000
echo   Frontend: Will be shown in terminal
echo ========================================
echo.
echo Press any key to exit...
pause >nul