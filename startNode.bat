@echo off
cd node-back
cmd /C npm i
cmd /C npm run build
cmd /C npm start
cd ..