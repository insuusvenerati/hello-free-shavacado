FROM node:18-bullseye-slim as base
WORKDIR /app
ENV NODE_ENV production

RUN apt-get update && apt-get install -y openssl

RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=@stiforr/remix --docker

# Dev deps
FROM node:18-bullseye-slim as deps

WORKDIR /app
RUN corepack enable

ADD .gitignore .gitignore
COPY --from=base /app/out/json/ .
COPY --from=base /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=base /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
RUN pnpm install --ignore-scripts --frozen-lockfile

# Production deps
FROM node:18-bullseye-slim as production-deps
WORKDIR /app
RUN corepack enable
ENV NODE_ENV production
COPY --from=deps /root/.local/share/pnpm/store/v3 /root/.local/share/pnpm/store/v3
COPY --from=base /app/out/json/ .
COPY --from=base /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=base /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
RUN pnpm install --prod --frozen-lockfile

# Builder
FROM node:18-bullseye-slim as builder
WORKDIR /app
RUN corepack enable
ENV NODE_ENV production

COPY --from=base /app/out/full/ .
COPY --from=deps /app/ .
COPY turbo.json turbo.json
RUN pnpm run build --filter=remix

# Runner
FROM node:18-bullseye-slim as runner

WORKDIR /app
RUN corepack enable
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 remixjs

COPY --from=builder --chown=remixjs:nodejs /app/ .
COPY --from=production-deps --chown=remixjs:nodejs /app/ .

RUN pnpm prisma:generate
RUN mv apps/remix/start_with_migrations.sh ./start_with_migrations.sh

USER remixjs
CMD [ "sh", "-c", "./start_with_migrations.sh" ]