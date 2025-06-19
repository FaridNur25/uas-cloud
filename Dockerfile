# Gunakan image resmi Node.js untuk build
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy semua file dan install dependencies
COPY package*.json ./
RUN npm install

# Copy semua source code
COPY . .

# Build aplikasi untuk produksi
RUN npm run build

# Gunakan image nginx untuk serve hasil build
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Copy konfigurasi nginx jika ada
# COPY nginx.conf /etc/nginx/nginx.conf

# Ekspos port 80
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
