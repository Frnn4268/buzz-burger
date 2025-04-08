# Build stage
FROM node:18-alpine as build-stage

# Security: Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
WORKDIR /app
RUN chown -R appuser:appgroup /app
USER appuser

# Install dependencies with caching
COPY package*.json ./
RUN npm ci --no-audit --ignore-scripts --omit=dev

# Build application
COPY . .
RUN npm run build

# Production stage
FROM nginx:1.23-alpine

# Security configuration
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/
COPY --from=build-stage --chown=nginx:nginx /app/dist /usr/share/nginx/html

# Health check and permissions
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

# Runtime configuration
EXPOSE 80
USER nginx
CMD ["nginx", "-g", "daemon off;"]