@echo off
cd node-back
del package-lock.json
rmdir /s /q node_modules
rmdir /s /q dist
cmd /C npm i
cmd /C npm run build
cd ..
cd react-front
del package-lock.json
rmdir /s /q -R node_modules
rmdir /s /q -R build
cmd /C npm i
cmd /C npm run build

cd ..
docker-compose up -d