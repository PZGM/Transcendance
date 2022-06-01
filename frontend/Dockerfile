FROM node:16-alpine as build
WORKDIR /app
RUN npm i -g npm
COPY . . 
RUN npm install
EXPOSE 3000
CMD npm run build

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80