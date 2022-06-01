FROM node:16-alpine 

WORKDIR /app

RUN npm i -g npm --silent

COPY . .

RUN npm install --silent

# run server
EXPOSE 3333 5432

CMD  npm run build && node dist/main