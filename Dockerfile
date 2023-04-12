FROM node:14.21.3-alpine3.17 AS builder

RUN apk add --no-cache libc6-compat
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED 1
COPY . .

RUN npm ci
RUN npm run build

FROM node:14.21.3-alpine3.17 as runner

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder /app/next.config.js next.config.js
COPY --from=builder /app/.next .next
COPY --from=builder /app/public public
COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/package.json package.json
COPY --from=builder /app/package-lock.json package-lock.lock

CMD ["npm", "run", "start"]
