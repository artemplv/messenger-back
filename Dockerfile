FROM node:14

WORKDIR /opt/messenger-back/

COPY package.json /opt/messenger-back
COPY package-lock.json /opt/messenger-back
COPY . /opt/messenger-back

EXPOSE 8080

RUN npm install

CMD ["npx", "nodemon", "./src/index.js"]
