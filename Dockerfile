# Nginx setup
FROM nginx:alpine

# Copy static assets
WORKDIR /usr/share/nginx/html
COPY . .

# Remove default nginx static assets
RUN rm -rf ./*

ENTRYPOINT ["nginx", "-g", "daemon off;"]
