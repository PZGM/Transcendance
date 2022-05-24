FROM node:16-alpine 
WORKDIR /app

RUN npm install -g npm

COPY . .

RUN npm install

# run server
EXPOSE 3333 5432

CMD  rm -rf ./src/migrations && npm run typeorm:migrate Init && npm run typeorm:run; npm start