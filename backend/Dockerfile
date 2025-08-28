FROM node:20-alpine

# Configure DNS and network settings
RUN echo "nameserver 8.8.8.8" > /etc/resolv.conf && \
    echo "nameserver 1.1.1.1" >> /etc/resolv.conf

# Set working directory
WORKDIR /opt/app

# Configure yarn for better network handling
RUN yarn config set network-timeout 300000 && \
    yarn config set registry https://registry.npmjs.org/ && \
    yarn config set network-concurrency 1

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --network-timeout 300000 --retry 5

# Copy source code
COPY . .

ENV NODE_ENV=production

# Build the application (this will build the admin panel)
RUN yarn build

# Expose port
EXPOSE 1337

# Start the application
CMD ["yarn", "develop"] 