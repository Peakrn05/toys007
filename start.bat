@echo off
cd /d "%~dp0"
echo Clearing build cache...
rmdir /s /q ".next" 2>nul
rmdir /s /q "node_modules\.cache" 2>nul
echo Starting dev server...
npm run dev
pause
