#!/bin/bash

# Set paths
backend_pom="backend/Neuro-Canteen-1/pom.xml"
backend_docker_path="backend"
frontend_docker_path="frontend"

echo -e "\e[36mStarting Maven build...\e[0m"
mvn -f "$backend_pom" clean package

if [ $? -ne 0 ]; then
    echo -e "\e[31mMaven build failed. ❌\e[0m"
    exit 1
fi

echo -e "\e[36mStarting NPM frontend build...\e[0m"
npm run build --prefix "$frontend_docker_path"

if [ $? -ne 0 ]; then
    echo -e "\e[31mNPM build failed. ❌\e[0m"
    exit 1
fi

echo -e "\e[36mBuilding backend Docker image...\e[0m"
docker build -t crimsonowl/neuro-canteen-backend:latest "$backend_docker_path"

echo -e "\e[36mPushing backend Docker image...\e[0m"
docker push crimsonowl/neuro-canteen-backend:latest

echo -e "\e[36mBuilding frontend Docker image...\e[0m"
docker build -t crimsonowl/neuro-canteen-frontend:latest "$frontend_docker_path"

echo -e "\e[36mPushing frontend Docker image...\e[0m"
docker push crimsonowl/neuro-canteen-frontend:latest

echo -e "\e[32mDeployment successful! 🚀\e[0m"
