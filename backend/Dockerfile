FROM node:16-alpine 
WORKDIR /app

RUN npm install -g npm

# install dependencies
COPY ./api/package*.json ./
RUN npm install

# copy rest
COPY ./api .

# compile
RUN npm run build

# run server
EXPOSE 3333

CMD yarn typeorm:migrate Init && yarn typeorm:run

CMD [ "npm", "start" ]
