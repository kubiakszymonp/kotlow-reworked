# Use the official Node.js runtime as the base image
FROM node:20-alpine AS base

# Configure DNS and network settings
RUN echo "nameserver 8.8.8.8" > /etc/resolv.conf && \
    echo "nameserver 1.1.1.1" >> /etc/resolv.conf

WORKDIR /app

# Configure yarn for better network handling
RUN yarn config set network-timeout 300000 && \
    yarn config set registry https://registry.npmjs.org/ && \
    yarn config set network-concurrency 1

COPY package.json yarn.lock ./
RUN yarn install --network-timeout 300000 --retry 5

COPY . .

RUN yarn build

EXPOSE 3000
ENV PORT 3000

ENV HOSTNAME "0.0.0.0"

CMD ["yarn", "start"] 