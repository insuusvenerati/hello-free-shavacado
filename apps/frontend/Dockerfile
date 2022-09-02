# syntax=docker/dockerfile:1

FROM node:16-alpine AS builder

WORKDIR /app

COPY yarn.lock yarn.lock
COPY package.json package.json
COPY apps/frontend apps/frontend
COPY turbo.json turbo.json

RUN yarn install --frozen-lockfile \
  && yarn workspace @stiforr/frontend add sharp

RUN --mount=type=secret,id=mysecret,dst=/app/apps/frontend/.env.production.local yarn build --filter=@stiforr/frontend...

# ---

FROM node:16-alpine AS runner
WORKDIR /app

# ARG PM2_PUBLIC_KEY
# ARG PM2_SECRET_KEY
# ARG CLERK_API_KEY

# ENV PM2_PUBLIC_KEY=${PM2_PUBLIC_KEY}
# ENV PM2_SECRET_KEY=${PM2_SECRET_KEY}
# ENV CLERK_API_KEY=${CLERK_API_KEY}

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/apps/frontend/next.config.js ./next.config.js
COPY --from=builder /app/apps/frontend/public ./public
COPY --from=builder /app/apps/frontend/package.json ./package.json

COPY --from=builder --chown=nextjs:nodejs /app/apps/frontend/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/frontend/.next/static ./.next/static

RUN yarn global add pm2 \
  && apk add curl

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD [ "pm2-runtime", "server.js"]