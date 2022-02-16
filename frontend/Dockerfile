FROM node:16-alpine

WORKDIR /app

# install dependecies
COPY ./package*.json ./
RUN npm install

# copy rest
COPY . .

# compile
RUN npm run build



