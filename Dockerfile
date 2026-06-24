FROM node:24

RUN apt-get update && apt-get install -y dnsutils iputils-ping

RUN mkdir -p /usr/src/infres/
WORKDIR /usr/src/infres/

COPY ./node/package.json .
RUN npm install

COPY ./node/lookup.html .
COPY ./node/server.js .

RUN chown -R node: /usr/src/infres/
 
USER node



