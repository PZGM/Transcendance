FROM node:16-alpine 
WORKDIR /app

RUN npm install -g npm

COPY ./api/package*.json ./

RUN npm install

#changer path secret dans main

COPY ./secrets ./secrets
COPY ./api .

# run server
EXPOSE 3333 5432 3001

CMD  yarn typeorm:migrate Init && yarn typeorm:run ; yarn start:dev && exit 0;