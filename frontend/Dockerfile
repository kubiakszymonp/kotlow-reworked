# Use the official Node.js runtime as the base image
FROM node:20-alpine AS base

WORKDIR /app

# Configure yarn for better network handling
RUN yarn config set network-timeout 600000 && \
    yarn config set registry https://registry.npmjs.org/ && \
    yarn config set network-concurrency 1

COPY package.json yarn.lock .yarnrc ./
RUN yarn install --network-timeout 600000 --verbose

COPY . .

RUN NODE_OPTIONS="--max_old_space_size=2048" yarn build

EXPOSE 3000
ENV PORT 3000

ENV HOSTNAME "0.0.0.0"

CMD ["yarn", "start"] 