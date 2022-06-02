FROM node:16-alpine as builder

ENV NODE_ENV build

USER node
WORKDIR /home/node

COPY package.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile

COPY --chown=node:node . .
RUN yarn build

# ---

FROM node:16-alpine

ENV NODE_ENV production

USER node
WORKDIR /home/node

ARG PORT
ENV PORT=${PORT}

COPY --from=builder --chown=node:node /home/node/package.json ./
COPY --from=builder --chown=node:node /home/node/yarn.lock ./
COPY --from=builder --chown=node:node /home/node/node_modules/ ./node_modules/
COPY --from=builder --chown=node:node /home/node/dist/ ./dist/

CMD ["node", "dist/main.js"]