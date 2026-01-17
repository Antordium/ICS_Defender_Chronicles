# ICS Defender Chronicles - Game Launcher (PowerShell)

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "  ICS DEFENDER CHRONICLES" -ForegroundColor Green
Write-Host "  Starting local server..." -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

$gamePath = Join-Path $PSScriptRoot "game"
$url = "http://localhost:8000"

# Check if Python is available
$python = Get-Command python -ErrorAction SilentlyContinue

if ($python) {
    Write-Host "Starting Python HTTP server..." -ForegroundColor Yellow
    Write-Host "Game URL: $url" -ForegroundColor Green
    Write-Host ""
    Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Gray
    Write-Host ""

    # Open browser
    Start-Process $url

    # Start server
    Push-Location $gamePath
    python -m http.server 8000
    Pop-Location
}
else {
    Write-Host "Python not found. Trying to open directly..." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Note: Save functionality may be limited when opening directly." -ForegroundColor Red
    Write-Host ""

    $htmlPath = Join-Path $gamePath "index.html"
    Start-Process $htmlPath

    Write-Host "Opened game in default browser." -ForegroundColor Green
    Write-Host ""
    Write-Host "For full functionality, install Python:" -ForegroundColor Yellow
    Write-Host "  https://www.python.org/downloads/" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
