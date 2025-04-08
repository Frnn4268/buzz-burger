# Base image: Official Node.js LTS version on Alpine Linux for production
FROM node:18-alpine

# Security best practice: Create non-root user and set permissions
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
WORKDIR /app
RUN chown -R appuser:appgroup /app
USER appuser

# Layer optimization: Install production dependencies first for caching
COPY package*.json ./

# Clean install production dependencies (no devDependencies)
RUN npm ci --only=production --no-audit --ignore-scripts

# Copy application source code with proper ownership
COPY --chown=appuser:appgroup . .

# Environment configuration
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ENV PORT=9040

# Health check endpoint (adjust to your API's healthcheck route)
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD curl -f http://localhost:$PORT/api/health || exit 1

# Runtime configuration
EXPOSE $PORT
CMD ["node", "index.js"]