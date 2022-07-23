FROM node:16-alpine as turbo

WORKDIR /app

COPY . .
RUN npx turbo prune --scope=@stiforr/backend --docker

FROM node:16-alpine as deps
WORKDIR /app

COPY --from=turbo /app/out/json .
COPY --from=turbo /app/out/yarn.lock ./yarn.lock

RUN yarn install --frozen-lockfile

FROM node:16-alpine as builder
WORKDIR /app

COPY --from=deps /app .
COPY --from=turbo /app/out/full .
COPY .gitignore .gitignore

RUN yarn workspace @stiforr/backend prisma generate
RUN yarn build --filter=@stiforr/backend...

# ---

FROM node:16-alpine as runner

ENV NODE_ENV production

RUN yarn global add pm2 \
  && apk add curl

USER node
WORKDIR /app

ENV REDISHOST=${REDISPORT}
ENV REDISPORT=${REDISPORT}
ENV PORT=${PORT}
ENV DATABASE_URL=${DATABASE_URL}

COPY --from=builder --chown=node:node /app/apps/backend/package.json ./
COPY --from=builder --chown=node:node /app/apps/backend/dist ./dist
COPY --from=builder --chown=node:node /app/apps/backend/node_modules/ ./node_modules/
# COPY --from=builder --chown=node:node /app/packages/prisma/node_modules/.prisma ./node_modules/.prisma

CMD ["pm2-runtime", "dist/main.js"]

# CMD ["/bin/sh", "-c", "sleep 9999"]
