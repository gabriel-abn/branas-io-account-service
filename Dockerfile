FROM node:20-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install

# Bundle app source
COPY . .

EXPOSE 3000

CMD [ "pnpm", "dev" ]