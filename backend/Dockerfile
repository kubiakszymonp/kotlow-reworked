FROM node:20-alpine

# Set working directory
WORKDIR /opt/app

# Configure yarn for better network handling
RUN yarn config set network-timeout 600000 && \
    yarn config set registry https://registry.npmjs.org/ && \
    yarn config set network-concurrency 1

# Install dependencies
COPY package.json yarn.lock .yarnrc ./
RUN yarn install --frozen-lockfile --network-timeout 600000 --verbose

# Copy source code
COPY . .

ENV NODE_ENV=production

# Skip build in Docker - will build on first run
# This avoids OOM during Docker build
ENV STRAPI_DISABLE_UPDATE_NOTIFICATION=true
ENV STRAPI_HIDE_STARTUP_MESSAGE=true

# Expose port
EXPOSE 1337

# Start in development mode - Strapi will build if needed
CMD ["yarn", "develop"] 