@echo off
setlocal

set folder="node_modules"
cd app_files

if not exist %folder% (
	npm i
)

node server.js

endlocal