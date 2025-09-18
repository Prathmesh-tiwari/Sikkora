@echo off
echo ========================================
echo   Starting SIKKORA - Premium Heritage
echo ========================================

echo Starting Backend Server...
cd SIH\backend
start "SIKKORA Backend" cmd /k "npm start"

echo Waiting 3 seconds...
timeout /t 3 /nobreak >nul

echo Starting Frontend Server...
cd ..\frontend\MysticSikkim
start "SIKKORA Frontend" cmd /k "npm run dev"

echo.
echo ========================================
echo   SIKKORA is starting up!
echo ========================================
echo   Backend:  http://localhost:5000
echo   Frontend: http://localhost:5173
echo ========================================
echo.
echo Press any key to exit...
pause >nul