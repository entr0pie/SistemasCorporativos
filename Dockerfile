FROM node:20-alpine

WORKDIR /app

COPY . /app/
COPY ./.env.prod /app/.env

RUN npm install
RUN npm install pm2 -g

EXPOSE 8080

ENTRYPOINT [ "pm2-runtime", "start", "src/main/app.js" ]