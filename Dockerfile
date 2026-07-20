FROM node:22-alpine AS build
WORKDIR /app
ARG VITE_API_BASE_URL
ARG BUILD_SHA=unknown
ARG BUILD_TIME=unknown
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV BUILD_SHA=$BUILD_SHA
ENV BUILD_TIME=$BUILD_TIME
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN node -e "const fs=require('node:fs');const crypto=require('node:crypto');const service='odinbook-web';const commitSha=process.env.BUILD_SHA||'unknown';const builtAt=process.env.BUILD_TIME||'unknown';const buildFingerprint=crypto.createHash('sha256').update([service,commitSha,builtAt].join(':')).digest('hex');fs.writeFileSync('dist/version.json',JSON.stringify({service,environment:'production',commitSha,builtAt,buildFingerprint})+'\\n')"

FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
ARG BUILD_SHA=unknown
LABEL org.opencontainers.image.revision=$BUILD_SHA
EXPOSE 80
