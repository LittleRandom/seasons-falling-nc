# ── Stage 1: dependencies ──────────────────────────────────────────────────────
FROM node:20-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --frozen-lockfile

# ── Stage 2: builder ───────────────────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

# basePath "/seasons" is baked into the build via next.config.ts.
# Nothing extra needed here — next.config.ts already sets basePath: "/seasons".
RUN npm run build

# ── Stage 3: runner (minimal production image) ────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# DEBUG build arg: bake a default at image-build time.
# Override at runtime with:  docker run -e DEBUG=true ...
ARG DEBUG=false
ENV DEBUG=${DEBUG}

RUN addgroup --system --gid 1001 nodejs && \
    adduser  --system --uid 1001 nextjs

# Copy the Next.js standalone output (includes server.js)
COPY --from=builder /app/public                                    ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone    ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static        ./.next/static

# Copy debug wrapper and entrypoint alongside server.js
COPY --from=builder --chown=nextjs:nodejs /app/server-debug.js     ./server-debug.js
COPY --chown=nextjs:nodejs entrypoint.sh                           ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# entrypoint.sh selects server.js (normal) or server-debug.js (DEBUG=true)
CMD ["sh", "entrypoint.sh"]
