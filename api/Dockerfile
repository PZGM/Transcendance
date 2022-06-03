FROM node:18-alpine3.15

WORKDIR /app

RUN npm i -g npm

COPY . .

RUN npm install

# run server
EXPOSE 3333 5432

CMD  rm -rf ./src/migrations && npm run typeorm:migrate Init && npm run typeorm:run; npm run build && npm run start:prod