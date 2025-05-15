Installation Steps

1. sudo docker pull crimsonowl/neuro-canteen-backend:latest
2. sudo docker pull crimsonowl/neuro-canteen-frontend:latest

sudo docker compose up -d

Insert Database data

docker cp data.sql postgres:/ <br>
docker exec -i postgres psql -U postgres -d Canteen -f /data.sql

remove everything from docker

docker system prune -a --volumes -f
