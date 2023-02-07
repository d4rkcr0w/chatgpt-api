FROM node:16-alpine

ENV NODE_ENV production
ENV PORT 80

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm ci --production

COPY ./ ./

EXPOSE 80

CMD [ "node", "index.js" ]
