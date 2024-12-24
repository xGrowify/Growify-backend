# Base stage
FROM node:22-alpine AS base

WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

RUN npm install

# Copy the Prisma schema and migrations first
COPY prisma ./prisma

RUN npx prisma generate

# Copy the application code
COPY . .

# Build stage
FROM base AS build

# Build the TypeScript application
RUN npm run build

# Production stage
FROM node:22-alpine AS production

WORKDIR /app

# Install only production dependencies to reduce image size
COPY package*.json ./

# Copy the Prisma schema and migrations first
COPY prisma ./prisma

RUN npx prisma generate

# Install production dependencies only
RUN npm ci --only=production

# Copy only the necessary files from the build stage
# COPY --from=base /app/package*.json ./
# COPY --from=base /app/node_modules ./node_modules
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/dist ./dist

# Run the application
CMD ["npm", "start"]
