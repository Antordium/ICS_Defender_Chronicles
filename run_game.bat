@echo off
echo ==========================================
echo   ICS DEFENDER CHRONICLES
echo   Starting local server...
echo ==========================================
echo.
echo Opening game at: http://localhost:8000
echo.
echo Press Ctrl+C to stop the server
echo.

cd /d "%~dp0game"

REM Try Python 3 first
python -m http.server 8000 2>nul
if %ERRORLEVEL% NEQ 0 (
    REM Try Python 2 style
    python -m SimpleHTTPServer 8000 2>nul
    if %ERRORLEVEL% NEQ 0 (
        echo.
        echo ERROR: Python not found!
        echo.
        echo Please install Python or use one of these alternatives:
        echo   1. Install Python: https://www.python.org/downloads/
        echo   2. Use Node.js: npx http-server game -p 8000
        echo   3. Use VS Code Live Server extension
        echo   4. Open game/index.html directly in browser
        echo.
        pause
    )
)
