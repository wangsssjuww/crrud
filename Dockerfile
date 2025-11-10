FROM node:18

# Perbaiki WORKDIR dari /* menjadi /usr/src/app
WORKDIR /usr/src/app 

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]