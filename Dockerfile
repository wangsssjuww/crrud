# Gunakan image resmi Node LTS
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package files first untuk memanfaatkan cache layer Docker
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy semua file aplikasi
COPY . .

# Jika perlu build (mis. aplikasi React/TS)
# RUN npm run build

# Ekspos port aplikasi (sesuaikan)
EXPOSE 3000

# Perintah default untuk menjalankan aplikasi
CMD ["node", "index.js"]