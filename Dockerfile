FROM node:20
WORKDIR /var/www/manage
RUN npm install -g pnpm
COPY package.json ./
RUN pnpm install
COPY . .
EXPOSE 8002
CMD ["pnpm","run","start"]
