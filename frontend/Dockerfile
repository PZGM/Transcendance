FROM node:16-alpine as build
WORKDIR /app
RUN npm i -g npm --silent
COPY . . 
RUN npm install --silent
EXPOSE 3000
CMD npm run start