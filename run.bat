@echo off
setlocal

set "folder=node_modules"

if not exist "%folder%" (
	npm i
)

node server.js

endlocal