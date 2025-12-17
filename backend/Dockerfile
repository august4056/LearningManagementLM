# Build stage for the Nuxt backend
# oxc native bindings require Node >=22.12 or ^20.19 to install
FROM node:22.12.0 AS build
WORKDIR /app

ARG NITRO_PRESET=node-server
ENV NITRO_PRESET=${NITRO_PRESET}

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production image
FROM node:22.12.0
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
