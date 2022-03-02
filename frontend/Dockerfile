FROM node:16-alpine

WORKDIR /app

RUN npm install -g npm

COPY ./package*.json ./

RUN npm install

#changer path secret dans package.json
COPY . . 

EXPOSE 3000

CMD npm start