FROM node:14.8.0

WORKDIR /web-application

COPY package*.json ./

RUN npm install -g nodemon
RUN npm install

COPY src src
COPY config config

CMD ["npm", "run", "start"]