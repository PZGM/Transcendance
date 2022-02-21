# Derniere version de node
FROM node:alpine

USER node

# Create app directory
WORKDIR /usr/src/app


# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY /backend/api/package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

COPY ./backend/api .
EXPOSE 3333

# je crois c'est equivalent de fiare ca ou aors faudra le changer CMD [ "npm", "start" ]
CMD [ "node", "server.js" ]