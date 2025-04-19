# Use a base image with Java support
FROM openjdk:17-jdk-slim

# Set the working directory in the container
WORKDIR /app

# Copy the Spring Boot jar file from the build context
COPY Neuro-Canteen-1/target/Neuro-Canteen-1-0.0.1-SNAPSHOT.jar /app/Neuro-Canteen-1-0.0.1-SNAPSHOT.jar
COPY Neuro-Canteen-1/src/main/resources/data.sql /app/data.sql

# Expose the port your Spring Boot app will run on 
EXPOSE 8142

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "/app/Neuro-Canteen-1-0.0.1-SNAPSHOT.jar"]
