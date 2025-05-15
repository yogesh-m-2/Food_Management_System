Installation Steps

1. sudo docker pull crimsonowl/neuro-canteen-backend:latest
2. sudo docker pull crimsonowl/neuro-canteen-frontend:latest

sudo docker compose up -d

Insert Database data

docker cp ./data.sql <destination_container>:/path/in/destination/data.sql
docker exec -i <container_name_or_id> psql -U postgres -d Canteen -f /app/data.sql
