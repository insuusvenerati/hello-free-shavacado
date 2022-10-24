#!/bin/sh

set -ex
pnpm --filter remix exec prisma migrate deploy
pnpm run start
