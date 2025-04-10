FROM node:lts-alpine AS base

FROM base AS builder
RUN apk add --no-cache gcompat
WORKDIR /app
# Install pnpm
RUN npm install -g pnpm
COPY package*json tsconfig.json src ./
# Copy over generated types
COPY sst-env.d.ts* ./
RUN pnpm install && \
  pnpm run build && \
  pnpm prune --prod

FROM base AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 hono
COPY --from=builder --chown=hono:nodejs /app/node_modules /app/node_modules
COPY --from=builder --chown=hono:nodejs /app/dist /app/dist
COPY --from=builder --chown=hono:nodejs /app/package.json /app/package.json

USER hono
EXPOSE 3000
CMD ["node", "/app/dist/index.js"]
