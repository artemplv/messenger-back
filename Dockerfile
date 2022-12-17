FROM node:14

WORKDIR /opt/messenger-back/

COPY package.json /opt/messenger-back
COPY package-lock.json /opt/messenger-back
COPY . /opt/messenger-back

ARG SERVER_PORT

EXPOSE ${SERVER_PORT}

RUN npm install

CMD ["npm", "run", "start"]
