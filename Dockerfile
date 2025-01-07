FROM node:20
WORKDIR /var/www/manage
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 8002
CMD ["npm","run","start"]
