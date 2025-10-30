# STAGE 1: Build the React Application
FROM node:18-alpine AS build
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package.json .
COPY package-lock.json .
RUN npm install

# Copy source code and build
COPY . .
RUN npm run build

# STAGE 2: Serve the Application with Nginx
FROM nginx:alpine
# Copy the built production assets from the build stage to Nginx's web root
COPY --from=build /app/build /usr/share/nginx/html
# Expose the standard HTTP port
EXPOSE 80
# Nginx runs by default when the container starts