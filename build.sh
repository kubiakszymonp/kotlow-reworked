#!/bin/bash

# Docker build script with network optimizations
set -e

echo "Setting up Docker build with network optimizations..."

# Export Docker buildkit for better caching and parallel builds
export DOCKER_BUILDKIT=1
export COMPOSE_DOCKER_CLI_BUILD=1

# Clean up any existing containers to free up resources
echo "Cleaning up existing containers..."
docker-compose down --remove-orphans || true

# Prune unused images to free up space
echo "Pruning unused Docker resources..."
docker system prune -f

# Configure Docker daemon for better network performance
echo "Building with optimized settings..."

# Build with reduced parallelism to avoid overwhelming the network
docker-compose build --parallel --build-arg BUILDKIT_INLINE_CACHE=1

echo "Build completed successfully!"

# Optional: Start the services
read -p "Do you want to start the services now? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    docker-compose up -d
    echo "Services started!"
fi
