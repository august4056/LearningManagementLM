# Build stage for the Nuxt backend
FROM node:18-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production image
FROM node:18-alpine
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /app/.output ./.output
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/package-lock.json ./package-lock.json

# Install only production dependencies (if any)
RUN npm ci --omit=dev \
    && npm cache clean --force

ENV NITRO_PORT=3000
ENV NITRO_HOST=0.0.0.0
EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
