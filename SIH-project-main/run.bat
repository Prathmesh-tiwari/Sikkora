@echo off
echo Starting MysticSikkim Application...

echo Starting Backend Server...
cd SIH\backend
start "Backend Server" cmd /k "npm start"

echo Waiting 3 seconds...
timeout /t 3 /nobreak >nul

echo Starting Frontend Server...
cd ..\frontend\MysticSikkim
start "Frontend Server" cmd /k "npm run dev"

echo.
echo ========================================
echo   MysticSikkim is starting up!
echo ========================================
echo   Backend:  http://localhost:5000
echo   Frontend: http://localhost:5173
echo ========================================
echo.
echo Press any key to exit...
pause >nul