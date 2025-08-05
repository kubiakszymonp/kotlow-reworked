FROM node:18-alpine

# Set working directory
WORKDIR /opt/app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Create a non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S strapi -u 1001

# Change ownership of the app directory
RUN chown -R strapi:nodejs /opt/app
USER strapi

# Expose port
EXPOSE 1337

# Start the application
CMD ["npm", "start"] 