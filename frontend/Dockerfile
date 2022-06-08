FROM node:18-alpine3.15
WORKDIR /app
RUN apk add openssl
COPY . . 
RUN npm i -g npm
RUN npm i -g serve
RUN npm install
RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048\
    -subj "/C=FR/ST=75/L=Paris/O=42/CN=PZGM"\
    -keyout secrets/key.key -out secrets/certificate.crt;
EXPOSE 3000
RUN npm run build

#cert.pem for serv .crt for localhost 
CMD serve -s build --ssl-cert "secrets/certificate.crt" --ssl-key "secrets/key.key"