FROM node:20-alpine

WORKDIR /var/www/manage

COPY package*.json ./

# Install dependencies
RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 8002

CMD ["npm", "run", "start"]
