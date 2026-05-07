FROM node:22-alpine AS base
RUN corepack enable pnpm

FROM base AS pruner
WORKDIR /app
RUN pnpm add -g turbo
COPY . .
RUN turbo prune --scope=@dougtv/broadcaster-studio --docker

FROM base AS builder
WORKDIR /app
COPY --from=pruner /app/out/json/ .
RUN pnpm install --frozen-lockfile
COPY --from=pruner /app/out/full/ .
RUN pnpm turbo build --filter=@dougtv/broadcaster-studio

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/apps/broadcaster-studio/.next/standalone ./
COPY --from=builder /app/apps/broadcaster-studio/.next/static ./apps/broadcaster-studio/.next/static
CMD ["node", "apps/broadcaster-studio/server.js"]
