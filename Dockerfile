FROM node:24

RUN apt-get update && apt-get install -y dnsutils

COPY ./package.json .
RUN npm install

COPY lookup.html .
COPY server.js .

