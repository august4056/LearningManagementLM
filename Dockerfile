# Build stage for the Vue frontend
FROM node:18-alpine AS build
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

# Copy application source without backend assets to keep the image lean
COPY babel.config.js ./
COPY public ./public
COPY src ./src

# Allow overriding the backend API endpoint at build time
ARG API_BASE_URL=http://localhost:3000
ENV VUE_APP_API_BASE_URL=${API_BASE_URL}

# Build the production assets
RUN npm run build

# Production stage
FROM nginx:1.27-alpine AS production
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
