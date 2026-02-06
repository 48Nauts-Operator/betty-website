# =============================================================================
# 🐳 Next.js Production Dockerfile — Coolify-Ready
# =============================================================================
# Multi-stage build: deps → builder → runner
# Optimized for: Next.js standalone output, Alpine, non-root user
# 
# Usage with Coolify:
#   - Build pack: Dockerfile
#   - Port: 3000
#   - Health check: curl -f http://localhost:3000/
#
# Usage standalone:
#   docker build -t myapp .
#   docker run -p 3000:3000 myapp
# =============================================================================

# ---- Base ----
FROM node:24-alpine AS base
WORKDIR /app
RUN apk add --update --no-cache curl

# ---- Dependencies ----
FROM base AS deps
WORKDIR /app

RUN apk add --update --no-cache \
    git \
    make \
    g++ \
    libc6-compat \
    vips-dev \
    libpng-dev \
    libwebp-dev

# Copy package files
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# Install dependencies based on lockfile
RUN \
    if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
    else echo "Lockfile not found." && exit 1; \
    fi

# ---- Builder ----
FROM base AS builder
WORKDIR /app

# Build-time args for NEXT_PUBLIC_* variables (injected by Coolify)
# Add your own as needed:
# ARG NEXT_PUBLIC_API_URL
# ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Copy node_modules from deps
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Build Next.js
RUN \
    if [ -f yarn.lock ]; then yarn build; \
    elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm build; \
    else npm run build; \
    fi

# ---- Runner ----
FROM base AS runner
WORKDIR /app

# Runtime dependencies
RUN apk add --update --no-cache vips

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Copy standalone build output
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --retries=3 --start-period=40s \
    CMD curl -f http://localhost:3000/ || exit 1

CMD ["node", "server.js"]
