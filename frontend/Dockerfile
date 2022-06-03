FROM node:18-alpine3.15
WORKDIR /app
RUN npm i -g npm
RUN npm i -g serve
COPY . . 
RUN npm install
EXPOSE 3000
RUN npm run build
CMD serve -s build --ssl-cert "secrets/certificate.pem" --ssl-key "secrets/key.key"