FROM node:20-alpine

# Set working directory
WORKDIR /opt/app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

ENV NODE_ENV=production

# Build the application (this will build the admin panel)
RUN yarn build

# Expose port
EXPOSE 1337

# Start the application
CMD ["yarn", "develop"] 