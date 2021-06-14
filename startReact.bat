@echo off
cd react-front
cmd /C npm i
cmd /C npm run build
cmd /C npm start
cd ..