FROM node:16-alpine AS builder

WORKDIR /app

COPY yarn.lock yarn.lock
COPY package.json package.json
COPY apps/frontend apps/frontend
COPY packages/eslint-config-hf packages/eslint-config-hf 
COPY packages/tsconfig-hf packages/tsconfig-hf
COPY turbo.json turbo.json

RUN yarn install --frozen-lockfile \
  && yarn workspace @stiforr/frontend add sharp

ARG SENTRY_AUTH_TOKEN
ARG NEXT_PUBLIC_CLERK_FRONTEND_API
ARG NEXT_PUBLIC_SUPABASE_KEY
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_API_URL

ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NEXT_PUBLIC_CLERK_FRONTEND_API=${NEXT_PUBLIC_CLERK_FRONTEND_API}
ENV NEXT_PUBLIC_SUPABASE_KEY=${NEXT_PUBLIC_SUPABASE_KEY}
ENV NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL}
ENV SENTRY_AUTH_TOKEN=${SENTRY_AUTH_TOKEN}

RUN yarn build --filter={./apps/frontend}...

FROM node:16-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/apps/frontend/next.config.js ./next.config.js
COPY --from=builder /app/apps/frontend/public ./public
COPY --from=builder /app/apps/frontend/package.json ./package.json

COPY --from=builder --chown=nextjs:nodejs /app/apps/frontend/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/frontend/.next/static ./.next/static

RUN npm i -g pm2

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD [ "pm2-runtime", "server.js"]