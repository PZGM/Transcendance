FROM node:16-alpine

WORKDIR /app

RUN npm install -g npm

COPY . . 

RUN npm install

EXPOSE 3000

CMD npm start