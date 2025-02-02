FROM node:20-alpine

WORKDIR /var/www/manage

COPY package*.json ./

# Install OpenSSL and other required dependencies
RUN apk add --no-cache openssl openssl-dev \
    && apk add --no-cache libc6-compat

# Install dependencies
RUN npm install

COPY . .

RUN npx prisma generate
RUN npx prisma migrate dev --name init

EXPOSE 8002

CMD ["npm", "run", "start"]
