FROM node:22-alpine AS base
RUN corepack enable pnpm

FROM base AS pruner
WORKDIR /app
RUN pnpm add -g turbo
COPY . .
RUN turbo prune --scope=@dougtv/notifications --docker

FROM base AS builder
WORKDIR /app
COPY --from=pruner /app/out/json/ .
RUN pnpm install --frozen-lockfile
COPY --from=pruner /app/out/full/ .
RUN pnpm turbo build --filter=@dougtv/notifications

FROM node:22-alpine AS runner
WORKDIR /app
COPY --from=builder /app/services/realtime/notifications/dist ./dist
COPY --from=builder /app/services/realtime/notifications/node_modules ./node_modules
CMD ["node", "dist/main"]
