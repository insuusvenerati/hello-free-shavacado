FROM node:16-alpine as builder

WORKDIR /app

COPY yarn.lock yarn.lock
COPY package.json package.json
COPY apps/backend apps/backend
COPY packages/tsconfig-hf packages/tsconfig-hf
COPY turbo.json turbo.json

RUN yarn install --frozen-lockfile

RUN yarn build --filter=@stiforr/backend...

# ---

FROM node:16-alpine

ENV NODE_ENV production

RUN npm i -g pm2

USER node
WORKDIR /app

ENV REDISHOST=${REDISPORT}
ENV REDISPORT=${REDISPORT}
ENV PORT=${PORT}

COPY --from=builder --chown=node:node /app/apps/backend/package.json ./
COPY --from=builder --chown=node:node /app/apps/backend/dist ./dist
COPY --from=builder --chown=node:node /app/node_modules/ ./node_modules/

CMD ["pm2-runtime", "dist/main.js"]
