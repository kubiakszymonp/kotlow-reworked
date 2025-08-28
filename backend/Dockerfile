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

# Build the application (this will build the admin panel)
RUN NODE_OPTIONS="--max_old_space_size=2048" yarn build

# Expose port
EXPOSE 1337

# Start the application
CMD ["yarn", "develop"] 