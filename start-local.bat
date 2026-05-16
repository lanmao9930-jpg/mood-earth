@echo off
setlocal
cd /d "%~dp0"
powershell -ExecutionPolicy Bypass -NoProfile -File "%~dp0start-local.ps1"
endlocal
