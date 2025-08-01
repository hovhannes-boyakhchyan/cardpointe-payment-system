# ---------- Base ----------
FROM node:18-alpine AS base
RUN apk update && apk add --no-cache git
# RUN apk update && apk add --no-cache git openssh-client

WORKDIR /app
ENV PATH /app/node_modules/.bin:/app/node_modules/@babel/cli/bin:$PATH
# ---------- Builder ----------
# Creates:
# - node_modules: production dependencies (no dev dependencies)
# - dist: A production build compiled with Babel
FROM base AS builder
COPY package*.json ./
#### RUN npx browserslist@latest --update-db
ARG NPM_TOKEN
COPY .npmrc_ .npmrc
RUN npm install
RUN rm -f .npmrc
COPY . .
RUN npm run build 
# Remove dev dependencies
RUN npm prune --production

# ---------- Release ----------
FROM base AS release

ENV PATH /app/node_modules/.bin:$PATH
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.env ./.env
EXPOSE ${PORT}
CMD ["node", "./dist/main.js"]