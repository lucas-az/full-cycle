FROM node:16.15.1-alpine

WORKDIR /usr/src/app

COPY index.js ./
COPY package*.json ./

RUN npm install

EXPOSE 3000

CMD [ "node", "index.js" ]