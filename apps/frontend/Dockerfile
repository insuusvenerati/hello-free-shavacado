# syntax=docker/dockerfile:1

FROM node:16-alpine AS builder

WORKDIR /app

COPY yarn.lock yarn.lock
COPY package.json package.json
COPY apps/frontend apps/frontend
COPY turbo.json turbo.json

RUN yarn install --frozen-lockfile \
  && yarn workspace @stiforr/frontend add sharp

ARG NEXT_PUBLIC_CLERK_FRONTEND_API
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_VERCEL_URL
ARG NEXT_PUBLIC_ALGOLIA_APP
ARG NEXT_PUBLIC_ALGOLIA_KEY

ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NEXT_PUBLIC_CLERK_FRONTEND_API=${NEXT_PUBLIC_CLERK_FRONTEND_API}
ENV NEXT_PUBLIC_VERCEL_URL=${NEXT_PUBLIC_VERCEL_URL}
ENV NEXT_PUBLIC_ALGOLIA_APP=${NEXT_PUBLIC_ALGOLIA_APP}
ENV NEXT_PUBLIC_ALGOLIA_KEY=${NEXT_PUBLIC_ALGOLIA_KEY}

RUN --mount=type=secret,id=CLERK_API_KEY \
     --mount=type=secret,id=SENTRY_AUTH_TOKEN \
     --mount=type=secret,id=SENTRY_ORG \
     --mount=type=secret,id=SENTRY_PROJECT \
      export SENTRY_AUTH_TOKEN=$(cat /run/secrets/SENTRY_AUTH_TOKEN) \
    && export SENTRY_ORG=$(cat /run/secrets/SENTRY_ORG) \
    && export SENTRY_PROJECT=$(cat /run/secrets/SENTRY_PROJECT) \
    && export CLERK_API_KEY=$(cat /run/secrets/CLERK_API_KEY) \
    && yarn build --filter=@stiforr/frontend...

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
