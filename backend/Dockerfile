FROM node:20-alpine

# Set working directory
WORKDIR /opt/app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy source code
COPY . .

# Build the application
RUN yarn build

# Expose port
EXPOSE 1337

# Start the application
CMD ["yarn", "start"] 