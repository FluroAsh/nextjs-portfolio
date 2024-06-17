#!/bin/bash
cd "$(dirname "$0")/.."

# Tear down existing containers and remove volumes
docker-compose down -v

# Build and start new containers
docker-compose up --build