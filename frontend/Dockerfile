# Use the official Node.js runtime as the base image
FROM node:20-alpine AS base

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3000
ENV PORT 3000

ENV HOSTNAME "0.0.0.0"

CMD ["yarn", "start"] 