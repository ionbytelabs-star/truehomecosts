@echo off
setlocal

cd /d "%~dp0"

set "LOCAL_URL=http://127.0.0.1:3000"

where npm.cmd >nul 2>nul
if errorlevel 1 (
  echo npm was not found on this machine.
  echo Install Node.js and try again.
  pause
  exit /b 1
)

if not exist "node_modules" (
  echo Installing dependencies...
  powershell -NoProfile -Command "& npm.cmd install"
  if errorlevel 1 (
    echo Dependency install failed.
    pause
    exit /b 1
  )
)

echo Building TrueHomeCosts...
powershell -NoProfile -Command "& npm.cmd run build"
if errorlevel 1 (
  echo Build failed.
  pause
  exit /b 1
)

echo Starting TrueHomeCosts locally at %LOCAL_URL% ...
start "TrueHomeCosts Local Server" cmd /k "cd /d %~dp0 && npm.cmd run start"

echo Waiting for local server...
set "READY="
for /l %%i in (1,1,30) do (
  powershell -NoProfile -Command "try { $r = Invoke-WebRequest -UseBasicParsing '%LOCAL_URL%'; if ($r.StatusCode -eq 200) { exit 0 } else { exit 1 } } catch { exit 1 }"
  if not errorlevel 1 (
    set "READY=1"
    goto :server_ready
  )
  timeout /t 1 >nul
)

echo The local server did not respond in time.
echo Check the "TrueHomeCosts Local Server" window for any startup errors.
pause
exit /b 1

:server_ready
echo Opening %LOCAL_URL%
start "" "%LOCAL_URL%"
echo TrueHomeCosts should now be running locally.
