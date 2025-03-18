# Use Nginx to serve the static files  
FROM nginx:alpine  

# Copy only the pre-built React `build/` folder into Nginx  
COPY build /usr/share/nginx/html  

# Copy the custom Nginx config  
COPY nginx.conf /etc/nginx/conf.d/default.conf 

# Expose the port Nginx runs on  
EXPOSE 3000  

# Start Nginx  
CMD ["nginx", "-g", "daemon off;"]

