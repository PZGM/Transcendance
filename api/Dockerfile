FROM node:20-alpine

WORKDIR /app

RUN npm i -g npm

COPY . .

RUN npm install

# run server
EXPOSE 3333 5432

RUN npm run build

CMD  rm -rf ./src/migrations && npm run typeorm:migrate Init && npm run typeorm:run; npm run start:prod