FROM node:22-alpine AS base
RUN corepack enable pnpm

FROM base AS pruner
WORKDIR /app
RUN pnpm add -g turbo
COPY . .
RUN turbo prune --scope=@dougtv/admin-web --docker

FROM base AS builder
WORKDIR /app
COPY --from=pruner /app/out/json/ .
RUN pnpm install --frozen-lockfile
COPY --from=pruner /app/out/full/ .
RUN pnpm turbo build --filter=@dougtv/admin-web

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/services/cross/admin/web/.next/standalone ./
COPY --from=builder /app/services/cross/admin/web/.next/static ./services/cross/admin/web/.next/static
CMD ["node", "services/cross/admin/web/server.js"]
