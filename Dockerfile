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

# Tambahkan konfigurasi nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 8080 (harus sesuai dengan konfigurasi)
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
