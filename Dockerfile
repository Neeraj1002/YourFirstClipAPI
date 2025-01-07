FROM node:20-alpine

WORKDIR /var/www/manage

# Install pnpm using corepack (comes with Node.js)
RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml* ./


RUN pnpm config set network-timeout 100000
RUN pnpm config set registry https://registry.npmjs.org/

# Install dependencies
RUN pnpm install --frozen-lockfile

COPY . .

EXPOSE 8002

CMD ["pnpm", "run", "start"]
