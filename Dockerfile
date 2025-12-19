# ============================================
# PhiloNutri Lab - Production Dockerfile
# Multi-stage build for optimal image size
# ============================================

# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first for better caching
COPY package.json package-lock.json* ./
RUN npm ci --include=dev

# Copy source and build
COPY . .
RUN npm run build

# Debug: Check if files were generated
RUN echo "=== Checking dist folder ===" && \
  ls -la dist/ && \
  echo "=== Checking dist/server ===" && \
  ls -la dist/server/ || echo "dist/server not found!"

# Prune dev dependencies after build
RUN npm prune --production

# Stage 2: Production
FROM node:20-alpine AS production

# Security: Create non-root user
RUN addgroup -g 1001 -S nodejs && \
  adduser -S nodejs -u 1001 -G nodejs

WORKDIR /app

# Copy only production artifacts
COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist
COPY --from=builder --chown=nodejs:nodejs /app/package.json ./
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules

# Set environment
ENV NODE_ENV=production
ENV PORT=3001

# Security: Run as non-root user
USER nodejs

# Expose only the backend port (serves static files in prod)
EXPOSE 3001

# Health check for container orchestration
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3001/health || exit 1

# Start production server
CMD ["node", "dist/server/index.js"]
