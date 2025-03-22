FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
COPY tsconfig*.json ./
COPY src ./src

RUN npm install -g pnpm && \
    pnpm install --frozen-lockfile && \
    pnpm run build

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules

COPY --from=builder /app/dist ./dist
COPY package.json ./

EXPOSE 3000

CMD ["node", "dist/main"]
