# -------------------
# 1. Base dependencies
# -------------------
FROM oven/bun AS base
WORKDIR /app
COPY bun.lockb package.json ./
RUN bun install --frozen-lockfile

# -------------------
# 2. Build stage
# -------------------
FROM base AS builder
COPY . .
RUN bun run build

# -------------------
# 3. Final production image
# -------------------
FROM oven/bun AS runner
WORKDIR /app

# Copy only what's needed for runtime
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/bun.lockb ./bun.lockb
COPY --from=builder /app/next.config.ts ./next.config.ts

RUN bun install --production
