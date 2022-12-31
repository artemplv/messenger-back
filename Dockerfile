FROM node:14-alpine

WORKDIR /opt/messenger-back/

COPY package.json package-lock.json /opt/messenger-back/

RUN npm install

COPY . /opt/messenger-back

EXPOSE $PORT

CMD ["npm", "run", "start"]
